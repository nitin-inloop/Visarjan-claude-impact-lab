// Intake client: real /api/intake/* when GET /api/intake/capabilities answers, else the local mock.
import { API_URL } from "./api";
import { MockIntake } from "./mockIntake";
import type { AcceptRes, AcceptedRes, Capabilities, Job, JobIdRes, ManualReq, OkRes, ReportRes, Row } from "./intakeTypes";

export interface UploadOpts {
  year?: number;
  festival?: string;
  pages?: string;
  force_ocr?: boolean;
}

export interface IntakeClient {
  kind: "http" | "mock";
  capabilities(): Promise<Capabilities>;
  upload(file: File, opts: UploadOpts, onProgress?: (pct: number) => void): Promise<JobIdRes>;
  manual(req: ManualReq): Promise<JobIdRes>;
  job(id: string): Promise<Job>;
  rerun(id: string, rows: Row[]): Promise<Job>;
  accept(id: string, rows: Row[]): Promise<AcceptRes>;
  reject(id: string): Promise<OkRes>;
  report(id: string): Promise<ReportRes>;
  accepted(): Promise<AcceptedRes>;
  removeAccepted(jobId: string): Promise<OkRes>;
  pageUrl(id: string, n: number): string;
}

const BASE = `${API_URL}/api/intake`;

async function req<T>(path: string, init?: RequestInit, timeoutMs = 15000): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: init?.body && typeof init.body === "string" ? { "Content-Type": "application/json" } : undefined,
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`${res.status} ${path}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

const postJson = <T>(path: string, body: unknown) => req<T>(path, { method: "POST", body: JSON.stringify(body) });

function uploadXhr(file: File, opts: UploadOpts, onProgress?: (pct: number) => void): Promise<JobIdRes> {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", file);
    if (opts.year) fd.append("year", String(opts.year));
    if (opts.festival) fd.append("festival", opts.festival);
    if (opts.pages) fd.append("pages", opts.pages);
    if (opts.force_ocr) fd.append("force_ocr", "true");
    const x = new XMLHttpRequest();
    x.open("POST", `${BASE}/upload`);
    x.timeout = 120000;
    x.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    x.onload = () => {
      if (x.status >= 200 && x.status < 300) {
        try {
          resolve(JSON.parse(x.responseText) as JobIdRes);
        } catch (err) {
          reject(err);
        }
      } else reject(new Error(`${x.status} upload`));
    };
    x.onerror = () => reject(new Error("network"));
    x.ontimeout = () => reject(new Error("timeout"));
    x.send(fd);
  });
}

export const httpIntake: IntakeClient = {
  kind: "http",
  capabilities: () => req<Capabilities>("/capabilities", undefined, 2500),
  upload: uploadXhr,
  manual: (r) => postJson<JobIdRes>("/manual", r),
  job: (id) => req<Job>(`/jobs/${encodeURIComponent(id)}`),
  rerun: (id, rows) => postJson<Job>(`/jobs/${encodeURIComponent(id)}/rerun`, { rows }),
  accept: (id, rows) => postJson<AcceptRes>(`/jobs/${encodeURIComponent(id)}/accept`, { rows }),
  reject: (id) => req<OkRes>(`/jobs/${encodeURIComponent(id)}/reject`, { method: "POST" }),
  report: (id) => req<ReportRes>(`/jobs/${encodeURIComponent(id)}/report`),
  accepted: () => req<AcceptedRes>("/accepted"),
  removeAccepted: (jobId) => req<OkRes>(`/accepted/${encodeURIComponent(jobId)}`, { method: "DELETE" }),
  pageUrl: (id, n) => `${BASE}/jobs/${encodeURIComponent(id)}/page/${n}.png`,
};

let mockSingleton: MockIntake | null = null;
function mock(): MockIntake {
  if (!mockSingleton) mockSingleton = new MockIntake();
  return mockSingleton;
}

const delay = <T>(f: () => T, ms = 150): Promise<T> =>
  new Promise((res, rej) =>
    setTimeout(() => {
      try {
        res(f());
      } catch (e) {
        rej(e);
      }
    }, ms),
  );

export const mockIntake: IntakeClient = {
  kind: "mock",
  capabilities: () => delay(() => mock().capabilities()),
  upload: async (file, opts, onProgress) => {
    for (const p of [25, 60, 100]) {
      await delay(() => undefined, 120);
      onProgress?.(p);
    }
    return mock().upload(file, opts.year, opts.festival);
  },
  manual: (r) => delay(() => mock().manual(r)),
  job: (id) => delay(() => mock().job(id), 60),
  rerun: (id, rows) => delay(() => mock().rerun(id, rows)),
  accept: (id, rows) => delay(() => mock().accept(id, rows)),
  reject: (id) => delay(() => mock().reject(id)),
  report: (id) => delay(() => mock().report(id)),
  accepted: () => delay(() => mock().accepted()),
  removeAccepted: (jobId) => delay(() => mock().removeAccepted(jobId)),
  pageUrl: (id, n) => mock().pageUrl(id, n),
};

/** Probe the backend; resolves to the real client plus its capabilities, or the mock. */
export async function connectIntake(): Promise<{ client: IntakeClient; caps: Capabilities }> {
  try {
    const caps = await httpIntake.capabilities();
    if (caps && typeof caps === "object" && "ocr" in caps) return { client: httpIntake, caps };
  } catch {
    /* fall through to mock */
  }
  return { client: mockIntake, caps: await mockIntake.capabilities() };
}

/** Poll a job every 1.5 s while it is running. Returns a stop function. */
export function pollJob(client: IntakeClient, id: string, onJob: (j: Job) => void, onError?: () => void): () => void {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const tick = async () => {
    if (stopped) return;
    try {
      const j = await client.job(id);
      if (stopped) return;
      onJob(j);
      if (j.status === "running") timer = setTimeout(tick, 1500);
    } catch {
      if (stopped) return;
      onError?.();
      timer = setTimeout(tick, 3000);
    }
  };
  void tick();
  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
  };
}
