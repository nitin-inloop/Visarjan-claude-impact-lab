import { GhatEvidence } from "@/components/GhatEvidence";
import { readSnapshot } from "@/lib/snapshot";
import type { GhatDetail } from "@/lib/types";

const SLUGS = ["bairagarh", "khatlapura", "prempura", "rani-kamlapati", "hathaikheda", "malikhedi", "shahpura"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function GhatPage({ params }: PageProps<"/ghat/[slug]">) {
  const { slug } = await params;
  const initial = /^[a-z-]+$/.test(slug) ? await readSnapshot<GhatDetail>(`ghats/${slug}.json`) : null;
  return <GhatEvidence slug={slug} initial={initial} />;
}
