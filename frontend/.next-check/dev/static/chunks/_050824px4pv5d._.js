(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ForecastPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ForecastPanel",
    ()=>ForecastPanel,
    "modelLabel",
    ()=>modelLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const MODEL_LABEL = {
    logreg: "Logistic regression",
    random_forest: "Random forest",
    xgboost: "XGBoost",
    lightgbm: "LightGBM"
};
const modelLabel = (m)=>MODEL_LABEL[m] ?? m;
function ForecastPanel({ forecast, compact = false }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    if (!forecast || !forecast.available || forecast.p_breach === undefined) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-muted text-[0.95rem]",
            children: t.forecastUnavailable
        }, void 0, false, {
            fileName: "[project]/components/ForecastPanel.tsx",
            lineNumber: 17,
            columnNumber: 12
        }, this);
    }
    const pct = Math.round(forecast.p_breach * 100);
    const models = Object.entries(forecast.models ?? {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[0.95rem]",
                children: [
                    t.pBreach,
                    ": ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        className: "text-2xl tabular",
                        children: [
                            pct,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ForecastPanel.tsx",
                        lineNumber: 24,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ForecastPanel.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            forecast.champion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted",
                children: [
                    t.champion,
                    ": ",
                    modelLabel(forecast.champion),
                    forecast.basis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            " · ",
                            t.basis(forecast.basis.year, t.festival[forecast.basis.festival] ?? forecast.basis.festival, t.phase[forecast.basis.phase] ?? forecast.basis.phase)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ForecastPanel.tsx",
                        lineNumber: 29,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ForecastPanel.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this),
            !compact && models.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mt-3 text-sm font-semibold",
                        children: t.agreement
                    }, void 0, false, {
                        fileName: "[project]/components/ForecastPanel.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-1 space-y-1 text-sm",
                        children: models.map(([m, p])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "grid grid-cols-[9rem_1fr_3rem] items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: m === forecast.champion ? "font-semibold" : "",
                                        children: modelLabel(m)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ForecastPanel.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 bg-surface border border-rule rounded-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block h-full bg-ink/70",
                                            style: {
                                                width: `${Math.round(p * 100)}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/ForecastPanel.tsx",
                                            lineNumber: 40,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ForecastPanel.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "tabular text-right",
                                        children: [
                                            Math.round(p * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ForecastPanel.tsx",
                                        lineNumber: 42,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, m, true, {
                                fileName: "[project]/components/ForecastPanel.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ForecastPanel.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ForecastPanel.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this),
            !compact && forecast.top_reasons && forecast.top_reasons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mt-3 text-sm font-semibold",
                        children: t.topReasons
                    }, void 0, false, {
                        fileName: "[project]/components/ForecastPanel.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-1 list-disc pl-5 text-[0.95rem] space-y-0.5",
                        children: forecast.top_reasons.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: r.text[lang]
                            }, r.feature, false, {
                                fileName: "[project]/components/ForecastPanel.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ForecastPanel.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ForecastPanel.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm italic border-l-[3px] border-rule pl-2",
                children: t.caveat
            }, void 0, false, {
                fileName: "[project]/components/ForecastPanel.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ForecastPanel.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(ForecastPanel, "TgDcNHuqGasxAn0+LEfJxKMCGfI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = ForecastPanel;
var _c;
__turbopack_context__.k.register(_c, "ForecastPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PdfLink.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PdfLink",
    ()=>PdfLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PdfLink({ source }) {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    if (typeof source.page !== "number") return null;
    if (source.upload) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_URL"]}/api/intake/jobs/${encodeURIComponent(source.upload)}/page/${source.page}.png`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "whitespace-nowrap font-semibold tabular underline underline-offset-2",
            title: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang].uploadedTitle,
            children: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang].uploadedPage(source.page),
                " ↗"
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfLink.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    if (!source.pdf) return null;
    const report = source.report ?? `MPPCB ${source.pdf}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfHref"])(source.pdf, source.page),
        target: "_blank",
        rel: "noopener noreferrer",
        className: "whitespace-nowrap font-semibold tabular underline underline-offset-2",
        title: t.pdfTitle(report, source.page),
        children: [
            t.page(source.page),
            " ↗"
        ]
    }, void 0, true, {
        fileName: "[project]/components/PdfLink.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(PdfLink, "IUbGXjc/X1wYv1u8xPTk69mj8NI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = PdfLink;
var _c;
__turbopack_context__.k.register(_c, "PdfLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/TierBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TierBadge",
    ()=>TierBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const ICON = {
    insufficient_data: "?",
    high: "▲",
    medium: "◆",
    low: "✓"
};
const STYLE = {
    insufficient_data: "border-2 border-dashed border-gap text-gap bg-paper",
    high: "border border-high text-high bg-high-bg",
    medium: "border border-medium text-medium bg-medium-bg",
    low: "border border-low text-low bg-low-bg"
};
function TierBadge({ tier, large = false }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex items-center gap-1.5 rounded font-semibold whitespace-nowrap", large ? "px-3 py-1 text-base" : "px-2 py-0.5 text-sm", STYLE[tier]),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "text-[0.85em] leading-none",
                children: ICON[tier]
            }, void 0, false, {
                fileName: "[project]/components/TierBadge.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            t.tier[tier]
        ]
    }, void 0, true, {
        fileName: "[project]/components/TierBadge.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(TierBadge, "p2BMN842WmXaElEn1NQnTw7gg40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = TierBadge;
var _c;
__turbopack_context__.k.register(_c, "TierBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/AcceptedList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AcceptedList",
    ()=>AcceptedList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const when = (iso)=>{
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata"
    });
};
function AcceptedList({ client, version, onChanged }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AcceptedList.useCallback[load]": ()=>{
            client.accepted().then(setData).catch({
                "AcceptedList.useCallback[load]": ()=>setData({
                        rows: 0,
                        groups: []
                    })
            }["AcceptedList.useCallback[load]"]);
        }
    }["AcceptedList.useCallback[load]"], [
        client
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AcceptedList.useEffect": ()=>{
            load();
        }
    }["AcceptedList.useEffect"], [
        load,
        version
    ]);
    const remove = async (jobId)=>{
        setBusy(jobId);
        try {
            await client.removeAccepted(jobId);
            onChanged?.();
        } finally{
            setBusy(null);
            load();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": x.accepted,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-bold text-ink mb-2",
                children: [
                    x.accepted,
                    " ",
                    data && data.rows > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted font-normal tabular",
                        children: [
                            "(",
                            x.rows(data.rows),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/AcceptedList.tsx",
                        lineNumber: 46,
                        columnNumber: 48
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/AcceptedList.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            !data ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted",
                children: t.loading
            }, void 0, false, {
                fileName: "[project]/components/intake/AcceptedList.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this) : data.groups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted",
                children: x.acceptedNone
            }, void 0, false, {
                fileName: "[project]/components/intake/AcceptedList.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-1.5",
                children: data.groups.map((g, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded border border-rule bg-surface px-3 py-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-ink",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ghatName"])(g.slug, lang) ?? g.site_name
                            }, void 0, false, {
                                fileName: "[project]/components/intake/AcceptedList.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted",
                                children: [
                                    t.festival[g.festival] ?? g.festival,
                                    " ",
                                    g.year,
                                    " · ",
                                    g.phases.map((p)=>t.phase[p] ?? p).join(", "),
                                    " · ",
                                    x.rows(g.rows)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/AcceptedList.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted",
                                children: [
                                    x.source,
                                    ": ",
                                    g.source_file,
                                    " · ",
                                    x.acceptedAt,
                                    " ",
                                    when(g.accepted_at)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/AcceptedList.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"]} ml-auto`,
                                disabled: busy === g.job_id,
                                onClick: ()=>remove(g.job_id),
                                children: x.remove
                            }, void 0, false, {
                                fileName: "[project]/components/intake/AcceptedList.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${g.job_id}-${g.slug ?? g.site_name}-${i}`, true, {
                        fileName: "[project]/components/intake/AcceptedList.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/intake/AcceptedList.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/AcceptedList.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(AcceptedList, "3HvNgtcgzjNgC6BAqXuMEXJRlt0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = AcceptedList;
var _c;
__turbopack_context__.k.register(_c, "AcceptedList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/CapabilitiesBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CapabilitiesBanner",
    ()=>CapabilitiesBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CapabilitiesBanner({ caps, kind }) {
    _s();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    if (!caps) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-sm text-muted",
        children: "…"
    }, void 0, false, {
        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
        lineNumber: 11,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded border border-rule bg-surface px-3 py-2 text-sm space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-x-2 gap-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            x.capText,
                            ": ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-low",
                                children: x.ready
                            }, void 0, false, {
                                fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                                lineNumber: 16,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: "text-muted",
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            x.capOcr,
                            caps.ocr.engine ? ` (${caps.ocr.engine})` : "",
                            ": ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: caps.ocr.available ? "text-low" : "text-medium",
                                children: caps.ocr.available ? x.ready : x.notInstalled
                            }, void 0, false, {
                                fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                                lineNumber: 21,
                                columnNumber: 61
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    !caps.ocr.available && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "inline",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                className: "cursor-pointer text-link",
                                children: x.howEnable
                            }, void 0, false, {
                                fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-muted text-xs mt-1",
                                children: [
                                    caps.ocr.how_to_enable[lang],
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-ink",
                                        children: caps.ocr.venv
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                                        lineNumber: 27,
                                        columnNumber: 46
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: "text-muted",
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted tabular",
                        children: [
                            "≤ ",
                            caps.max_upload_mb,
                            " MB"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-xs", kind === "mock" ? "text-medium" : "text-muted"),
                children: kind === "mock" ? x.mockMode : x.realMode
            }, void 0, false, {
                fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/CapabilitiesBanner.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(CapabilitiesBanner, "BpHATZRBXYqVpOgCf2HLIdSY7VA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = CapabilitiesBanner;
var _c;
__turbopack_context__.k.register(_c, "CapabilitiesBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/IntakePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntakePanel",
    ()=>IntakePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Report intake (docs/PLAN-INTAKE.md §3): source → five processing agents → review → accept.
// Used by the command-center "Intake" tab and the classic /intake route.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$CapabilitiesBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/CapabilitiesBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$SourceChooser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/SourceChooser.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$StageTimeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/StageTimeline.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$ReviewTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/ReviewTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$IntakeResults$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/IntakeResults.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$AcceptedList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/AcceptedList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function IntakePanel({ onOpenPlan }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const [client, setClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [caps, setCaps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [jobId, setJobId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pollKey, setPollKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [job, setJob] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const dirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [acceptedV, setAcceptedV] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "IntakePanel.useState": ()=>Date.now()
    }["IntakePanel.useState"]);
    const startUpload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IntakePanel.useCallback[startUpload]": async (c, file, opts)=>{
            setBusy(true);
            setMsg(null);
            setProgress(0);
            try {
                const r = await c.upload(file, opts, setProgress);
                dirty.current = false;
                setRows([]);
                setJob(null);
                setJobId(r.job_id);
            } catch  {
                setMsg({
                    ok: false,
                    text: x.failed
                });
            } finally{
                setBusy(false);
                setProgress(null);
            }
        }
    }["IntakePanel.useCallback[startUpload]"], [
        x.failed
    ]);
    // Connect: real API if /api/intake/capabilities answers, otherwise the local mock.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntakePanel.useEffect": ()=>{
            let alive = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectIntake"])().then({
                "IntakePanel.useEffect": ({ client: c, caps: k })=>{
                    if (!alive) return;
                    setClient(c);
                    setCaps(k);
                    // ?demo=1 starts a demo job (mock only) so the flow can be shown without a file.
                    if (c.kind === "mock" && new URLSearchParams(window.location.search).get("demo") === "1") {
                        void startUpload(c, new File([
                            "demo"
                        ], "mppcb_2025_p28.jpg", {
                            type: "image/jpeg"
                        }), {});
                    }
                }
            }["IntakePanel.useEffect"]);
            return ({
                "IntakePanel.useEffect": ()=>{
                    alive = false;
                }
            })["IntakePanel.useEffect"];
        }
    }["IntakePanel.useEffect"], [
        startUpload
    ]);
    // Poll the job every 1.5 s while running.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntakePanel.useEffect": ()=>{
            if (!client || !jobId) return;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pollJob"])(client, jobId, {
                "IntakePanel.useEffect": (j)=>{
                    setJob(j);
                    if (!dirty.current) setRows(j.rows);
                }
            }["IntakePanel.useEffect"]);
        }
    }["IntakePanel.useEffect"], [
        client,
        jobId,
        pollKey
    ]);
    const running = job?.status === "running";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntakePanel.useEffect": ()=>{
            if (!running) return;
            const id = setInterval({
                "IntakePanel.useEffect.id": ()=>setNow(Date.now())
            }["IntakePanel.useEffect.id"], 250);
            return ({
                "IntakePanel.useEffect": ()=>clearInterval(id)
            })["IntakePanel.useEffect"];
        }
    }["IntakePanel.useEffect"], [
        running
    ]);
    const onManual = async (req)=>{
        if (!client) return;
        setBusy(true);
        setMsg(null);
        try {
            const r = await client.manual(req);
            dirty.current = false;
            setRows([]);
            setJob(null);
            setJobId(r.job_id);
        } catch  {
            setMsg({
                ok: false,
                text: x.failed
            });
        } finally{
            setBusy(false);
        }
    };
    const editRows = (rs)=>{
        dirty.current = true;
        setRows(rs);
    };
    const setContext = (year, festival)=>editRows(rows.map((r)=>({
                ...r,
                year,
                festival
            })));
    const rerun = async ()=>{
        if (!client || !job) return;
        setBusy(true);
        setMsg(null);
        try {
            const j = await client.rerun(job.id, rows);
            dirty.current = false;
            setJob(j);
            setRows(j.rows);
            if (j.status === "running") setPollKey((k)=>k + 1);
        } catch  {
            setMsg({
                ok: false,
                text: x.failed
            });
        } finally{
            setBusy(false);
        }
    };
    const accept = async ()=>{
        if (!client || !job) return;
        setBusy(true);
        try {
            const r = await client.accept(job.id, rows);
            setMsg({
                ok: r.ok,
                text: x.acceptedMsg(r.accepted_rows, r.ranking_changed.length)
            });
            setJob({
                ...job,
                status: "accepted"
            });
            setAcceptedV((v)=>v + 1);
        } catch  {
            setMsg({
                ok: false,
                text: x.failed
            });
        } finally{
            setBusy(false);
        }
    };
    const reject = async ()=>{
        if (!client || !job) return;
        setBusy(true);
        try {
            await client.reject(job.id);
            setMsg({
                ok: true,
                text: x.rejectedMsg
            });
            setJob({
                ...job,
                status: "rejected"
            });
        } catch  {
            setMsg({
                ok: false,
                text: x.failed
            });
        } finally{
            setBusy(false);
        }
    };
    const reset = ()=>{
        setJobId(null);
        setJob(null);
        setRows([]);
        setMsg(null);
        dirty.current = false;
    };
    const ctxYear = rows[0]?.year ?? job?.context.year ?? 2026;
    const ctxFest = rows[0]?.festival ?? job?.context.festival ?? "Durga";
    const reviewable = job?.status === "needs_review";
    const q = job?.quality;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-ink",
                        children: x.title
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: x.sub
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$CapabilitiesBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapabilitiesBanner"], {
                        caps: caps,
                        kind: client?.kind ?? null
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakePanel.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            !jobId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$SourceChooser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SourceChooser"], {
                caps: caps,
                busy: busy || !client,
                progress: progress,
                onUpload: (f, o)=>client && startUpload(client, f, o),
                onManual: onManual
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakePanel.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-ink font-semibold",
                        children: job?.source.file_name ?? (job?.kind === "manual" ? x.manual : "…")
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this),
                    job && job.source.pages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted tabular",
                        children: job.source.pages.map((p)=>x.pageThumb(p)).join(", ")
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 186,
                        columnNumber: 50
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"]} ml-auto`,
                        onClick: reset,
                        children: x.newJob
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakePanel.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this),
            job && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$StageTimeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StageTimeline"], {
                job: job,
                now: now
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakePanel.tsx",
                lineNumber: 193,
                columnNumber: 15
            }, this),
            job && rows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": x.review,
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-end gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-bold text-ink mr-auto",
                                children: x.review
                            }, void 0, false, {
                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-muted",
                                        children: x.year
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/IntakePanel.tsx",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-20 tabular`,
                                        value: ctxYear,
                                        disabled: !reviewable,
                                        onChange: (e)=>setContext(Number(e.target.value) || ctxYear, ctxFest)
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/IntakePanel.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-muted",
                                        children: x.festival
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/IntakePanel.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"],
                                        value: ctxFest,
                                        disabled: !reviewable,
                                        onChange: (e)=>setContext(ctxYear, e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Ganesh",
                                                children: t.festival.Ganesh
                                            }, void 0, false, {
                                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Durga",
                                                children: t.festival.Durga
                                            }, void 0, false, {
                                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/intake/IntakePanel.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            job.kind === "upload" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted pb-1",
                                children: [
                                    "(",
                                    x.detected,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                lineNumber: 216,
                                columnNumber: 39
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    q && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted tabular",
                        children: x.quality({
                            rows: q.rows,
                            numeric: q.numeric,
                            flagged: q.flagged,
                            mean: q.mean_confidence,
                            tables: q.tables_found,
                            matched: q.sites_matched,
                            unmatched: q.sites_unmatched
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 219,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$ReviewTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReviewTable"], {
                        job: job,
                        rows: rows,
                        onChange: editRows,
                        pageUrl: (n)=>client ? client.pageUrl(job.id, n) : "",
                        readOnly: !reviewable
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"],
                                disabled: !reviewable || busy,
                                onClick: rerun,
                                children: x.rerun
                            }, void 0, false, {
                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"],
                                disabled: !reviewable || busy,
                                onClick: accept,
                                children: x.accept
                            }, void 0, false, {
                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"],
                                disabled: !reviewable || busy,
                                onClick: reject,
                                children: x.reject
                            }, void 0, false, {
                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this),
                            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted",
                                children: x.working
                            }, void 0, false, {
                                fileName: "[project]/components/intake/IntakePanel.tsx",
                                lineNumber: 234,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakePanel.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakePanel.tsx",
                lineNumber: 196,
                columnNumber: 9
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-sm", msg.ok ? "text-low" : "text-medium"),
                role: "status",
                children: msg.text
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakePanel.tsx",
                lineNumber: 240,
                columnNumber: 9
            }, this),
            job?.analysis && client && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$IntakeResults$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntakeResults"], {
                job: job,
                client: client,
                onOpenPlan: onOpenPlan
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakePanel.tsx",
                lineNumber: 245,
                columnNumber: 35
            }, this),
            client && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$AcceptedList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcceptedList"], {
                client: client,
                version: acceptedV
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakePanel.tsx",
                lineNumber: 247,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/IntakePanel.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
_s(IntakePanel, "DcK9wfO9zmcwtb1S283UX0upzFI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = IntakePanel;
var _c;
__turbopack_context__.k.register(_c, "IntakePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/IntakeResults.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntakeResults",
    ()=>IntakeResults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ForecastPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ForecastPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PdfLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PdfLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TierBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TierBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function stripSource(s) {
    return s.replace(/\s*(Source|स्रोत):[^]*$/u, "").trim();
}
function ReasonItem({ r, client }) {
    _s();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const page = r.source.page;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("pl-3 border-l-[3px]", r.kind === "gap" ? "border-gap text-gap" : r.kind === "context" ? "border-rule text-muted" : "border-ink/70"),
        children: [
            stripSource(r.text[lang]),
            " ",
            r.source.upload && page !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "whitespace-nowrap font-semibold tabular underline underline-offset-2 text-link",
                        title: x.uploadedTitle,
                        onClick: ()=>setOpen(true),
                        children: [
                            x.uploadedPage(page),
                            " ↗"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightbox"], {
                        src: client.pageUrl(r.source.upload, page),
                        alt: x.uploadedPage(page),
                        onClose: ()=>setOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 32,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this) : r.source.pdf && page !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PdfLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PdfLink"], {
                source: {
                    pdf: r.source.pdf,
                    page,
                    report: r.source.report ?? undefined
                }
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/IntakeResults.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(ReasonItem, "esYB2w37vTJ3/CTyNYaEOILTMRI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = ReasonItem;
function GhatResult({ g, client }) {
    _s1();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded border p-3 bg-surface", g.changed ? "border-accent" : "border-rule"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "font-bold text-ink",
                children: g.name[lang]
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1.5 flex flex-wrap items-center gap-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted",
                        children: x.before
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TierBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TierBadge"], {
                        tier: g.before.tier
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tabular text-muted text-xs",
                        children: [
                            x.score,
                            " ",
                            g.before.score.toFixed(3),
                            " · ",
                            x.rank,
                            " ",
                            g.before.rank
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: "text-muted",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted",
                        children: x.after
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TierBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TierBadge"], {
                        tier: g.after.tier
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tabular text-xs", g.changed ? "text-ink font-semibold" : "text-muted"),
                        children: [
                            x.score,
                            " ",
                            g.after.score.toFixed(3),
                            " · ",
                            x.rank,
                            " ",
                            g.after.rank
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    !g.changed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted",
                        children: [
                            "(",
                            x.unchanged,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 59,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            g.reasons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                        className: "mt-3 text-sm font-semibold",
                        children: x.newReasons
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-1 space-y-1.5 text-[0.95rem]",
                        children: g.reasons.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReasonItem, {
                                r: r,
                                client: client
                            }, i, false, {
                                fileName: "[project]/components/intake/IntakeResults.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            g.forecast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 rounded border border-rule bg-paper p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                        className: "text-sm font-semibold",
                        children: [
                            x.forecast,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1 text-xs font-normal italic text-medium",
                                children: [
                                    "(",
                                    x.estimate,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/IntakeResults.tsx",
                                lineNumber: 74,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ForecastPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForecastPanel"], {
                            forecast: g.forecast
                        }, void 0, false, {
                            fileName: "[project]/components/intake/IntakeResults.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this),
            g.allocation_hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        children: [
                            x.allocation,
                            ":"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    " ",
                    g.allocation_hint.text[lang]
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/IntakeResults.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s1(GhatResult, "BpHATZRBXYqVpOgCf2HLIdSY7VA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c1 = GhatResult;
function IntakeResults({ job, client, onOpenPlan }) {
    _s2();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const a = job.analysis;
    const [dlErr, setDlErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!a) return null;
    const download = async (l)=>{
        try {
            const r = await client.report(job.id);
            const blob = new Blob([
                r.markdown[l]
            ], {
                type: "text/markdown;charset=utf-8"
            });
            const url = URL.createObjectURL(blob);
            const el = document.createElement("a");
            el.href = url;
            el.download = `ghatwatch-intake-${job.id}-${l}.md`;
            el.click();
            setTimeout(()=>URL.revokeObjectURL(url), 1000);
            setDlErr(false);
        } catch  {
            setDlErr(true);
        }
    };
    const ghats = [
        ...a.ghats
    ].sort((p, q)=>Number(q.changed) - Number(p.changed));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": x.results,
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-bold text-ink",
                children: x.results
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm",
                children: a.summary[lang]
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted",
                children: [
                    a.standard,
                    " · ",
                    x.notVerified
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "@container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-3 @4xl:grid-cols-2",
                    children: ghats.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhatResult, {
                            g: g,
                            client: client
                        }, g.slug, false, {
                            fileName: "[project]/components/intake/IntakeResults.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/intake/IntakeResults.tsx",
                    lineNumber: 119,
                    columnNumber: 35
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"],
                        disabled: !job.report_available,
                        onClick: ()=>download("en"),
                        children: x.downloadEn
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"],
                        disabled: !job.report_available,
                        onClick: ()=>download("hi"),
                        children: x.downloadHi
                    }, void 0, false, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    onOpenPlan ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"],
                        onClick: onOpenPlan,
                        children: [
                            x.toPlan,
                            " →"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/#plan",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"], "no-underline"),
                        children: [
                            x.toPlan,
                            " →"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/IntakeResults.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            dlErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-medium",
                children: x.failed
            }, void 0, false, {
                fileName: "[project]/components/intake/IntakeResults.tsx",
                lineNumber: 141,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/IntakeResults.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s2(IntakeResults, "9miUqznwmE7PhMnhOE2XcPP/neE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c2 = IntakeResults;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ReasonItem");
__turbopack_context__.k.register(_c1, "GhatResult");
__turbopack_context__.k.register(_c2, "IntakeResults");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/ManualForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ManualForm",
    ()=>ManualForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeTypes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ManualForm({ onSubmit, busy }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const [slug, setSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("shahpura");
    const [newName, setNewName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [year, setYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2026);
    const [festival, setFestival] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Durga");
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pre");
    const [vals, setVals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [flags, setFlags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const submit = (e)=>{
        e.preventDefault();
        const readings = {};
        for (const p of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARAMS_13"]){
            const f = flags[p] ?? "";
            const v = (vals[p] ?? "").trim().replace(",", ".");
            if (f) readings[p] = {
                value: null,
                flag: f
            };
            else if (v !== "" && Number.isFinite(Number(v))) readings[p] = {
                value: Number(v),
                flag: null
            };
        }
        if (Object.keys(readings).length === 0) {
            setErr(x.needOne);
            return;
        }
        const isNew = slug === "";
        if (isNew && !newName.trim()) {
            setErr(x.newSiteName);
            return;
        }
        setErr(null);
        onSubmit({
            year,
            festival,
            phase,
            site: {
                slug: isNew ? null : slug,
                name: isNew ? newName.trim() : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHATS"].find((g)=>g.slug === slug)?.name.en ?? slug
            },
            readings,
            source_note: note
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: submit,
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm sm:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-xs text-muted mb-0.5",
                                children: x.ghat
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full`,
                                value: slug,
                                onChange: (e)=>setSlug(e.target.value),
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHATS"].map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: g.slug,
                                            children: g.name[lang]
                                        }, g.slug, false, {
                                            fileName: "[project]/components/intake/ManualForm.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: x.newSite
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/ManualForm.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/ManualForm.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    slug === "" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm sm:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-xs text-muted mb-0.5",
                                children: x.newSiteName
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full`,
                                value: newName,
                                onChange: (e)=>setNewName(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/ManualForm.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-xs text-muted mb-0.5",
                                children: x.year
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: 2020,
                                max: 2030,
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full tabular`,
                                value: year,
                                onChange: (e)=>setYear(Number(e.target.value) || 2026)
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/ManualForm.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-xs text-muted mb-0.5",
                                children: x.festival
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full`,
                                value: festival,
                                onChange: (e)=>setFestival(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Durga",
                                        children: t.festival.Durga
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/ManualForm.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Ganesh",
                                        children: t.festival.Ganesh
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/ManualForm.tsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/ManualForm.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-xs text-muted mb-0.5",
                                children: x.phase
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full`,
                                value: phase,
                                onChange: (e)=>setPhase(e.target.value),
                                children: [
                                    "pre",
                                    "during",
                                    "after"
                                ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: p,
                                        children: t.phaseLong[p]
                                    }, p, false, {
                                        fileName: "[project]/components/intake/ManualForm.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/ManualForm.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/ManualForm.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-x-4 gap-y-2 sm:grid-cols-2 xl:grid-cols-3",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARAMS_13"].map((p)=>{
                    const f = flags[p] ?? "";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: `mf-${p}`,
                                className: "w-36 shrink-0 text-ink",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["paramName"])(t, p)
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: `mf-${p}`,
                                inputMode: "decimal",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-20 tabular`,
                                value: f ? "" : vals[p] ?? "",
                                disabled: !!f,
                                onChange: (e)=>setVals((v)=>({
                                            ...v,
                                            [p]: e.target.value
                                        }))
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 105,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-12 text-xs text-muted",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARAM_UNIT"][p]
                            }, void 0, false, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                "aria-label": `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["paramName"])(t, p)}: ${x.bdlToggle}`,
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} text-xs`,
                                value: f,
                                onChange: (e)=>setFlags((v)=>({
                                            ...v,
                                            [p]: e.target.value
                                        })),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "—"
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/ManualForm.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "BDL",
                                        children: "BDL"
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/ManualForm.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "not sampled",
                                        children: t.notSampled
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/ManualForm.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/ManualForm.tsx",
                                lineNumber: 114,
                                columnNumber: 15
                            }, this)
                        ]
                    }, p, true, {
                        fileName: "[project]/components/intake/ManualForm.tsx",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/intake/ManualForm.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block text-xs text-muted mb-0.5",
                        children: x.sourceNote
                    }, void 0, false, {
                        fileName: "[project]/components/intake/ManualForm.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full`,
                        placeholder: x.sourceNotePh,
                        value: note,
                        onChange: (e)=>setNote(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/intake/ManualForm.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/ManualForm.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-medium",
                role: "alert",
                children: err
            }, void 0, false, {
                fileName: "[project]/components/intake/ManualForm.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"],
                disabled: busy,
                children: busy ? x.working : x.submitManual
            }, void 0, false, {
                fileName: "[project]/components/intake/ManualForm.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/ManualForm.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(ManualForm, "CDQnGwleyMaYoI15WUG+fcvAM8A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = ManualForm;
var _c;
__turbopack_context__.k.register(_c, "ManualForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/ReviewTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReviewTable",
    ()=>ReviewTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeTypes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const PHASES = [
    "pre",
    "during",
    "after"
];
const LEVEL_CHIP = {
    error: "border-critical text-critical",
    warn: "border-medium text-medium",
    info: "border-nodata text-muted"
};
const LEVEL_ICON = {
    error: "✕",
    warn: "▲",
    info: "i"
};
const display = (r)=>r.value !== null ? String(r.value) : r.flag ?? "";
function parseCell(text) {
    const s = text.trim().replace(",", ".");
    if (/^-?\d+(\.\d+)?$/.test(s)) return {
        value: Number(s),
        flag: null
    };
    if (s === "") return {
        value: null,
        flag: "not sampled"
    };
    return {
        value: null,
        flag: s
    };
}
function ReviewTable({ job, rows, onChange, pageUrl, readOnly = false }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const [drafts, setDrafts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const original = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReviewTable.useMemo[original]": ()=>new Map(job.rows.map({
                "ReviewTable.useMemo[original]": (r)=>[
                        r.row_id,
                        r
                    ]
            }["ReviewTable.useMemo[original]"]))
    }["ReviewTable.useMemo[original]"], [
        job.rows
    ]);
    const issueById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReviewTable.useMemo[issueById]": ()=>new Map(job.issues.map({
                "ReviewTable.useMemo[issueById]": (i)=>[
                        i.id,
                        i
                    ]
            }["ReviewTable.useMemo[issueById]"]))
    }["ReviewTable.useMemo[issueById]"], [
        job.issues
    ]);
    const sites = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReviewTable.useMemo[sites]": ()=>{
            const order = [];
            const by = new Map();
            for (const r of rows){
                if (!by.has(r.site_as_printed)) {
                    order.push(r.site_as_printed);
                    by.set(r.site_as_printed, []);
                }
                by.get(r.site_as_printed).push(r);
            }
            return order.map({
                "ReviewTable.useMemo[sites]": (site)=>{
                    const rs = by.get(site);
                    const phases = PHASES.filter({
                        "ReviewTable.useMemo[sites].phases": (p)=>rs.some({
                                "ReviewTable.useMemo[sites].phases": (r)=>r.phase === p
                            }["ReviewTable.useMemo[sites].phases"])
                    }["ReviewTable.useMemo[sites].phases"]);
                    const extra = [
                        ...new Set(rs.map({
                            "ReviewTable.useMemo[sites].extra": (r)=>r.parameter
                        }["ReviewTable.useMemo[sites].extra"]))
                    ].filter({
                        "ReviewTable.useMemo[sites].extra": (p)=>!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARAMS_13"].includes(p)
                    }["ReviewTable.useMemo[sites].extra"]);
                    const params = [
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARAMS_13"].filter({
                            "ReviewTable.useMemo[sites]": (p)=>rs.some({
                                    "ReviewTable.useMemo[sites]": (r)=>r.parameter === p
                                }["ReviewTable.useMemo[sites]"])
                        }["ReviewTable.useMemo[sites]"]),
                        ...extra
                    ];
                    const cell = new Map(rs.map({
                        "ReviewTable.useMemo[sites]": (r)=>[
                                `${r.parameter}|${r.phase}`,
                                r
                            ]
                    }["ReviewTable.useMemo[sites]"]));
                    const pages = [
                        ...new Set(rs.map({
                            "ReviewTable.useMemo[sites]": (r)=>r.page
                        }["ReviewTable.useMemo[sites]"]).filter({
                            "ReviewTable.useMemo[sites]": (p)=>p !== null
                        }["ReviewTable.useMemo[sites]"]))
                    ];
                    const orig = rs.map({
                        "ReviewTable.useMemo[sites].orig": (r)=>original.get(r.row_id) ?? r
                    }["ReviewTable.useMemo[sites].orig"]);
                    const needsMap = orig.some({
                        "ReviewTable.useMemo[sites].needsMap": (r)=>r.slug === null || r.site_match_confidence < 0.8
                    }["ReviewTable.useMemo[sites].needsMap"]);
                    const issues = [
                        ...new Set(rs.flatMap({
                            "ReviewTable.useMemo[sites].issues": (r)=>r.issues
                        }["ReviewTable.useMemo[sites].issues"]))
                    ].map({
                        "ReviewTable.useMemo[sites].issues": (id)=>issueById.get(id)
                    }["ReviewTable.useMemo[sites].issues"]).filter({
                        "ReviewTable.useMemo[sites].issues": (i)=>!!i
                    }["ReviewTable.useMemo[sites].issues"]);
                    return {
                        site,
                        rs,
                        phases,
                        params,
                        cell,
                        pages,
                        needsMap,
                        issues,
                        slug: rs[0].slug,
                        smc: orig[0].site_match_confidence,
                        inPack: rs.filter({
                            "ReviewTable.useMemo[sites]": (r)=>r.already_in_pack
                        }["ReviewTable.useMemo[sites]"]).length
                    };
                }
            }["ReviewTable.useMemo[sites]"]);
        }
    }["ReviewTable.useMemo[sites]"], [
        rows,
        original,
        issueById
    ]);
    const generalIssues = job.issues.filter((i)=>i.row_id === null);
    const editCell = (r, text)=>{
        setDrafts((d)=>({
                ...d,
                [r.row_id]: text
            }));
        const p = parseCell(text);
        onChange(rows.map((x2)=>x2.row_id === r.row_id ? {
                ...x2,
                ...p,
                value_as_printed: x2.value_as_printed
            } : x2));
    };
    const mapSite = (site, slug)=>onChange(rows.map((r)=>r.site_as_printed === site ? {
                ...r,
                slug
            } : r));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: x.reviewNote
                    }, void 0, false, {
                        fileName: "[project]/components/intake/ReviewTable.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded border border-rule px-1.5",
                        children: x.confHigh
                    }, void 0, false, {
                        fileName: "[project]/components/intake/ReviewTable.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded border border-medium bg-medium-bg text-medium px-1.5",
                        children: x.confMid
                    }, void 0, false, {
                        fileName: "[project]/components/intake/ReviewTable.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded border border-critical bg-high-bg text-critical px-1.5",
                        children: x.confLow
                    }, void 0, false, {
                        fileName: "[project]/components/intake/ReviewTable.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/ReviewTable.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            generalIssues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-1",
                children: generalIssues.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IssueLine, {
                        i: i
                    }, i.id, false, {
                        fileName: "[project]/components/intake/ReviewTable.tsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/intake/ReviewTable.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this),
            sites.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded border border-rule bg-surface/60",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "flex flex-wrap items-start gap-3 px-3 py-2 border-b border-rule",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-semibold text-ink",
                                            children: [
                                                s.slug ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ghatName"])(s.slug, lang) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-medium",
                                                    children: x.newSite
                                                }, void 0, false, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 52
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ml-2 text-xs tabular", (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confText"])(s.smc)),
                                                    children: [
                                                        Math.round(s.smc * 100),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-muted",
                                            children: [
                                                x.asPrinted,
                                                ": “",
                                                s.site,
                                                "” · ",
                                                x.rows(s.rs.length),
                                                s.inPack > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        " · ",
                                                        x.inPack,
                                                        " (",
                                                        s.inPack,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this),
                                        s.needsMap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mt-1.5 flex flex-wrap items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: s.slug ? "text-muted" : "text-medium font-semibold",
                                                    children: s.slug ? x.mapTo : x.unmatched
                                                }, void 0, false, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"],
                                                    value: s.slug ?? "",
                                                    disabled: readOnly,
                                                    onChange: (e)=>mapSite(s.site, e.target.value || null),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: x.keepNew
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 21
                                                        }, this),
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHATS"].map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: g.slug,
                                                                children: g.name[lang]
                                                            }, g.slug, false, {
                                                                fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                lineNumber: 112,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                s.pages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: s.pages.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setZoom(n),
                                            className: "group text-center",
                                            title: x.openFull,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: pageUrl(n),
                                                    alt: x.pageThumb(n),
                                                    className: "h-16 w-12 object-cover object-top rounded-sm border border-rule bg-white group-hover:border-accent",
                                                    loading: "lazy"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-[10px] text-muted tabular",
                                                    children: x.pageThumb(n)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, n, true, {
                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                            lineNumber: 123,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/intake/ReviewTable.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full min-w-[34rem] text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "text-xs text-muted",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left px-2 py-1.5 font-semibold sticky left-0 bg-surface",
                                                    children: x.param
                                                }, void 0, false, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 19
                                                }, this),
                                                s.phases.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left px-2 py-1.5 font-semibold",
                                                        children: t.phaseLong[p]
                                                    }, p, false, {
                                                        fileName: "[project]/components/intake/ReviewTable.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left px-2 py-1.5 font-semibold",
                                                    children: x.unit
                                                }, void 0, false, {
                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/ReviewTable.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: s.params.map((p)=>{
                                            const any = s.phases.map((ph)=>s.cell.get(`${p}|${ph}`)).find((r)=>r);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-t border-rule",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        scope: "row",
                                                        className: "text-left px-2 py-0.5 font-normal sticky left-0 bg-surface align-middle leading-tight",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-ink",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["paramName"])(t, p)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                lineNumber: 151,
                                                                columnNumber: 25
                                                            }, this),
                                                            any && any.parameter_as_printed !== p && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-[11px] text-muted",
                                                                children: any.parameter_as_printed
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                lineNumber: 152,
                                                                columnNumber: 67
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/intake/ReviewTable.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 23
                                                    }, this),
                                                    s.phases.map((ph)=>{
                                                        const r = s.cell.get(`${p}|${ph}`);
                                                        if (!r) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-2 py-1 text-muted",
                                                            children: "—"
                                                        }, ph, false, {
                                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 40
                                                        }, this);
                                                        const o = original.get(r.row_id);
                                                        const edited = !!o && (o.value !== r.value || o.flag !== r.flag);
                                                        const rIssues = r.issues.map((id)=>issueById.get(id)).filter((i)=>!!i);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-2 py-0.5 align-middle",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cellInput"], "w-[6.5rem] tabular", (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confClass"])(r.confidence), edited && "outline outline-1 outline-accent"),
                                                                        value: drafts[r.row_id] ?? display(r),
                                                                        readOnly: readOnly,
                                                                        "aria-label": `${s.site} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["paramName"])(t, p)} ${t.phase[ph]}`,
                                                                        onChange: (e)=>editCell(r, e.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                        lineNumber: 163,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    rIssues.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            title: i.text[lang],
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-[10px] font-bold rounded border px-1 leading-4", LEVEL_CHIP[i.level]),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    "aria-hidden": true,
                                                                                    children: LEVEL_ICON[i.level]
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                                    lineNumber: 172,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "sr-only",
                                                                                    children: [
                                                                                        x.level[i.level],
                                                                                        ": ",
                                                                                        i.text[lang]
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                                    lineNumber: 173,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, i.id, true, {
                                                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                            lineNumber: 171,
                                                                            columnNumber: 33
                                                                        }, this)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-[11px] tabular whitespace-nowrap", (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confText"])(r.confidence)),
                                                                        children: [
                                                                            Math.round(r.confidence * 100),
                                                                            "%",
                                                                            r.value_as_printed && r.value_as_printed !== display(r) ? ` · “${r.value_as_printed}”` : "",
                                                                            edited && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-accent",
                                                                                children: [
                                                                                    " · ",
                                                                                    x.edited
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                                lineNumber: 180,
                                                                                columnNumber: 44
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                        lineNumber: 178,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/intake/ReviewTable.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, ph, false, {
                                                            fileName: "[project]/components/intake/ReviewTable.tsx",
                                                            lineNumber: 161,
                                                            columnNumber: 27
                                                        }, this);
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-2 py-1 text-xs text-muted align-top whitespace-nowrap",
                                                        children: any?.unit_assumed || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/intake/ReviewTable.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, p, true, {
                                                fileName: "[project]/components/intake/ReviewTable.tsx",
                                                lineNumber: 149,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/ReviewTable.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/ReviewTable.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/intake/ReviewTable.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        s.issues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "px-3 py-2 border-t border-rule space-y-1",
                            children: s.issues.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IssueLine, {
                                    i: i
                                }, i.id, false, {
                                    fileName: "[project]/components/intake/ReviewTable.tsx",
                                    lineNumber: 196,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/intake/ReviewTable.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this)
                    ]
                }, s.site, true, {
                    fileName: "[project]/components/intake/ReviewTable.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)),
            zoom !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightbox"], {
                src: pageUrl(zoom),
                alt: x.pageThumb(zoom),
                onClose: ()=>setZoom(null)
            }, void 0, false, {
                fileName: "[project]/components/intake/ReviewTable.tsx",
                lineNumber: 202,
                columnNumber: 25
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/ReviewTable.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(ReviewTable, "lvmxcNmhBXxVBz5v3pA2yZT5gKw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = ReviewTable;
function IssueLine({ i }) {
    _s1();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "text-xs flex gap-2 items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("font-bold rounded border px-1 shrink-0", LEVEL_CHIP[i.level]),
                children: [
                    LEVEL_ICON[i.level],
                    " ",
                    x.level[i.level]
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/ReviewTable.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-ink",
                children: i.text[lang]
            }, void 0, false, {
                fileName: "[project]/components/intake/ReviewTable.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/ReviewTable.tsx",
        lineNumber: 211,
        columnNumber: 5
    }, this);
}
_s1(IssueLine, "BpHATZRBXYqVpOgCf2HLIdSY7VA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c1 = IssueLine;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReviewTable");
__turbopack_context__.k.register(_c1, "IssueLine");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/SourceChooser.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SourceChooser",
    ()=>SourceChooser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$ManualForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/ManualForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const OK_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png"
];
const OK_EXT = /\.(pdf|jpe?g|png)$/i;
function SourceChooser({ caps, busy, progress, onUpload, onManual }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("upload");
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [over, setOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [year, setYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [festival, setFestival] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [pages, setPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [forceOcr, setForceOcr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const camRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const maxMb = caps?.max_upload_mb ?? 25;
    const pick = (f)=>{
        if (!f) return;
        if (!OK_TYPES.includes(f.type) && !OK_EXT.test(f.name)) {
            setErr(x.badType);
            return;
        }
        if (f.size > maxMb * 1024 * 1024) {
            setErr(x.tooBig(maxMb));
            return;
        }
        setErr(null);
        setFile(f);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "tablist",
                "aria-label": x.title,
                className: "inline-flex rounded border border-rule overflow-hidden mb-3",
                children: [
                    "upload",
                    "manual"
                ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        role: "tab",
                        "aria-selected": mode === m,
                        onClick: ()=>setMode(m),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-3 py-1.5 text-sm", mode === m ? "bg-raised text-ink font-semibold" : "bg-surface text-muted hover:text-ink"),
                        children: m === "upload" ? x.upload : x.manual
                    }, m, false, {
                        fileName: "[project]/components/intake/SourceChooser.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/intake/SourceChooser.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            mode === "manual" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$ManualForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ManualForm"], {
                onSubmit: onManual,
                busy: busy
            }, void 0, false, {
                fileName: "[project]/components/intake/SourceChooser.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "space-y-3",
                onSubmit: (e)=>{
                    e.preventDefault();
                    if (file) onUpload(file, {
                        year: year ? Number(year) : undefined,
                        festival: festival || undefined,
                        pages: pages.trim() || undefined,
                        force_ocr: forceOcr
                    });
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onDragOver: (e)=>{
                            e.preventDefault();
                            setOver(true);
                        },
                        onDragLeave: ()=>setOver(false),
                        onDrop: (e)=>{
                            e.preventDefault();
                            setOver(false);
                            pick(e.dataTransfer.files?.[0]);
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded-md border-2 border-dashed px-4 py-6 text-center", over ? "border-accent bg-raised" : "border-rule bg-surface/60"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink font-semibold",
                                children: x.dropHere
                            }, void 0, false, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-wrap justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"],
                                        onClick: ()=>fileRef.current?.click(),
                                        children: x.orPick
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"],
                                        onClick: ()=>camRef.current?.click(),
                                        children: x.camera
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileRef,
                                type: "file",
                                accept: "application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png",
                                className: "sr-only",
                                tabIndex: -1,
                                onChange: (e)=>pick(e.target.files?.[0])
                            }, void 0, false, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: camRef,
                                type: "file",
                                accept: "image/*,application/pdf",
                                capture: "environment",
                                className: "sr-only",
                                tabIndex: -1,
                                onChange: (e)=>pick(e.target.files?.[0])
                            }, void 0, false, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-ink tabular",
                                children: [
                                    file.name,
                                    " · ",
                                    (file.size / 1024 / 1024).toFixed(2),
                                    " MB"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/SourceChooser.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 grid-cols-2 lg:grid-cols-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-xs text-muted mb-0.5",
                                        children: x.year
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: 2020,
                                        max: 2030,
                                        placeholder: "auto",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full tabular`,
                                        value: year,
                                        onChange: (e)=>setYear(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-xs text-muted mb-0.5",
                                        children: x.festival
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full`,
                                        value: festival,
                                        onChange: (e)=>setFestival(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "auto"
                                            }, void 0, false, {
                                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Durga",
                                                children: t.festival.Durga
                                            }, void 0, false, {
                                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Ganesh",
                                                children: t.festival.Ganesh
                                            }, void 0, false, {
                                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-xs text-muted mb-0.5",
                                        children: x.pages
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["input"]} w-full tabular`,
                                        placeholder: "28-30",
                                        value: pages,
                                        onChange: (e)=>setPages(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm flex items-end gap-2 pb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: forceOcr,
                                        onChange: (e)=>setForceOcr(e.target.checked),
                                        disabled: caps ? !caps.ocr.available : false
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: caps && !caps.ocr.available ? "text-muted" : "text-ink",
                                        children: x.forceOcr
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/SourceChooser.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/SourceChooser.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-medium",
                        role: "alert",
                        children: err
                    }, void 0, false, {
                        fileName: "[project]/components/intake/SourceChooser.tsx",
                        lineNumber: 131,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btnPrimary"],
                                disabled: !file || busy,
                                children: x.start
                            }, void 0, false, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this),
                            progress !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted tabular",
                                role: "status",
                                children: x.uploading(progress)
                            }, void 0, false, {
                                fileName: "[project]/components/intake/SourceChooser.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/intake/SourceChooser.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/SourceChooser.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/SourceChooser.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(SourceChooser, "2rGOtTdMRYFFDIzhh5Zpk83I1rw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = SourceChooser;
var _c;
__turbopack_context__.k.register(_c, "SourceChooser");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/StageTimeline.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StageTimeline",
    ()=>StageTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const DOT = {
    pending: "border border-nodata bg-transparent",
    running: "bg-accent animate-pulse",
    done: "bg-low",
    failed: "bg-critical",
    skipped: "border border-dashed border-nodata bg-transparent"
};
const TXT = {
    pending: "text-muted",
    running: "text-accent",
    done: "text-low",
    failed: "text-critical",
    skipped: "text-muted"
};
const time = (iso)=>{
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "" : d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata"
    });
};
function StageTimeline({ job, now }) {
    _s();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const ocrConf = job.source.ocr_used ? job.quality.mean_confidence : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": x.stages,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-ink",
                        children: x.stages
                    }, void 0, false, {
                        fileName: "[project]/components/intake/StageTimeline.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-xs font-semibold rounded px-1.5 py-px border", job.status === "failed" ? "border-critical text-critical" : job.status === "running" ? "border-accent text-accent" : "border-rule text-muted"),
                        children: x.jobStatus[job.status]
                    }, void 0, false, {
                        fileName: "[project]/components/intake/StageTimeline.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    ocrConf !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs rounded px-1.5 py-px border border-medium text-medium tabular",
                        children: x.ocrChip(job.source.ocr_engine ?? "OCR", ocrConf)
                    }, void 0, false, {
                        fileName: "[project]/components/intake/StageTimeline.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intake/StageTimeline.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "relative border-l border-rule ml-1.5 space-y-2.5",
                children: job.stages.map((s)=>{
                    const start = s.started ? Date.parse(s.started) : null;
                    const end = s.finished ? Date.parse(s.finished) : s.status === "running" ? now : null;
                    const el = start !== null && end !== null ? Math.max(0, (end - start) / 1000) : null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "pl-4 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full", DOT[s.status])
                            }, void 0, false, {
                                fileName: "[project]/components/intake/StageTimeline.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-baseline gap-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-ink text-sm",
                                        children: s.title[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/StageTimeline.tsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-xs", TXT[s.status]),
                                        children: x.stageStatus[s.status]
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/StageTimeline.tsx",
                                        lineNumber: 47,
                                        columnNumber: 17
                                    }, this),
                                    el !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted tabular",
                                        children: x.elapsed(el)
                                    }, void 0, false, {
                                        fileName: "[project]/components/intake/StageTimeline.tsx",
                                        lineNumber: 48,
                                        columnNumber: 33
                                    }, this),
                                    s.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted",
                                        children: [
                                            "· ",
                                            s.summary[lang]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/intake/StageTimeline.tsx",
                                        lineNumber: 49,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/intake/StageTimeline.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            s.log.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-0.5 space-y-0.5",
                                children: s.log.slice(-6).map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "text-xs text-muted flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tabular shrink-0",
                                                children: time(l.t)
                                            }, void 0, false, {
                                                fileName: "[project]/components/intake/StageTimeline.tsx",
                                                lineNumber: 55,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: l.text[lang]
                                            }, void 0, false, {
                                                fileName: "[project]/components/intake/StageTimeline.tsx",
                                                lineNumber: 56,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/components/intake/StageTimeline.tsx",
                                        lineNumber: 54,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/intake/StageTimeline.tsx",
                                lineNumber: 52,
                                columnNumber: 17
                            }, this)
                        ]
                    }, s.key, true, {
                        fileName: "[project]/components/intake/StageTimeline.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/intake/StageTimeline.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/StageTimeline.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(StageTimeline, "BpHATZRBXYqVpOgCf2HLIdSY7VA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = StageTimeline;
var _c;
__turbopack_context__.k.register(_c, "StageTimeline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intake/shared.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GHATS",
    ()=>GHATS,
    "Lightbox",
    ()=>Lightbox,
    "btn",
    ()=>btn,
    "btnPrimary",
    ()=>btnPrimary,
    "cellInput",
    ()=>cellInput,
    "confClass",
    ()=>confClass,
    "confText",
    ()=>confText,
    "ghatName",
    ()=>ghatName,
    "input",
    ()=>input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const GHATS = [
    {
        slug: "bairagarh",
        name: {
            en: "Bairagarh (Sant Hirdaram) kund",
            hi: "बैरागढ़ (संत हिरदाराम) कुंड"
        }
    },
    {
        slug: "malikhedi",
        name: {
            en: "Malikhedi kund",
            hi: "मालीखेड़ी कुंड"
        }
    },
    {
        slug: "shahpura",
        name: {
            en: "Shahpura lake ghat",
            hi: "शाहपुरा झील घाट"
        }
    },
    {
        slug: "rani-kamlapati",
        name: {
            en: "Rani Kamlapati ghat / Kamla Park kund",
            hi: "रानी कमलापति घाट / कमला पार्क कुंड"
        }
    },
    {
        slug: "hathaikheda",
        name: {
            en: "Hathaikheda dam / kund",
            hi: "हथाईखेड़ा डैम / कुंड"
        }
    },
    {
        slug: "khatlapura",
        name: {
            en: "Khatlapura ghat",
            hi: "खटलापुरा घाट"
        }
    },
    {
        slug: "prempura",
        name: {
            en: "Prempura ghat",
            hi: "प्रेमपुरा घाट"
        }
    }
];
const ghatName = (slug, lang)=>GHATS.find((g)=>g.slug === slug)?.name[lang] ?? null;
const btn = "rounded border border-rule bg-surface px-3 py-1.5 text-sm font-semibold text-ink hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed";
const btnPrimary = "rounded bg-accent text-paper px-4 py-1.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed";
const input = "rounded border border-rule bg-paper px-2 py-1 text-sm text-ink focus:border-accent";
function confClass(c) {
    if (c >= 0.9) return "border-rule bg-paper";
    if (c >= 0.7) return "border-medium bg-medium-bg";
    return "border-critical bg-high-bg";
}
const cellInput = "rounded border px-2 py-0.5 text-sm text-ink focus:border-accent";
function confText(c) {
    if (c >= 0.9) return "text-muted";
    if (c >= 0.7) return "text-medium";
    return "text-critical";
}
function Lightbox({ src, alt, onClose }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Lightbox.useEffect": ()=>{
            const k = {
                "Lightbox.useEffect.k": (e)=>e.key === "Escape" && onClose()
            }["Lightbox.useEffect.k"];
            window.addEventListener("keydown", k);
            return ({
                "Lightbox.useEffect": ()=>window.removeEventListener("keydown", k)
            })["Lightbox.useEffect"];
        }
    }["Lightbox.useEffect"], [
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": alt,
        className: "fixed inset-0 z-[2000] bg-black/80 p-4 overflow-auto",
        onClick: onClose,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "fixed top-3 right-4 rounded bg-surface border border-rule px-3 py-1 text-ink text-sm",
                onClick: onClose,
                children: "✕"
            }, void 0, false, {
                fileName: "[project]/components/intake/shared.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: alt,
                className: "mx-auto max-w-full h-auto bg-white"
            }, void 0, false, {
                fileName: "[project]/components/intake/shared.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intake/shared.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(Lightbox, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Lightbox;
var _c;
__turbopack_context__.k.register(_c, "Lightbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/intakeApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectIntake",
    ()=>connectIntake,
    "httpIntake",
    ()=>httpIntake,
    "mockIntake",
    ()=>mockIntake,
    "pollJob",
    ()=>pollJob
]);
// Intake client: real /api/intake/* when GET /api/intake/capabilities answers, else the local mock.
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockIntake$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockIntake.ts [app-client] (ecmascript)");
;
;
const BASE = `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_URL"]}/api/intake`;
async function req(path, init, timeoutMs = 15000) {
    const ctrl = new AbortController();
    const timer = setTimeout(()=>ctrl.abort(), timeoutMs);
    try {
        const res = await fetch(`${BASE}${path}`, {
            ...init,
            headers: init?.body && typeof init.body === "string" ? {
                "Content-Type": "application/json"
            } : undefined,
            signal: ctrl.signal,
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`${res.status} ${path}`);
        return await res.json();
    } finally{
        clearTimeout(timer);
    }
}
const postJson = (path, body)=>req(path, {
        method: "POST",
        body: JSON.stringify(body)
    });
function uploadXhr(file, opts, onProgress) {
    return new Promise((resolve, reject)=>{
        const fd = new FormData();
        fd.append("file", file);
        if (opts.year) fd.append("year", String(opts.year));
        if (opts.festival) fd.append("festival", opts.festival);
        if (opts.pages) fd.append("pages", opts.pages);
        if (opts.force_ocr) fd.append("force_ocr", "true");
        const x = new XMLHttpRequest();
        x.open("POST", `${BASE}/upload`);
        x.timeout = 120000;
        x.upload.onprogress = (e)=>{
            if (e.lengthComputable && onProgress) onProgress(Math.round(e.loaded / e.total * 100));
        };
        x.onload = ()=>{
            if (x.status >= 200 && x.status < 300) {
                try {
                    resolve(JSON.parse(x.responseText));
                } catch (err) {
                    reject(err);
                }
            } else reject(new Error(`${x.status} upload`));
        };
        x.onerror = ()=>reject(new Error("network"));
        x.ontimeout = ()=>reject(new Error("timeout"));
        x.send(fd);
    });
}
const httpIntake = {
    kind: "http",
    capabilities: ()=>req("/capabilities", undefined, 2500),
    upload: uploadXhr,
    manual: (r)=>postJson("/manual", r),
    job: (id)=>req(`/jobs/${encodeURIComponent(id)}`),
    rerun: (id, rows)=>postJson(`/jobs/${encodeURIComponent(id)}/rerun`, {
            rows
        }),
    accept: (id, rows)=>postJson(`/jobs/${encodeURIComponent(id)}/accept`, {
            rows
        }),
    reject: (id)=>req(`/jobs/${encodeURIComponent(id)}/reject`, {
            method: "POST"
        }),
    report: (id)=>req(`/jobs/${encodeURIComponent(id)}/report`),
    accepted: ()=>req("/accepted"),
    removeAccepted: (jobId)=>req(`/accepted/${encodeURIComponent(jobId)}`, {
            method: "DELETE"
        }),
    pageUrl: (id, n)=>`${BASE}/jobs/${encodeURIComponent(id)}/page/${n}.png`
};
let mockSingleton = null;
function mock() {
    if (!mockSingleton) mockSingleton = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockIntake$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockIntake"]();
    return mockSingleton;
}
const delay = (f, ms = 150)=>new Promise((res, rej)=>setTimeout(()=>{
            try {
                res(f());
            } catch (e) {
                rej(e);
            }
        }, ms));
const mockIntake = {
    kind: "mock",
    capabilities: ()=>delay(()=>mock().capabilities()),
    upload: async (file, opts, onProgress)=>{
        for (const p of [
            25,
            60,
            100
        ]){
            await delay(()=>undefined, 120);
            onProgress?.(p);
        }
        return mock().upload(file, opts.year, opts.festival);
    },
    manual: (r)=>delay(()=>mock().manual(r)),
    job: (id)=>delay(()=>mock().job(id), 60),
    rerun: (id, rows)=>delay(()=>mock().rerun(id, rows)),
    accept: (id, rows)=>delay(()=>mock().accept(id, rows)),
    reject: (id)=>delay(()=>mock().reject(id)),
    report: (id)=>delay(()=>mock().report(id)),
    accepted: ()=>delay(()=>mock().accepted()),
    removeAccepted: (jobId)=>delay(()=>mock().removeAccepted(jobId)),
    pageUrl: (id, n)=>mock().pageUrl(id, n)
};
async function connectIntake() {
    try {
        const caps = await httpIntake.capabilities();
        if (caps && typeof caps === "object" && "ocr" in caps) return {
            client: httpIntake,
            caps
        };
    } catch  {
    /* fall through to mock */ }
    return {
        client: mockIntake,
        caps: await mockIntake.capabilities()
    };
}
function pollJob(client, id, onJob, onError) {
    let stopped = false;
    let timer = null;
    const tick = async ()=>{
        if (stopped) return;
        try {
            const j = await client.job(id);
            if (stopped) return;
            onJob(j);
            if (j.status === "running") timer = setTimeout(tick, 1500);
        } catch  {
            if (stopped) return;
            onError?.();
            timer = setTimeout(tick, 3000);
        }
    };
    void tick();
    return ()=>{
        stopped = true;
        if (timer) clearTimeout(timer);
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/intakeTypes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// FROZEN CONTRACT: docs/PLAN-INTAKE.md §4. Copied verbatim; do not drift.
//
// - `GET /api/intake/capabilities` → `{text_pdf: true, ocr: {available: bool, engine: "PaddleOCR 3.x"|null, venv: "backend/.ocr-venv", how_to_enable{en,hi}}, max_upload_mb: 25}`.
// - `POST /api/intake/upload` (multipart: `file`, optional `year`, `festival`, `pages` like "28-30", `force_ocr` bool) → `{job_id}`. `POST /api/intake/manual` body `{year, festival, site: {slug|null, name}, phase, readings: {parameter: {value: number|null, flag: string|null}}, source_note}` → `{job_id}`.
// - `GET /api/intake/jobs` → `[JobSummary]`; `GET /api/intake/jobs/{id}` → `Job`; `GET /api/intake/jobs/{id}/page/{n}.png` → PNG (rendered page or uploaded image); `POST /api/intake/jobs/{id}/rerun` body `{rows: [Row]}` (corrected rows) → `Job`; `POST /api/intake/jobs/{id}/accept` body `{rows: [Row]}` → `{ok, accepted_rows, ranking_changed: [slug]}`; `POST /api/intake/jobs/{id}/reject` → `{ok}`; `GET /api/intake/jobs/{id}/report` → `{markdown{en,hi}}`; `GET /api/intake/accepted` → `{rows: n, groups: [{job_id, source_file, year, festival, slug, site_name, phases: [..], rows, accepted_at}]}`; `DELETE /api/intake/accepted/{job_id}` → `{ok}`.
// - `Row = {row_id, page: number|null, site_as_printed, slug: string|null, site_match_confidence: number, year, festival: "Ganesh"|"Durga", phase: "pre"|"during"|"after", parameter (standard name), parameter_as_printed, value: number|null, flag: string|null, value_as_printed, unit_assumed, confidence: number (0–1; 1.0 for manual), issues: [issue_id], already_in_pack: bool}`.
// - `Stage = {key: "extract"|"normalize"|"validate"|"analyze"|"report", title{en,hi}, status: "pending"|"running"|"done"|"failed"|"skipped", started: iso|null, finished: iso|null, log: [{t: iso, text{en,hi}}], summary{en,hi}|null}`.
// - `Job = {id, created: iso, kind: "upload"|"manual", source: {file_name|null, mime|null, pages: [n], bytes|null, ocr_used: bool, ocr_engine: string|null}, context: {year, festival}, status: "running"|"needs_review"|"accepted"|"rejected"|"failed", stages: [Stage], rows: [Row], issues: [{id, row_id|null, level: "info"|"warn"|"error", text{en,hi}}], quality: {rows: n, numeric: n, flagged: n, mean_confidence: number, tables_found: n, sites_matched: n, sites_unmatched: n}, analysis: Analysis|null, report_available: bool}`.
// - `Analysis = {standard: "CPCB class B", readings: [{row_id, status: "breach"|"ok"|"no_limit"|"missing", limit_text}], ghats: [{slug, name{en,hi}, before: {tier, score, rank}, after: {tier, score, rank}, changed: bool, reasons: [v1 reason shape with source {report|null, pdf|null, page|null, upload: job_id|null}], forecast: {available, champion, p_breach, models{logreg,random_forest,xgboost,lightgbm}, top_reasons, basis{year,festival,phase}}|null, allocation_hint: {action, text{en,hi}}|null}], summary{en,hi}}`.
// - `GET /api/ranking` adds `user_data: {included: bool, rows: n, sources: [{job_id, file_name, year, festival}]}`; `?include_user=0` supported. Reason `source` gains optional `upload`.
__turbopack_context__.s([
    "PARAMS_13",
    ()=>PARAMS_13,
    "PARAM_UNIT",
    ()=>PARAM_UNIT
]);
const PARAMS_13 = [
    "pH",
    "Total solids",
    "Dissolved solids",
    "Suspended solids",
    "Dissolved oxygen",
    "BOD",
    "COD",
    "Turbidity",
    "Conductivity",
    "Chromium",
    "Lead",
    "Zinc",
    "Copper"
];
const PARAM_UNIT = {
    pH: "",
    "Total solids": "mg/l",
    "Dissolved solids": "mg/l",
    "Suspended solids": "mg/l",
    "Dissolved oxygen": "mg/l",
    BOD: "mg/l",
    COD: "mg/l",
    Turbidity: "NTU",
    Conductivity: "µS/cm",
    Chromium: "mg/l",
    Lead: "mg/l",
    Zinc: "mg/l",
    Copper: "mg/l"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mockIntake.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Local stand-in for /api/intake/* (docs/PLAN-INTAKE.md §4) used when the backend does not answer
// GET /api/intake/capabilities. Values come from public/data/ghats/*.json (MPPCB 2025 Ganesh, p. 28);
// stages complete over ~4 s. The analysis numbers are illustrative and say so in the summary.
__turbopack_context__.s([
    "MockIntake",
    ()=>MockIntake
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeTypes.ts [app-client] (ecmascript)");
;
const STAGE_MS = 800;
const TITLES = {
    extract: {
        en: "Extractor",
        hi: "निष्कर्षक"
    },
    normalize: {
        en: "Normaliser",
        hi: "मानकीकरण"
    },
    validate: {
        en: "Validator",
        hi: "सत्यापक"
    },
    analyze: {
        en: "Analyst",
        hi: "विश्लेषक"
    },
    report: {
        en: "Reporter",
        hi: "रिपोर्टर"
    }
};
const KEYS = [
    "extract",
    "normalize",
    "validate",
    "analyze",
    "report"
];
// MPPCB 2025 Ganesh, page 28 (values as in public/data/ghats/*.json), parameter order = PARAMS_13.
const KHATLAPURA_PRE = [
    7.34,
    310,
    278,
    32,
    7.3,
    4.4,
    19.6,
    6.1,
    447.8,
    0.03,
    0.031,
    0.082,
    0.138
];
const KHATLAPURA_AFTER = [
    7.76,
    404,
    318,
    86,
    6.5,
    5.2,
    28.8,
    8.2,
    470,
    0.03,
    0.031,
    0.04,
    0.08
];
const PREMPURA_PRE = [
    7.41,
    308,
    240,
    68,
    65,
    4.8,
    29.4,
    10.5,
    391,
    0.03,
    0.031,
    0.03,
    0.133
]; // DO misread 6.5 -> 65
const BAIRAGARH_PRE = [
    "*",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"
];
const UNKNOWN_PRE = [
    7.9,
    352,
    300,
    52,
    5.6,
    3.8,
    24,
    9.4,
    455,
    "BDL",
    "BDL",
    0.05,
    0.09
];
const AS_PRINTED = {
    pH: "pH",
    "Total solids": "Total Solids",
    "Dissolved solids": "T.D.S.",
    "Suspended solids": "T.S.S.",
    "Dissolved oxygen": "D.Oxygen",
    BOD: "B.O.D.",
    COD: "C.O.D.",
    Turbidity: "Turbidity",
    Conductivity: "Cond.",
    Chromium: "Cr",
    Lead: "Pb",
    Zinc: "Zn",
    Copper: "Cu"
};
/** deterministic pseudo-confidence in [0.72, 0.99] from a string */ function conf(seed) {
    let h = 2166136261;
    for(let i = 0; i < seed.length; i++)h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
    return 0.72 + (h >>> 0) % 2700 / 10000;
}
function makeRows(jobId) {
    const out = [];
    const add = (site, slug, smc, phase, vals, page, inPack)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARAMS_13"].forEach((p, i)=>{
            const v = vals[i];
            const isNum = typeof v === "number";
            const id = `${jobId}-${slug ?? "new"}-${phase}-${i}`;
            out.push({
                row_id: id,
                page,
                site_as_printed: site,
                slug,
                site_match_confidence: smc,
                year: 2025,
                festival: "Ganesh",
                phase,
                parameter: p,
                parameter_as_printed: AS_PRINTED[p] ?? p,
                value: isNum ? v : null,
                flag: isNum ? null : v === "-" ? "not sampled" : v,
                value_as_printed: String(v),
                unit_assumed: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARAM_UNIT"][p] ?? "",
                confidence: id.endsWith("-pre-4") && slug === "prempura" ? 0.64 : Math.round(conf(id) * 100) / 100,
                issues: [],
                already_in_pack: inPack
            });
        });
    };
    add("Location- Khatlapura Ghat", "khatlapura", 0.97, "pre", KHATLAPURA_PRE, 28, true);
    add("Location- Khatlapura Ghat", "khatlapura", 0.97, "after", KHATLAPURA_AFTER, 28, true);
    add("Location- Prempura Ghat", "prempura", 0.95, "pre", PREMPURA_PRE, 28, true);
    add("Location- Sant Hirdaram Nagar (Bairagarh)", "bairagarh", 0.78, "pre", BAIRAGARH_PRE, 28, true);
    add("Location- Gufa Mandir Talab", null, 0.41, "pre", UNKNOWN_PRE, 29, false);
    return out;
}
function makeIssues(rows) {
    const issues = [];
    const doBad = rows.find((r)=>r.slug === "prempura" && r.parameter === "Dissolved oxygen" && (r.value ?? 0) > 20);
    if (doBad) issues.push({
        id: "i-do-range",
        row_id: doBad.row_id,
        level: "error",
        text: {
            en: `Dissolved oxygen ${doBad.value} mg/l is outside 0–20. Likely a misread decimal (6.5?).`,
            hi: `घुलित ऑक्सीजन ${doBad.value} mg/l, 0–20 की सीमा से बाहर है। संभवतः दशमलव गलत पढ़ा गया (6.5?)।`
        }
    });
    const unk = rows.find((r)=>r.slug === null);
    if (unk) issues.push({
        id: "i-site",
        row_id: unk.row_id,
        level: "warn",
        text: {
            en: `Site "${unk.site_as_printed}" does not match any of the 7 ghats (best 41%). Kept as a new site.`,
            hi: `स्थल "${unk.site_as_printed}" 7 घाटों में से किसी से मेल नहीं खाता (सर्वोत्तम 41%)। नया स्थल रखा गया।`
        }
    });
    const kh = rows.find((r)=>r.slug === "khatlapura" && r.phase === "pre");
    if (kh) issues.push({
        id: "i-dup",
        row_id: kh.row_id,
        level: "info",
        text: {
            en: "Khatlapura, Prempura and Bairagarh Ganesh 2025 rows are already in the MPPCB pack (duplicates are not double-counted).",
            hi: "खटलापुरा, प्रेमपुरा और बैरागढ़ की गणेश 2025 पंक्तियाँ पहले से MPPCB पैक में हैं (दोहराव दो बार नहीं गिना जाता)।"
        }
    });
    const bod = rows.find((r)=>r.slug === "khatlapura" && r.phase === "after" && r.parameter === "BOD");
    if (bod) issues.push({
        id: "i-bod",
        row_id: bod.row_id,
        level: "info",
        text: {
            en: "BOD ≤ COD check passed for all tables.",
            hi: "सभी तालिकाओं में BOD ≤ COD जाँच सफल।"
        }
    });
    for (const i of issues){
        const r = rows.find((x)=>x.row_id === i.row_id);
        if (r) r.issues.push(i.id);
    }
    return issues;
}
function makeAnalysis(jobId) {
    return {
        standard: "CPCB class B",
        readings: [],
        summary: {
            en: "Demo analysis (illustrative numbers, not computed from your file). One ghat changes tier; the unmatched site is kept apart.",
            hi: "डेमो विश्लेषण (उदाहरण के अंक, आपकी फ़ाइल से गणना नहीं)। एक घाट का स्तर बदलता है; बेमेल स्थल अलग रखा गया।"
        },
        ghats: [
            {
                slug: "khatlapura",
                name: {
                    en: "Khatlapura ghat",
                    hi: "खटलापुरा घाट"
                },
                before: {
                    tier: "low",
                    score: 0.1514,
                    rank: 6
                },
                after: {
                    tier: "medium",
                    score: 0.2381,
                    rank: 4
                },
                changed: true,
                reasons: [
                    {
                        kind: "breach",
                        parameter: "BOD",
                        value: 5.2,
                        unit: "mg/l",
                        limit: "≤ 3",
                        year: 2025,
                        festival: "Ganesh",
                        phase: "after",
                        source: {
                            report: null,
                            pdf: null,
                            page: 28,
                            upload: jobId
                        },
                        text: {
                            en: "BOD was 5.2 mg/l after the Ganesh 2025 immersion. The bathing limit is at most 3 mg/l. Officer-added from mppcb_2025_p28.jpg page 28 (not yet verified by MPPCB).",
                            hi: "गणेश 2025 विसर्जन के बाद बीओडी 5.2 mg/l था। स्नान मानक अधिकतम 3 mg/l है। mppcb_2025_p28.jpg पृष्ठ 28 से अधिकारी द्वारा जोड़ा (MPPCB द्वारा अभी सत्यापित नहीं)।"
                        }
                    }
                ],
                forecast: {
                    available: true,
                    champion: "random_forest",
                    p_breach: 0.9095,
                    models: {
                        logreg: 0.7243,
                        random_forest: 0.9095,
                        xgboost: 0.9836,
                        lightgbm: 0.9869
                    },
                    top_reasons: [
                        {
                            feature: "pre_bod",
                            direction: "up",
                            text: {
                                en: "Pre-immersion BOD (4.4) pushes the breach estimate up.",
                                hi: "विसर्जन-पूर्व बीओडी (4.4) उल्लंघन की संभावना बढ़ाता है।"
                            }
                        },
                        {
                            feature: "site_prior_breach_rate",
                            direction: "up",
                            text: {
                                en: "This site's breach record in earlier years pushes the breach estimate up.",
                                hi: "पिछले वर्षों में इस स्थल का उल्लंघन रिकॉर्ड उल्लंघन की संभावना बढ़ाता है।"
                            }
                        }
                    ],
                    basis: {
                        year: 2025,
                        festival: "Ganesh",
                        phase: "pre"
                    }
                },
                allocation_hint: {
                    action: "aerate",
                    text: {
                        en: "Pre-position one aerator at Khatlapura before the evening peak.",
                        hi: "शाम के चरम से पहले खटलापुरा में एक एरेटर तैनात करें।"
                    }
                }
            },
            {
                slug: "prempura",
                name: {
                    en: "Prempura ghat",
                    hi: "प्रेमपुरा घाट"
                },
                before: {
                    tier: "low",
                    score: 0.0535,
                    rank: 7
                },
                after: {
                    tier: "low",
                    score: 0.0535,
                    rank: 7
                },
                changed: false,
                reasons: [],
                forecast: null,
                allocation_hint: null
            },
            {
                slug: "bairagarh",
                name: {
                    en: "Bairagarh (Sant Hirdaram) kund",
                    hi: "बैरागढ़ (संत हिरदाराम) कुंड"
                },
                before: {
                    tier: "insufficient_data",
                    score: 0.4614,
                    rank: 1
                },
                after: {
                    tier: "insufficient_data",
                    score: 0.4614,
                    rank: 1
                },
                changed: false,
                reasons: [],
                forecast: null,
                allocation_hint: {
                    action: "test_first",
                    text: {
                        en: "Still no measured values for Bairagarh: send the test team first.",
                        hi: "बैरागढ़ के लिए अभी भी कोई माप नहीं: पहले जाँच दल भेजें।"
                    }
                }
            }
        ]
    };
}
const iso = (ms)=>new Date(ms).toISOString();
const LOGS = {
    extract: [
        {
            en: "Received mppcb_2025_p28.jpg (image, 1 page).",
            hi: "mppcb_2025_p28.jpg प्राप्त (छवि, 1 पृष्ठ)।"
        },
        {
            en: "No text layer: OCR run on page 28 and 29.",
            hi: "टेक्स्ट परत नहीं: पृष्ठ 28 और 29 पर OCR चलाया।"
        },
        {
            en: "Found 5 tables (Location headers), 65 cells.",
            hi: "5 तालिकाएँ (Location शीर्षक), 65 खाने मिले।"
        }
    ],
    normalize: [
        {
            en: "Mapped 13 parameter labels (D.Oxygen → Dissolved oxygen, T.D.S. → Dissolved solids…).",
            hi: "13 मापदंड नाम मानकीकृत (D.Oxygen → घुलित ऑक्सीजन…)।"
        },
        {
            en: "Sites: 4 matched, 1 unmatched (Gufa Mandir Talab).",
            hi: "स्थल: 4 मिले, 1 नहीं मिला (गुफा मंदिर तालाब)।"
        },
        {
            en: "Header: Ganesh Idol Immersion -2025 → Ganesh 2025.",
            hi: "शीर्षक: Ganesh Idol Immersion -2025 → गणेश 2025।"
        }
    ],
    validate: [
        {
            en: "1 value outside plausible range (DO 65).",
            hi: "1 मान संभावित सीमा से बाहर (DO 65)।"
        },
        {
            en: "39 rows duplicate the existing pack.",
            hi: "39 पंक्तियाँ मौजूदा पैक की दोहराव हैं।"
        }
    ],
    analyze: [
        {
            en: "Class B status computed for 52 readings.",
            hi: "52 मापों की class B स्थिति निकाली।"
        },
        {
            en: "Re-ranked 7 ghats; forecast run with 4 models.",
            hi: "7 घाटों की पुनः रैंकिंग; 4 मॉडलों से पूर्वानुमान।"
        }
    ],
    report: [
        {
            en: "Bilingual intake report written.",
            hi: "द्विभाषी इनटेक रिपोर्ट लिखी गई।"
        }
    ]
};
const SUMMARY = {
    extract: {
        en: "65 rows from 5 tables (OCR)",
        hi: "5 तालिकाओं से 65 पंक्तियाँ (OCR)"
    },
    normalize: {
        en: "4 of 5 sites matched",
        hi: "5 में से 4 स्थल मिले"
    },
    validate: {
        en: "1 error, 1 warning, 2 notes",
        hi: "1 त्रुटि, 1 चेतावनी, 2 सूचनाएँ"
    },
    analyze: {
        en: "1 ghat changes tier",
        hi: "1 घाट का स्तर बदला"
    },
    report: {
        en: "Report ready (en/hi)",
        hi: "रिपोर्ट तैयार (en/hi)"
    }
};
function progress(m, now) {
    const el = now - m.t0;
    const stages = KEYS.map((k, i)=>{
        const s0 = m.t0 + i * STAGE_MS;
        const s1 = s0 + STAGE_MS;
        const status = now >= s1 ? "done" : now >= s0 ? "running" : "pending";
        const logs = LOGS[k];
        const shown = status === "done" ? logs.length : status === "running" ? Math.max(1, Math.ceil((now - s0) / STAGE_MS * logs.length)) : 0;
        return {
            key: k,
            title: TITLES[k],
            status,
            started: status === "pending" ? null : iso(s0),
            finished: status === "done" ? iso(s1) : null,
            log: logs.slice(0, shown).map((text, j)=>({
                    t: iso(s0 + j * STAGE_MS / logs.length),
                    text
                })),
            summary: status === "done" ? SUMMARY[k] : null
        };
    });
    const done = el >= KEYS.length * STAGE_MS;
    const b = m.base;
    if (b.status === "accepted" || b.status === "rejected") return {
        ...b,
        stages
    };
    return {
        ...b,
        stages,
        status: done ? "needs_review" : "running",
        rows: el >= 2 * STAGE_MS ? b.rows : [],
        analysis: done ? b.analysis : null,
        report_available: done
    };
}
function pageSvg(n) {
    const lines = n === 28 ? [
        "Ganesh Idol Immersion -2025",
        "Location- Khatlapura Ghat",
        "Parameter      Pre     After",
        "pH             7.34    7.76",
        "D.Oxygen       7.3     6.5",
        "B.O.D.         4.4     5.2",
        "Location- Prempura Ghat",
        "D.Oxygen       6.5",
        "Location- Sant Hirdaram Nagar",
        "pH             *"
    ] : [
        "Location- Gufa Mandir Talab",
        "Parameter      Pre",
        "pH             7.9",
        "D.Oxygen       5.6",
        "Cr             BDL"
    ];
    const text = lines.map((l, i)=>`<text x="40" y="${80 + i * 46}" font-family="monospace" font-size="26" fill="#222">${l}</text>`).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="850" height="1100" viewBox="0 0 850 1100"><rect width="850" height="1100" fill="#f4f1ea"/><text x="40" y="40" font-family="sans-serif" font-size="20" fill="#888">DEMO page ${n} (mock, not the real report)</text>${text}</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
class MockIntake {
    jobs = new Map();
    acceptedGroups = [];
    n = 0;
    capabilities() {
        return {
            text_pdf: true,
            ocr: {
                available: false,
                engine: null,
                venv: "backend/.ocr-venv",
                how_to_enable: {
                    en: "Create backend/.ocr-venv and install paddleocr + pypdfium2.",
                    hi: "backend/.ocr-venv बनाएँ और paddleocr + pypdfium2 स्थापित करें।"
                }
            },
            max_upload_mb: 25
        };
    }
    upload(file, year, festival) {
        const id = `demo-${++this.n}`;
        const rows = makeRows(id);
        const issues = makeIssues(rows);
        const numeric = rows.filter((r)=>r.value !== null).length;
        const base = {
            id,
            created: iso(Date.now()),
            kind: "upload",
            source: {
                file_name: file.name,
                mime: file.type || null,
                pages: [
                    28,
                    29
                ],
                bytes: file.size,
                ocr_used: true,
                ocr_engine: "PaddleOCR 3.x (demo)"
            },
            context: {
                year: year ?? 2025,
                festival: festival === "Durga" ? "Durga" : "Ganesh"
            },
            status: "running",
            stages: [],
            rows,
            issues,
            quality: {
                rows: rows.length,
                numeric,
                flagged: rows.length - numeric,
                mean_confidence: rows.reduce((a, r)=>a + r.confidence, 0) / rows.length,
                tables_found: 5,
                sites_matched: 4,
                sites_unmatched: 1
            },
            analysis: makeAnalysis(id),
            report_available: false
        };
        this.jobs.set(id, {
            base,
            t0: Date.now()
        });
        return {
            job_id: id
        };
    }
    manual(req) {
        const id = `demo-${++this.n}`;
        const rows = Object.entries(req.readings).map(([p, v], i)=>({
                row_id: `${id}-${i}`,
                page: null,
                site_as_printed: req.site.name,
                slug: req.site.slug,
                site_match_confidence: 1,
                year: req.year,
                festival: req.festival,
                phase: req.phase,
                parameter: p,
                parameter_as_printed: p,
                value: v.value,
                flag: v.flag,
                value_as_printed: v.value !== null ? String(v.value) : v.flag ?? "",
                unit_assumed: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PARAM_UNIT"][p] ?? "",
                confidence: 1,
                issues: [],
                already_in_pack: false
            }));
        const numeric = rows.filter((r)=>r.value !== null).length;
        const an = makeAnalysis(id);
        const base = {
            id,
            created: iso(Date.now()),
            kind: "manual",
            source: {
                file_name: null,
                mime: null,
                pages: [],
                bytes: null,
                ocr_used: false,
                ocr_engine: null
            },
            context: {
                year: req.year,
                festival: req.festival
            },
            status: "running",
            stages: [],
            rows,
            issues: [],
            quality: {
                rows: rows.length,
                numeric,
                flagged: rows.length - numeric,
                mean_confidence: 1,
                tables_found: 1,
                sites_matched: req.site.slug ? 1 : 0,
                sites_unmatched: req.site.slug ? 0 : 1
            },
            analysis: {
                ...an,
                ghats: an.ghats.filter((g)=>g.slug === req.site.slug)
            },
            report_available: false
        };
        this.jobs.set(id, {
            base,
            t0: Date.now() - 2 * STAGE_MS
        });
        return {
            job_id: id
        };
    }
    job(id) {
        const m = this.jobs.get(id);
        if (!m) throw new Error("404");
        return progress(m, Date.now());
    }
    rerun(id, rows) {
        const m = this.jobs.get(id);
        if (!m) throw new Error("404");
        const fixed = rows.map((r)=>({
                ...r,
                issues: r.issues.filter((i)=>!(i === "i-do-range" && r.value !== null && r.value <= 20))
            }));
        m.base = {
            ...m.base,
            rows: fixed,
            issues: m.base.issues.filter((i)=>fixed.some((r)=>r.issues.includes(i.id)) || i.row_id === null)
        };
        m.t0 = Date.now() - 3 * STAGE_MS; // re-run analyse + report only
        return progress(m, Date.now());
    }
    accept(id, rows) {
        const m = this.jobs.get(id);
        if (!m) throw new Error("404");
        m.base = {
            ...m.base,
            status: "accepted"
        };
        const bySite = new Map();
        for (const r of rows){
            const k = r.slug ?? `new:${r.site_as_printed}`;
            bySite.set(k, [
                ...bySite.get(k) ?? [],
                r
            ]);
        }
        for (const rs of bySite.values()){
            this.acceptedGroups.push({
                job_id: id,
                source_file: m.base.source.file_name ?? "manual entry",
                year: rs[0].year,
                festival: rs[0].festival,
                slug: rs[0].slug,
                site_name: rs[0].site_as_printed.replace(/^Location-\s*/, ""),
                phases: [
                    ...new Set(rs.map((r)=>r.phase))
                ],
                rows: rs.length,
                accepted_at: iso(Date.now())
            });
        }
        return {
            ok: true,
            accepted_rows: rows.length,
            ranking_changed: (m.base.analysis?.ghats ?? []).filter((g)=>g.changed).map((g)=>g.slug)
        };
    }
    reject(id) {
        const m = this.jobs.get(id);
        if (m) m.base = {
            ...m.base,
            status: "rejected"
        };
        return {
            ok: true
        };
    }
    report(id) {
        const j = this.job(id);
        const lines = (l)=>[
                l === "en" ? `# Intake report (demo) — ${j.source.file_name ?? "manual entry"}` : `# इनटेक रिपोर्ट (डेमो) — ${j.source.file_name ?? "हाथ से दर्ज"}`,
                "",
                l === "en" ? "Officer-added readings, not yet verified by MPPCB." : "अधिकारी द्वारा जोड़े गए माप, MPPCB द्वारा अभी सत्यापित नहीं।",
                "",
                ...(j.analysis?.ghats ?? []).map((g)=>`- ${g.name[l]}: ${g.before.tier} ${g.before.score.toFixed(3)} → ${g.after.tier} ${g.after.score.toFixed(3)}`),
                "",
                j.analysis?.summary[l] ?? ""
            ].join("\n");
        return {
            markdown: {
                en: lines("en"),
                hi: lines("hi")
            }
        };
    }
    accepted() {
        return {
            rows: this.acceptedGroups.reduce((a, g)=>a + g.rows, 0),
            groups: this.acceptedGroups
        };
    }
    removeAccepted(jobId) {
        this.acceptedGroups = this.acceptedGroups.filter((g)=>g.job_id !== jobId);
        return {
            ok: true
        };
    }
    pageUrl(_id, n) {
        return pageSvg(n);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_050824px4pv5d._.js.map