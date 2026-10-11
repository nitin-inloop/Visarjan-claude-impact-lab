import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Read a static snapshot from public/data at build/render time (server only). */
export async function readSnapshot<T>(rel: string): Promise<T | null> {
  try {
    const txt = await readFile(path.join(process.cwd(), "public", "data", rel), "utf8");
    return JSON.parse(txt) as T;
  } catch {
    return null;
  }
}
