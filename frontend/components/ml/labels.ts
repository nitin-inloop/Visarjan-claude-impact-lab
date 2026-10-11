// Plain labels for model feature codes and model names (en + hi). Owned by Session F.
import type { Lang } from "@/lib/types";

type B = Record<Lang, string>;

const PARAM: Record<string, B> = {
  ph: { en: "pH", hi: "pH" },
  do: { en: "DO", hi: "घुलित ऑक्सीजन (DO)" },
  bod: { en: "BOD", hi: "बीओडी" },
  cod: { en: "COD", hi: "सीओडी" },
  ts: { en: "Total solids", hi: "कुल ठोस" },
  tds: { en: "Dissolved solids", hi: "घुलित ठोस" },
  turbidity: { en: "Turbidity", hi: "गंदलापन" },
  conductivity: { en: "Conductivity", hi: "चालकता" },
};

const TYPE: Record<string, B> = {
  river: { en: "river", hi: "नदी" },
  lake: { en: "lake", hi: "झील" },
  talab: { en: "talab", hi: "तालाब" },
  kund: { en: "kund", hi: "कुंड" },
  pond: { en: "pond", hi: "तालाब" },
  dam: { en: "dam", hi: "बांध" },
  ghat: { en: "ghat", hi: "घाट" },
  temporary: { en: "temporary tank", hi: "अस्थायी कुंड" },
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function featureLabel(code: string, lang: Lang): string {
  const hi = lang === "hi";
  if (code.startsWith("missingindicator_")) {
    return `${featureLabel(code.slice("missingindicator_".length), lang)}${hi ? " मापा नहीं गया" : " not measured"}`;
  }
  if (code.startsWith("pre_")) {
    const p = PARAM[code.slice(4)];
    const name = p ? p[lang] : code.slice(4);
    return hi ? `विसर्जन से पहले ${name}` : `${name} before immersion`;
  }
  if (code.startsWith("type_")) {
    const t = TYPE[code.slice(5)];
    const name = t ? t[lang] : code.slice(5);
    return hi ? `स्थल ${name} है` : `Site is a ${name}`;
  }
  if (code.startsWith("ro_")) {
    const r = code.slice(3);
    if (r === "other") return hi ? "क्षेत्रीय कार्यालय: अन्य" : "Regional office: other";
    return hi ? `क्षेत्रीय कार्यालय: ${cap(r)}` : `Regional office: ${cap(r)}`;
  }
  if (code === "site_prior_breach_rate") return hi ? "स्थल की पिछली उल्लंघन दर" : "Site's past breach rate";
  if (code === "festival_durga") return hi ? "त्योहार दुर्गा है" : "Festival is Durga";
  if (code === "year") return hi ? "वर्ष" : "Year";
  return code;
}

const MODEL: Record<string, B> = {
  logreg: { en: "Logistic regression", hi: "लॉजिस्टिक रिग्रेशन" },
  random_forest: { en: "Random forest", hi: "रैंडम फ़ॉरेस्ट" },
  xgboost: { en: "XGBoost", hi: "XGBoost" },
  lightgbm: { en: "LightGBM", hi: "LightGBM" },
};
export const modelName = (m: string, lang: Lang) => MODEL[m]?.[lang] ?? m;

/** Monochrome shades for the 4 models (dots in the agreement view). Champion is the darkest. */
export const MODEL_SHADE: Record<string, string> = {
  random_forest: "#111113",
  logreg: "#8A8A93",
  xgboost: "#5A5A63",
  lightgbm: "#C9C9CF",
};
