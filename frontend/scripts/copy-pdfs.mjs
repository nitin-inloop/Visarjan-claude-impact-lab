// Copy the MPPCB reports from the data pack into public/pdf/ so "page N" links open
// from the frontend itself, even when the API is down. Runs before dev and build.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "..", "track-2-visarjan-ghat-watch", "resources");
const dest = join(root, "public", "pdf");
const PDFS = {
  "2023": "Idol_immer._Report_23_CPCB.pdf",
  "2024": "Ganesh_and_Durga_visarjan_report-2024.pdf",
  "2025": "Ganesh_and_Durga_visarjan_report-2025.pdf",
};

mkdirSync(dest, { recursive: true });
for (const [id, file] of Object.entries(PDFS)) {
  const from = join(src, file);
  if (existsSync(from)) copyFileSync(from, join(dest, `${id}.pdf`));
  else console.warn(`copy-pdfs: ${from} not found; page links will need the API`);
}
