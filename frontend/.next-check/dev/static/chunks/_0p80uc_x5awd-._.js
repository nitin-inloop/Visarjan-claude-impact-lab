(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ActionChips.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionChips",
    ()=>ActionChips
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actionlog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actionlog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ActionChips({ slug, actions, trackable = true }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const log = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actionlog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "flex flex-col gap-2",
        children: actions.map((a)=>{
            const done = log.some((e)=>e.ghat === slug && e.action === a.code);
            const [head, ...rest] = a.text[lang].split(/:\s*/);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex items-start gap-2 rounded border px-3 py-2", a.code === "lake_ban" ? "border-rule bg-surface" : "border-accent/40"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("font-semibold", a.code === "lake_ban" ? "text-ink" : "text-accent", done && "line-through"),
                                children: t.action[a.code] ?? head
                            }, void 0, false, {
                                fileName: "[project]/components/ActionChips.tsx",
                                lineNumber: 19,
                                columnNumber: 15
                            }, this),
                            rest.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[0.95rem]",
                                children: [
                                    ": ",
                                    rest.join(": ")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ActionChips.tsx",
                                lineNumber: 22,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ActionChips.tsx",
                        lineNumber: 18,
                        columnNumber: 13
                    }, this),
                    trackable && a.code !== "lake_ban" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actionlog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleDone"])(slug, a.code),
                        "aria-pressed": done,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("no-print shrink-0 rounded px-2 py-0.5 text-sm border", done ? "bg-low text-paper border-low" : "border-rule text-muted hover:border-ink hover:text-ink"),
                        children: done ? `✓ ${t.done}` : t.markDone
                    }, void 0, false, {
                        fileName: "[project]/components/ActionChips.tsx",
                        lineNumber: 25,
                        columnNumber: 15
                    }, this)
                ]
            }, a.code, true, {
                fileName: "[project]/components/ActionChips.tsx",
                lineNumber: 17,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/ActionChips.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(ActionChips, "uBzrsv2jyFwDVl5lBaRbzyFxLQM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actionlog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"]
    ];
});
_c = ActionChips;
var _c;
__turbopack_context__.k.register(_c, "ActionChips");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ActionSheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionSheet",
    ()=>ActionSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actionlog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actionlog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useLive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DaysLeft$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DaysLeft.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RankCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RankCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LoadState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserDataBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UserDataBadge.tsx [app-client] (ecmascript)");
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
const TIER_ORDER = {
    insufficient_data: 0,
    high: 1,
    medium: 2,
    low: 3
};
function ActionSheet({ initial }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLive"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchRanking"], initial);
    const log = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actionlog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"])();
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadState"], {
        error: error
    }, void 0, false, {
        fileName: "[project]/components/ActionSheet.tsx",
        lineNumber: 20,
        columnNumber: 21
    }, this);
    const ghats = [
        ...data.ghats
    ].sort((a, b)=>TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.rank - b.rank);
    const s = data.summary;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "pt-6 pb-5 border-b border-rule",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-[1.75rem] sm:text-[2rem] font-bold leading-tight",
                        children: t.title
                    }, void 0, false, {
                        fileName: "[project]/components/ActionSheet.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DaysLeft$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DaysLeft"], {}, void 0, false, {
                            fileName: "[project]/components/ActionSheet.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ActionSheet.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-[0.95rem] text-muted",
                        children: t.standardLine
                    }, void 0, false, {
                        fileName: "[project]/components/ActionSheet.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UserDataBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserDataBadge"], {
                        ranking: data
                    }, void 0, false, {
                        fileName: "[project]/components/ActionSheet.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-lg leading-relaxed",
                        children: [
                            t.summaryDo(s.do_below_5, s.do_readings, s.do_zero),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/ActionSheet.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            t.summaryBod(s.bod_above_3, s.bod_readings)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ActionSheet.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-wrap gap-2 no-print",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/brief",
                                className: "rounded bg-accent text-paper px-4 py-2 font-semibold no-underline hover:opacity-90",
                                children: t.openBrief
                            }, void 0, false, {
                                fileName: "[project]/components/ActionSheet.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/whatif",
                                className: "rounded border-2 border-accent text-accent px-4 py-1.5 font-semibold no-underline hover:bg-surface",
                                children: t.enterReadings
                            }, void 0, false, {
                                fileName: "[project]/components/ActionSheet.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actionlog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadCsv"])(log),
                                className: "rounded border border-rule px-4 py-1.5 text-muted hover:border-ink hover:text-ink",
                                children: [
                                    t.downloadLog,
                                    " ",
                                    log.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "tabular",
                                        children: [
                                            "(",
                                            log.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ActionSheet.tsx",
                                        lineNumber: 49,
                                        columnNumber: 48
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ActionSheet.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ActionSheet.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-muted no-print",
                        children: t.logNote
                    }, void 0, false, {
                        fileName: "[project]/components/ActionSheet.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ActionSheet.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "mt-5 space-y-5",
                "aria-label": t.sheet,
                children: ghats.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RankCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RankCard"], {
                            g: g
                        }, void 0, false, {
                            fileName: "[project]/components/ActionSheet.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this)
                    }, g.slug, false, {
                        fileName: "[project]/components/ActionSheet.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ActionSheet.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ActionSheet.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(ActionSheet, "In2Se3RhkPM3TWIys5svfTYyl+o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLive"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actionlog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLog"]
    ];
});
_c = ActionSheet;
var _c;
__turbopack_context__.k.register(_c, "ActionSheet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/DaysLeft.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DaysLeft",
    ()=>DaysLeft,
    "daysUntilVisarjan",
    ()=>daysUntilVisarjan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function daysUntilVisarjan(now = new Date()) {
    const target = Date.UTC(2026, 9, 20);
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((target - today) / 86400000);
}
function DaysLeft() {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const now = new Date();
    const date = now.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-[0.95rem]",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                suppressHydrationWarning: true,
                children: [
                    t.today,
                    ": ",
                    date
                ]
            }, void 0, true, {
                fileName: "[project]/components/DaysLeft.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                fileName: "[project]/components/DaysLeft.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                suppressHydrationWarning: true,
                children: t.daysLeft(daysUntilVisarjan(now))
            }, void 0, false, {
                fileName: "[project]/components/DaysLeft.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/DaysLeft.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(DaysLeft, "TgDcNHuqGasxAn0+LEfJxKMCGfI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = DaysLeft;
var _c;
__turbopack_context__.k.register(_c, "DaysLeft");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/components/LoadState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadState",
    ()=>LoadState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function LoadState({ error }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: error ? "py-10 text-high font-semibold" : "py-10 text-muted",
        children: error ? t.loadError : t.loading
    }, void 0, false, {
        fileName: "[project]/components/LoadState.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_s(LoadState, "p2BMN842WmXaElEn1NQnTw7gg40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = LoadState;
var _c;
__turbopack_context__.k.register(_c, "LoadState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ModelsView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModelsView",
    ()=>ModelsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useLive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ForecastPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ForecastPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LoadState.tsx [app-client] (ecmascript)");
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
const fmt = (v, d = 2)=>typeof v === "number" ? v.toFixed(d) : "—";
function ModelsView({ initialLb, initialAlloc, ranking }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const lb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLive"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchLeaderboard"], initialLb);
    const [budget, setBudget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAlloc?.budget ?? 8);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const alloc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLive"])({
        "ModelsView.useLive[alloc]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAllocation"])(query)
    }["ModelsView.useLive[alloc]"], initialAlloc, [
        query
    ]);
    const names = Object.fromEntries((ranking?.ghats ?? []).map((g)=>[
            g.slug,
            g.name
        ]));
    if (!lb.data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadState"], {
        error: lb.error
    }, void 0, false, {
        fileName: "[project]/components/ModelsView.tsx",
        lineNumber: 22,
        columnNumber: 24
    }, this);
    const L = lb.data;
    const imps = L.importances[L.champion] ?? [];
    const maxImp = Math.max(...imps.map((i)=>Math.abs(i.importance)), 1e-9);
    const A = alloc.data;
    const pv = A ? Object.entries(A.policy_values) : [];
    const pvMax = Math.max(...pv.map(([, v])=>v));
    const actionName = (a)=>a.split("+").map((x)=>t.action[x === "test" ? "test_first" : x] ?? x).join(" + ");
    const th = "px-2 py-2 text-right font-semibold whitespace-nowrap";
    const td = "px-2 py-1.5 text-right tabular";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pt-6 space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-[1.6rem] font-bold leading-tight",
                        children: [
                            t.modelsTitle,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "align-middle inline-block rounded border-2 border-dashed border-medium text-medium text-sm px-2 py-0.5",
                                children: t.experimental
                            }, void 0, false, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mt-1",
                        children: t.trainedOn(L.n_train)
                    }, void 0, false, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ModelsView.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-labelledby": "lb-h",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "lb-h",
                        className: "text-xl font-bold mb-2",
                        children: t.leaderboard
                    }, void 0, false, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto border border-rule rounded-md -mx-4 sm:mx-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm border-collapse min-w-max",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-surface",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(th, "!text-left"),
                                                children: t.colModel
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: th,
                                                children: t.colAuc
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 57,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: th,
                                                children: t.colAucT
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 58,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: th,
                                                children: t.colPr
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 59,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: th,
                                                children: t.colBrier
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: th,
                                                children: t.colLog
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: th,
                                                children: t.colF1
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ModelsView.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ModelsView.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: L.rows.map((r)=>{
                                        const champ = r.model === L.champion;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("border-t border-rule", champ && "bg-accent/5 font-semibold"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "row",
                                                    className: "px-2 py-1.5 text-left whitespace-nowrap",
                                                    children: [
                                                        champ && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": true,
                                                            children: "★ "
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ModelsView.tsx",
                                                            lineNumber: 71,
                                                            columnNumber: 33
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ForecastPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modelLabel"])(r.model)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: td,
                                                    children: fmt(r.auc_groupkfold)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: td,
                                                    children: fmt(r.auc_temporal_2025)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: td,
                                                    children: fmt(r.pr_auc)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: td,
                                                    children: fmt(r.brier)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: td,
                                                    children: fmt(r.logloss)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: td,
                                                    children: fmt(r.f1)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, r.model, true, {
                                            fileName: "[project]/components/ModelsView.tsx",
                                            lineNumber: 69,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/ModelsView.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ModelsView.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-[0.95rem]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: [
                                    t.championRule,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            " ",
                            L.selection_rule
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ModelsView.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-labelledby": "imp-h",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "imp-h",
                        className: "text-xl font-bold mb-2",
                        children: [
                            t.importances,
                            " (",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ForecastPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modelLabel"])(L.champion),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-1.5 text-sm",
                        children: imps.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "grid grid-cols-[minmax(8rem,12rem)_1fr_3.5rem] items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: i.feature
                                    }, void 0, false, {
                                        fileName: "[project]/components/ModelsView.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-3 bg-surface rounded-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block h-full bg-accent rounded-sm",
                                            style: {
                                                width: `${Math.abs(i.importance) / maxImp * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/ModelsView.tsx",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ModelsView.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "tabular text-right",
                                        children: fmt(i.importance)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ModelsView.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i.feature, true, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ModelsView.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-labelledby": "cql-h",
                className: "border-2 border-dashed border-medium rounded-md p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "cql-h",
                        className: "text-xl font-bold mb-2",
                        children: [
                            t.cql,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold text-medium",
                                children: [
                                    "(",
                                    t.experimental,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 110,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    !A ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadState"], {
                        error: alloc.error
                    }, void 0, false, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[0.95rem]",
                                children: A.caveat[lang]
                            }, void 0, false, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-4 font-semibold",
                                children: t.policyValues
                            }, void 0, false, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "mt-1 text-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: pv.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(v === pvMax && "font-semibold"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "row",
                                                    className: "pr-4 py-1 text-left font-normal",
                                                    children: t.policy[k] ?? k
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-1 text-right tabular",
                                                    children: fmt(v)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ModelsView.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, k, true, {
                                            fileName: "[project]/components/ModelsView.tsx",
                                            lineNumber: 121,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/ModelsView.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "mt-4 flex items-end gap-2 no-print",
                                onSubmit: (e)=>{
                                    e.preventDefault();
                                    setQuery(budget);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-sm font-semibold mb-1",
                                                children: t.budget
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 139,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: 0,
                                                max: 50,
                                                value: budget,
                                                onChange: (e)=>setBudget(Number(e.target.value)),
                                                className: "w-24 rounded border border-ink/60 px-2 py-1.5 tabular"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ModelsView.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "rounded bg-accent text-paper px-4 py-2 font-semibold",
                                        children: t.update
                                    }, void 0, false, {
                                        fileName: "[project]/components/ModelsView.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-4 font-semibold",
                                children: [
                                    t.plan,
                                    ": ",
                                    t.budget,
                                    " ",
                                    A.budget
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                className: "mt-1 list-decimal pl-5 space-y-1",
                                children: A.plan.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: names[p.slug]?.[lang] ?? p.slug
                                            }, void 0, false, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 159,
                                                columnNumber: 19
                                            }, this),
                                            ": ",
                                            actionName(p.action),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-muted tabular",
                                                children: [
                                                    "(",
                                                    t.cost,
                                                    " ",
                                                    p.cost,
                                                    ", ",
                                                    t.gain,
                                                    " ",
                                                    fmt(p.q_gain),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ModelsView.tsx",
                                                lineNumber: 160,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${p.slug}-${i}`, true, {
                                        fileName: "[project]/components/ModelsView.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/ModelsView.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ModelsView.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ModelsView.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ModelsView.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(ModelsView, "aPONtDsTUDQOKeUpztZkH4rqQao=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLive"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLive"]
    ];
});
_c = ModelsView;
var _c;
__turbopack_context__.k.register(_c, "ModelsView");
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
"[project]/components/RankCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RankCard",
    ()=>RankCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TierBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TierBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScoreBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ScoreBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TrendArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TrendArrow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ReasonLine$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ReasonLine.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ActionChips$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ActionChips.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SiteBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SiteBadges.tsx [app-client] (ecmascript)");
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
function RankCard({ g }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const insufficient = g.tier === "insufficient_data";
    const breach = g.reasons.filter((r)=>r.kind === "breach").slice(0, 3);
    const context = g.reasons.filter((r)=>r.kind === "context").slice(0, 2);
    const gap = g.reasons.filter((r)=>r.kind === "gap");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        id: g.slug,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded-md p-4 sm:p-5 bg-paper", insufficient ? "border-2 border-dashed border-gap" : "border border-rule"),
        "aria-labelledby": `${g.slug}-name`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 sm:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: t.rank
                            }, void 0, false, {
                                fileName: "[project]/components/RankCard.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-3xl sm:text-4xl font-bold tabular leading-none text-ink",
                                children: g.rank
                            }, void 0, false, {
                                fileName: "[project]/components/RankCard.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: `${g.slug}-name`,
                                className: "text-xl font-bold leading-snug",
                                children: g.name[lang]
                            }, void 0, false, {
                                fileName: "[project]/components/RankCard.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted text-[0.95rem]",
                                children: g.water_body_name?.[lang] ?? g.water_body
                            }, void 0, false, {
                                fileName: "[project]/components/RankCard.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SiteBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiteBadges"], {
                                g: g
                            }, void 0, false, {
                                fileName: "[project]/components/RankCard.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TierBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TierBadge"], {
                        tier: g.tier,
                        large: true
                    }, void 0, false, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TrendArrow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrendArrow"], {
                        trend: g.trend
                    }, void 0, false, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                className: "mt-1 text-[0.95rem]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                        className: "cursor-pointer text-accent",
                        children: t.whyTier
                    }, void 0, false, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1",
                        children: g.tier_rule[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm text-muted mb-1 tabular",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    t.score,
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-ink",
                                        children: g.score.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/components/RankCard.tsx",
                                        lineNumber: 52,
                                        columnNumber: 23
                                    }, this),
                                    insufficient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            " (",
                                            t.partialScore,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RankCard.tsx",
                                        lineNumber: 53,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/RankCard.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    Math.round(g.breach_rate * 100),
                                    "% ",
                                    t.breachRate,
                                    " · ",
                                    t.readingsOf(g.readings_available, g.readings_expected)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/RankCard.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScoreBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScoreBar"], {
                        score: g.score,
                        tier: g.tier,
                        label: t.score
                    }, void 0, false, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            gap.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4 space-y-2",
                "aria-label": t.dataGap,
                children: gap.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ReasonLine$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReasonLine"], {
                        reason: r
                    }, `g${i}`, false, {
                        fileName: "[project]/components/RankCard.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4 space-y-2",
                children: [
                    breach.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ReasonLine$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReasonLine"], {
                            reason: r
                        }, `b${i}`, false, {
                            fileName: "[project]/components/RankCard.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)),
                    context.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ReasonLine$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReasonLine"], {
                            reason: r
                        }, `c${i}`, false, {
                            fileName: "[project]/components/RankCard.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mt-4 mb-2 text-sm font-semibold text-muted",
                children: t.actions
            }, void 0, false, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ActionChips$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionChips"], {
                slug: g.slug,
                actions: g.actions
            }, void 0, false, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 no-print",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/ghat/${g.slug}`,
                    className: "inline-block rounded bg-accent text-paper px-4 py-2 font-semibold no-underline hover:opacity-90",
                    children: t.evidence
                }, void 0, false, {
                    fileName: "[project]/components/RankCard.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/RankCard.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/RankCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(RankCard, "TgDcNHuqGasxAn0+LEfJxKMCGfI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = RankCard;
var _c;
__turbopack_context__.k.register(_c, "RankCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ReasonLine.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReasonLine",
    ()=>ReasonLine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PdfLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PdfLink.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/** The page link replaces the trailing "Source: ... page N." sentence on screen. */ function stripSource(s) {
    return s.replace(/\s*(Source|स्रोत):[^]*$/u, "").trim();
}
function ReasonLine({ reason }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const gap = reason.kind === "gap";
    const ctx = reason.kind === "context";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("pl-3 border-l-[3px]", gap ? "border-gap text-gap font-semibold" : ctx ? "border-rule text-muted" : "border-ink/70"),
        children: [
            gap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: [
                    t.dataGap,
                    ": "
                ]
            }, void 0, true, {
                fileName: "[project]/components/ReasonLine.tsx",
                lineNumber: 19,
                columnNumber: 15
            }, this),
            ctx && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-semibold mr-1",
                children: [
                    t.context,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/components/ReasonLine.tsx",
                lineNumber: 20,
                columnNumber: 15
            }, this),
            stripSource(reason.text?.[lang] ?? ""),
            " ",
            reason.source && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PdfLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PdfLink"], {
                source: reason.source
            }, void 0, false, {
                fileName: "[project]/components/ReasonLine.tsx",
                lineNumber: 21,
                columnNumber: 66
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ReasonLine.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(ReasonLine, "TgDcNHuqGasxAn0+LEfJxKMCGfI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = ReasonLine;
var _c;
__turbopack_context__.k.register(_c, "ReasonLine");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ScoreBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScoreBar",
    ()=>ScoreBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
"use client";
;
;
const FILL = {
    insufficient_data: "bg-gap",
    high: "bg-high",
    medium: "bg-medium",
    low: "bg-low"
};
function ScoreBar({ score, tier, label }) {
    const pct = Math.max(0, Math.min(1, score)) * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-2.5 w-full rounded-sm bg-surface border border-rule",
        role: "meter",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": score,
        "aria-label": label,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("h-full rounded-sm", FILL[tier], tier === "insufficient_data" && "opacity-60"),
                style: {
                    width: `${pct}%`
                }
            }, void 0, false, {
                fileName: "[project]/components/ScoreBar.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "absolute top-[-3px] bottom-[-3px] w-px bg-ink/40",
                style: {
                    left: "25%"
                }
            }, void 0, false, {
                fileName: "[project]/components/ScoreBar.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "absolute top-[-3px] bottom-[-3px] w-px bg-ink/40",
                style: {
                    left: "45%"
                }
            }, void 0, false, {
                fileName: "[project]/components/ScoreBar.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ScoreBar.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = ScoreBar;
var _c;
__turbopack_context__.k.register(_c, "ScoreBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SiteBadges.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteBadges",
    ()=>SiteBadges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function SiteBadges({ g }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    if (!g.ngt_lake_ban && g.site_confidence === "high") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-1.5 flex flex-col gap-1 text-sm",
        children: [
            g.ngt_lake_ban && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block rounded border border-ink px-1.5 font-semibold mr-1.5",
                        children: t.ngtBan
                    }, void 0, false, {
                        fileName: "[project]/components/SiteBadges.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: t.ngtBanNote
                    }, void 0, false, {
                        fileName: "[project]/components/SiteBadges.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SiteBadges.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this),
            g.site_confidence !== "high" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block rounded border border-medium text-medium px-1.5 font-semibold mr-1.5",
                        children: t.siteMedium
                    }, void 0, false, {
                        fileName: "[project]/components/SiteBadges.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: g.site_note?.[lang] ?? t.siteMediumNote
                    }, void 0, false, {
                        fileName: "[project]/components/SiteBadges.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SiteBadges.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SiteBadges.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(SiteBadges, "TgDcNHuqGasxAn0+LEfJxKMCGfI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = SiteBadges;
var _c;
__turbopack_context__.k.register(_c, "SiteBadges");
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
"[project]/components/TrendArrow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrendArrow",
    ()=>TrendArrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const ARROW = {
    worsening: "↗",
    stable: "→",
    improving: "↘"
};
function TrendArrow({ trend }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex items-center gap-1 whitespace-nowrap", trend === "worsening" ? "text-high" : trend === "improving" ? "text-low" : "text-muted"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "font-bold",
                children: ARROW[trend]
            }, void 0, false, {
                fileName: "[project]/components/TrendArrow.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            t.trend[trend]
        ]
    }, void 0, true, {
        fileName: "[project]/components/TrendArrow.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(TrendArrow, "p2BMN842WmXaElEn1NQnTw7gg40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = TrendArrow;
var _c;
__turbopack_context__.k.register(_c, "TrendArrow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/UserDataBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserDataBadge",
    ()=>UserDataBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function UserDataBadge({ ranking }) {
    _s();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const u = ranking?.user_data;
    if (!u?.included) return null;
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded border border-medium bg-medium-bg px-2.5 py-1 text-sm text-medium",
        role: "note",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: "◆"
            }, void 0, false, {
                fileName: "[project]/components/UserDataBadge.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold",
                children: x.badge(u.rows)
            }, void 0, false, {
                fileName: "[project]/components/UserDataBadge.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/#intake",
                className: "text-link underline underline-offset-2",
                children: x.badgeLink
            }, void 0, false, {
                fileName: "[project]/components/UserDataBadge.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UserDataBadge.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(UserDataBadge, "BpHATZRBXYqVpOgCf2HLIdSY7VA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = UserDataBadge;
var _c;
__turbopack_context__.k.register(_c, "UserDataBadge");
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
"[project]/components/live/AlertBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertBanner",
    ()=>AlertBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveFormat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$AlertFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/AlertFeed.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function AlertBanner() {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data, api } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { select, voiceApi } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const top = (data?.alerts ?? []).filter((a)=>a.state === "open" && (a.severity === "critical" || a.severity === "high")).sort((a, b)=>Number(a.baseline) - Number(b.baseline) || b.t_update - a.t_update || (b.severity === "critical" ? 1 : 0) - (a.severity === "critical" ? 1 : 0))[0];
    const critical = top?.severity === "critical";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-live": critical ? "assertive" : "polite",
        "aria-atomic": "true",
        children: top && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("cc-enter flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border px-3 py-2", critical ? "border-critical bg-[color-mix(in_srgb,var(--critical)_12%,var(--paper))]" : "border-high bg-high-bg"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-semibold text-muted",
                    children: t.lv.newest
                }, void 0, false, {
                    fileName: "[project]/components/live/AlertBanner.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$AlertFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SevChip"], {
                    s: top.severity
                }, void 0, false, {
                    fileName: "[project]/components/live/AlertBanner.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs tabular text-muted",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtClock"])(top.t_update)
                }, void 0, false, {
                    fileName: "[project]/components/live/AlertBanner.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "text-left text-ink font-semibold hover:underline min-w-0 basis-full sm:basis-0 sm:flex-1 order-last sm:order-none",
                    onClick: ()=>select(top.ghat),
                    children: top.text[lang]
                }, void 0, false, {
                    fileName: "[project]/components/live/AlertBanner.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded border border-ink/40 px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent",
                            onClick: ()=>api.ack(top.id).catch(()=>undefined),
                            children: t.lv.ack
                        }, void 0, false, {
                            fileName: "[project]/components/live/AlertBanner.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "rounded border border-ink/40 px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent",
                            onClick: ()=>voiceApi.say(top.speak, critical),
                            children: t.lv.speak
                        }, void 0, false, {
                            fileName: "[project]/components/live/AlertBanner.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/live/AlertBanner.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this)
            ]
        }, top.id + top.severity, true, {
            fileName: "[project]/components/live/AlertBanner.tsx",
            lineNumber: 22,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/AlertBanner.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(AlertBanner, "NkQZHMsQIsTAf+FZA+22WVO0PX8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c = AlertBanner;
var _c;
__turbopack_context__.k.register(_c, "AlertBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/AlertFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertFeed",
    ()=>AlertFeed,
    "AlertRow",
    ()=>AlertRow,
    "SevChip",
    ()=>SevChip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveFormat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function SevChip({ s }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex items-center gap-1 rounded px-1.5 py-px text-xs font-bold whitespace-nowrap", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_CHIP"][s]),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_ICON"][s]
            }, void 0, false, {
                fileName: "[project]/components/live/AlertFeed.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            t.lv.sev[s]
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/AlertFeed.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(SevChip, "p2BMN842WmXaElEn1NQnTw7gg40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = SevChip;
function AlertRow({ a, compact = false }) {
    _s1();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { api, data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { select, voiceApi, selected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const g = data?.ghats[a.ghat];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("cc-enter border border-rule border-l-4 rounded bg-surface px-3 py-2", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_BAR"][a.severity], selected === a.ghat && "ring-1 ring-accent", a.state === "acked" && "opacity-75"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-x-2 gap-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SevChip, {
                        s: a.severity
                    }, void 0, false, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs tabular text-muted",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtClock"])(a.t_update)
                    }, void 0, false, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    a.baseline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs rounded border border-rule px-1 text-muted",
                        children: t.lv.baseline
                    }, void 0, false, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 38,
                        columnNumber: 24
                    }, this),
                    a.state === "acked" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted",
                        children: [
                            "✓ ",
                            t.lv.acked
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 39,
                        columnNumber: 33
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ml-auto text-sm font-semibold text-link hover:underline text-left",
                        onClick: ()=>select(a.ghat),
                        children: g?.name[lang].split(" /")[0] ?? a.ghat
                    }, void 0, false, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/AlertFeed.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("mt-1 text-ink", compact ? "text-sm" : "text-[0.95rem]"),
                children: a.text[lang]
            }, void 0, false, {
                fileName: "[project]/components/live/AlertFeed.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1.5 flex gap-1.5",
                children: [
                    a.state === "open" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded border border-rule px-2 py-0.5 text-xs font-semibold text-ink hover:border-accent",
                        onClick: ()=>api.ack(a.id).catch(()=>undefined),
                        children: t.lv.ack
                    }, void 0, false, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded border border-rule px-2 py-0.5 text-xs font-semibold text-ink hover:border-accent",
                        onClick: ()=>voiceApi.say(a.speak, a.severity === "critical"),
                        children: t.lv.speak
                    }, void 0, false, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/AlertFeed.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/AlertFeed.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s1(AlertRow, "qXnXw0k/Lfvv+8MaNrTXLfW7jKw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c1 = AlertRow;
function AlertFeed() {
    _s2();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const alerts = [
        ...data?.alerts ?? []
    ].filter((a)=>a.state !== "resolved" && (filter === "all" || a.severity === filter)).sort((a, b)=>Number(a.state === "acked") - Number(b.state === "acked") || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_RANK"][b.severity] - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_RANK"][a.severity] || b.t_update - a.t_update);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-md border border-rule bg-paper/60 h-full flex flex-col min-h-[18rem] max-h-[27rem]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 px-3 py-2 border-b border-rule",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold text-ink mr-auto",
                        children: [
                            t.lv.alerts,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted font-normal tabular",
                                children: [
                                    "(",
                                    t.lv.alertsN((data?.alerts ?? []).filter((a)=>a.state === "open").length),
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/AlertFeed.tsx",
                                lineNumber: 72,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "group",
                        "aria-label": t.lv.alerts,
                        className: "inline-flex rounded border border-rule overflow-hidden",
                        children: [
                            "all",
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_ORDER"]
                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": filter === f,
                                onClick: ()=>setFilter(f),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-2 py-0.5 text-xs font-semibold", filter === f ? "bg-raised text-ink" : "text-muted hover:text-ink"),
                                children: f === "all" ? t.lv.all : t.lv.sev[f]
                            }, f, false, {
                                fileName: "[project]/components/live/AlertFeed.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/AlertFeed.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "flex-1 overflow-y-auto p-2 space-y-2",
                "aria-live": "polite",
                "aria-relevant": "additions",
                "aria-label": t.lv.alerts,
                children: [
                    alerts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "text-sm text-muted p-2",
                        children: t.lv.noAlerts
                    }, void 0, false, {
                        fileName: "[project]/components/live/AlertFeed.tsx",
                        lineNumber: 89,
                        columnNumber: 33
                    }, this),
                    alerts.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertRow, {
                            a: a,
                            compact: true
                        }, a.id, false, {
                            fileName: "[project]/components/live/AlertFeed.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/AlertFeed.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/AlertFeed.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s2(AlertFeed, "am5a0gDHb7lvDMNFTRHPgpdgi6I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c2 = AlertFeed;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SevChip");
__turbopack_context__.k.register(_c1, "AlertRow");
__turbopack_context__.k.register(_c2, "AlertFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/CommandBox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommandBox",
    ()=>CommandBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const TAB_IDS = [
    "plan",
    "dispatch",
    "sitrep",
    "models"
];
function CommandBox() {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { api } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { select, setTab, voiceApi } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reply, setReply] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [interim, setInterim] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [micOk, setMicOk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const recRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const runRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        "CommandBox.useRef[runRef]": ()=>undefined
    }["CommandBox.useRef[runRef]"]);
    const run = async (raw)=>{
        const q = raw.trim();
        if (!q) return;
        setBusy(true);
        try {
            const r = await api.command(q, lang);
            setReply({
                ok: r.ok,
                text: r.speak[lang]
            });
            voiceApi.say(r.speak);
            const ua = r.ui_action;
            if (ua.type === "select_ghat" && ua.value) select(ua.value);
            else if (ua.type === "open_tab" && ua.value && TAB_IDS.includes(ua.value)) {
                setTab(ua.value);
                document.getElementById("cc-tabs")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else if (ua.type === "control" && (ua.value === "start" || ua.value === "pause")) {
                if (api.kind === "http") api.control({
                    action: ua.value
                }).catch(()=>undefined);
            }
            setText("");
        } catch  {
            setReply({
                ok: false,
                text: t.lv.conn.offline
            });
        } finally{
            setBusy(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommandBox.useEffect": ()=>{
            runRef.current = ({
                "CommandBox.useEffect": (s)=>void run(s)
            })["CommandBox.useEffect"];
        }
    }["CommandBox.useEffect"]);
    // Mic push-to-talk (SHOULD): Chrome's webkitSpeechRecognition. Created only in effects/handlers.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommandBox.useEffect": ()=>{
            const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
            if (!Ctor) return;
            const rec = new Ctor();
            rec.continuous = false;
            rec.interimResults = true;
            rec.maxAlternatives = 1;
            rec.onresult = ({
                "CommandBox.useEffect": (ev)=>{
                    let fin = "";
                    let mid = "";
                    for(let i = ev.resultIndex; i < ev.results.length; i++){
                        const r = ev.results[i];
                        if (r.isFinal) fin += r[0].transcript;
                        else mid += r[0].transcript;
                    }
                    setInterim(mid);
                    if (fin) {
                        setText(fin);
                        setInterim("");
                        runRef.current(fin);
                    }
                }
            })["CommandBox.useEffect"];
            rec.onend = ({
                "CommandBox.useEffect": ()=>setListening(false)
            })["CommandBox.useEffect"];
            rec.onerror = ({
                "CommandBox.useEffect": ()=>setListening(false)
            })["CommandBox.useEffect"];
            recRef.current = rec;
            const id = setTimeout({
                "CommandBox.useEffect.id": ()=>setMicOk(true)
            }["CommandBox.useEffect.id"], 0);
            return ({
                "CommandBox.useEffect": ()=>{
                    clearTimeout(id);
                    rec.onresult = null;
                    rec.onend = null;
                    rec.onerror = null;
                    try {
                        rec.abort();
                    } catch  {
                    /* ignore */ }
                    recRef.current = null;
                }
            })["CommandBox.useEffect"];
        }
    }["CommandBox.useEffect"], []);
    const toggleMic = ()=>{
        const rec = recRef.current;
        if (!rec) return;
        if (listening) {
            rec.stop();
            return;
        }
        rec.lang = lang === "hi" ? "hi-IN" : "en-IN";
        try {
            rec.start();
            setListening(true);
            setInterim("");
        } catch  {
            setListening(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-2 min-w-0 w-full sm:w-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "flex items-center gap-1.5 min-w-0 flex-1 sm:flex-none",
                onSubmit: (e)=>{
                    e.preventDefault();
                    void run(text);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "cc-cmd",
                        className: "sr-only",
                        children: t.lv.cmdLabel
                    }, void 0, false, {
                        fileName: "[project]/components/live/CommandBox.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "cc-cmd",
                        value: listening && interim ? interim : text,
                        onChange: (e)=>setText(e.target.value),
                        placeholder: t.lv.cmdPlaceholder,
                        className: "w-full sm:w-72 min-w-0 rounded border border-rule bg-surface px-2.5 py-1 text-sm text-ink placeholder:text-muted",
                        autoComplete: "off"
                    }, void 0, false, {
                        fileName: "[project]/components/live/CommandBox.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: busy,
                        className: "rounded bg-accent text-paper px-3 py-1 text-sm font-semibold disabled:opacity-60",
                        children: t.lv.cmdRun
                    }, void 0, false, {
                        fileName: "[project]/components/live/CommandBox.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    micOk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: toggleMic,
                        "aria-pressed": listening,
                        title: t.lv.micHint,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded border px-2.5 py-1 text-sm font-semibold", listening ? "border-critical text-critical" : "border-rule bg-surface text-ink hover:border-accent"),
                        children: listening ? t.lv.micListening : t.lv.micStart
                    }, void 0, false, {
                        fileName: "[project]/components/live/CommandBox.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/CommandBox.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm min-w-0 max-w-[28rem] truncate",
                "aria-live": "polite",
                title: reply?.text,
                children: reply && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: reply.ok ? "text-ink" : "text-medium",
                    children: reply.text
                }, void 0, false, {
                    fileName: "[project]/components/live/CommandBox.tsx",
                    lineNumber: 146,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/live/CommandBox.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/CommandBox.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(CommandBox, "jcEUBrg/w/eUHB6Y0WXuGFVJjo0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c = CommandBox;
var _c;
__turbopack_context__.k.register(_c, "CommandBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommandCenter",
    ()=>CommandCenter,
    "useUi",
    ()=>useUi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/voice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/TopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$AlertBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/AlertBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$AlertFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/AlertFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$GhatTile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/GhatTile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$MapLive$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/MapLive.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/Tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/Drawer.tsx [app-client] (ecmascript)");
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
;
;
;
;
const TABS = [
    "plan",
    "dispatch",
    "sitrep",
    "models",
    "intake"
];
const Ui = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useUi() {
    _s();
    const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Ui);
    if (!c) throw new Error("useUi outside CommandCenter");
    return c;
}
_s(useUi, "rCFJOMMDYLWM7qBzTJAGkiO6eRA=");
// Tab state lives in the URL hash so tabs are linkable.
const hashListeners = new Set();
function subHash(cb) {
    hashListeners.add(cb);
    window.addEventListener("hashchange", cb);
    return ()=>{
        hashListeners.delete(cb);
        window.removeEventListener("hashchange", cb);
    };
}
function readHash() {
    const h = window.location.hash.replace("#", "");
    return TABS.includes(h) ? h : "plan";
}
function writeHash(t) {
    history.replaceState(null, "", `#${t}`);
    hashListeners.forEach((f)=>f());
}
const VOICE_INIT = {
    supported: false,
    enabled: false,
    muted: false,
    level: "high",
    voiceName: null,
    hindiMissing: false,
    speaking: false
};
function CommandCenter(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveProvider"], {
        ranking: props.initialRanking,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Shell, {
            ...props
        }, void 0, false, {
            fileName: "[project]/components/live/CommandCenter.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/CommandCenter.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_c = CommandCenter;
function Shell({ initialRanking, initialLb = null, initialAlloc = null }) {
    _s1();
    const { lang, t, setLang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { subscribeAlerts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const tab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subHash, readHash, {
        "Shell.useSyncExternalStore[tab]": ()=>"plan"
    }["Shell.useSyncExternalStore[tab]"]);
    const [voice, setVoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(VOICE_INIT);
    const voiceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Shell.useEffect": ()=>{
            const v = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoiceOut"]();
            voiceRef.current = v;
            const unsub = v.subscribe({
                "Shell.useEffect.unsub": ()=>setVoice(v.getState())
            }["Shell.useEffect.unsub"]);
            v.setLang(lang);
            const unAlerts = subscribeAlerts({
                "Shell.useEffect.unAlerts": (as)=>as.forEach({
                        "Shell.useEffect.unAlerts": (a)=>v.announce(a)
                    }["Shell.useEffect.unAlerts"])
            }["Shell.useEffect.unAlerts"]);
            return ({
                "Shell.useEffect": ()=>{
                    unAlerts();
                    unsub();
                    v.dispose();
                    voiceRef.current = null;
                }
            })["Shell.useEffect"];
        // lang is synced by the next effect; do not recreate the voice on language change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Shell.useEffect"], [
        subscribeAlerts
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Shell.useEffect": ()=>{
            voiceRef.current?.setLang(lang);
        }
    }["Shell.useEffect"], [
        lang
    ]);
    const confirm = t.lv.voiceConfirm;
    const voiceApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Shell.useMemo[voiceApi]": ()=>({
                enable: ({
                    "Shell.useMemo[voiceApi]": ()=>voiceRef.current?.enable(confirm)
                })["Shell.useMemo[voiceApi]"],
                say: ({
                    "Shell.useMemo[voiceApi]": (text, critical)=>voiceRef.current?.say(text, {
                            critical,
                            force: true
                        })
                })["Shell.useMemo[voiceApi]"],
                stop: ({
                    "Shell.useMemo[voiceApi]": ()=>voiceRef.current?.stop()
                })["Shell.useMemo[voiceApi]"],
                setMuted: ({
                    "Shell.useMemo[voiceApi]": (m)=>voiceRef.current?.setMuted(m)
                })["Shell.useMemo[voiceApi]"],
                setLevel: ({
                    "Shell.useMemo[voiceApi]": (l)=>voiceRef.current?.setLevel(l)
                })["Shell.useMemo[voiceApi]"]
            })
    }["Shell.useMemo[voiceApi]"], [
        confirm
    ]);
    const select = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Shell.useCallback[select]": (s)=>setSelected(s)
    }["Shell.useCallback[select]"], []);
    const setTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Shell.useCallback[setTab]": (x)=>writeHash(x)
    }["Shell.useCallback[setTab]"], []);
    // ?lang=hi|en and ?ghat=slug deep links (useful for demo links and headless checks).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Shell.useEffect": ()=>{
            const q = new URLSearchParams(window.location.search).get("lang");
            if (q === "hi" || q === "en") setLang(q);
            const g = new URLSearchParams(window.location.search).get("ghat");
            const id = g && /^[a-z-]+$/.test(g) ? setTimeout({
                "Shell.useEffect": ()=>setSelected(g)
            }["Shell.useEffect"], 0) : null;
            return ({
                "Shell.useEffect": ()=>{
                    if (id) clearTimeout(id);
                }
            })["Shell.useEffect"];
        }
    }["Shell.useEffect"], [
        setLang
    ]);
    // Esc closes the drawer.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Shell.useEffect": ()=>{
            const onKey = {
                "Shell.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") setSelected(null);
                }
            }["Shell.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "Shell.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["Shell.useEffect"];
        }
    }["Shell.useEffect"], []);
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Shell.useMemo[ctx]": ()=>({
                selected,
                select,
                tab,
                setTab,
                voice,
                voiceApi,
                ranking: initialRanking
            })
    }["Shell.useMemo[ctx]"], [
        selected,
        select,
        tab,
        setTab,
        voice,
        voiceApi,
        initialRanking
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ui.Provider, {
        value: ctx,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "cc-grid-bg min-h-screen flex flex-col text-[15px] leading-normal",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopBar"], {}, void 0, false, {
                    fileName: "[project]/components/live/CommandCenter.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-5 pb-10 space-y-4 pt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$AlertBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertBanner"], {}, void 0, false, {
                            fileName: "[project]/components/live/CommandCenter.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 lg:grid-cols-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "lg:col-span-7 min-w-0",
                                    "aria-label": t.lv.map,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$MapLive$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapLive"], {}, void 0, false, {
                                        fileName: "[project]/components/live/CommandCenter.tsx",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/live/CommandCenter.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "lg:col-span-5 min-w-0",
                                    "aria-label": t.lv.alerts,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$AlertFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertFeed"], {}, void 0, false, {
                                        fileName: "[project]/components/live/CommandCenter.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/live/CommandCenter.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/live/CommandCenter.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$GhatTile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhatStrip"], {}, void 0, false, {
                            fileName: "[project]/components/live/CommandCenter.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                            initialRanking: initialRanking,
                            initialLb: initialLb,
                            initialAlloc: initialAlloc
                        }, void 0, false, {
                            fileName: "[project]/components/live/CommandCenter.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/live/CommandCenter.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "border-t border-rule text-xs text-muted px-5 py-3",
                    children: [
                        t.lv.simNote,
                        " ",
                        t.footer
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/live/CommandCenter.tsx",
                    lineNumber: 162,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Drawer"], {}, void 0, false, {
                    fileName: "[project]/components/live/CommandCenter.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/live/CommandCenter.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/CommandCenter.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s1(Shell, "TF7wuyjgvwaH7rWCuLFcBYiza5k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c1 = Shell;
var _c, _c1;
__turbopack_context__.k.register(_c, "CommandCenter");
__turbopack_context__.k.register(_c1, "Shell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/Drawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Drawer",
    ()=>Drawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveFormat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$AlertFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/AlertFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$GhatTile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/GhatTile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/TopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/Tabs.tsx [app-client] (ecmascript)");
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
const SPAN = 120 * 60_000;
function MiniChart({ title, unit, pts, now, limit, limitMode, markers }) {
    const W = 460;
    const H = 96;
    const L = 30;
    const R = 6;
    const T = 8;
    const B = 18;
    const from = now - SPAN;
    const p = pts.filter((x)=>x[0] >= from);
    const vals = p.map((x)=>x[1]);
    const max = Math.max(limit !== null ? limit * 1.4 : 1, ...vals) * 1.05;
    const x = (tt)=>L + (tt - from) / SPAN * (W - L - R);
    const y = (v)=>T + (1 - v / max) * (H - T - B);
    const d = p.map((pt, i)=>`${i ? "L" : "M"}${x(pt[0]).toFixed(1)},${y(pt[1]).toFixed(1)}`).join("");
    const last = p.length ? p[p.length - 1][1] : null;
    const ticks = [
        0,
        30,
        60,
        90,
        120
    ].map((m)=>now - SPAN + m * 60_000);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        className: "mt-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                className: "flex justify-between text-xs text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-ink",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/live/Drawer.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tabular",
                        children: last !== null ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtNum"])(last)} ${unit}` : "—"
                    }, void 0, false, {
                        fileName: "[project]/components/live/Drawer.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Drawer.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: `0 0 ${W} ${H}`,
                className: "w-full h-auto",
                role: "img",
                "aria-label": `${title}: ${p.length} points${last !== null ? `, latest ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtNum"])(last)} ${unit}` : ""}`,
                children: [
                    [
                        0,
                        max / 2
                    ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: L,
                                    x2: W - R,
                                    y1: y(v),
                                    y2: y(v),
                                    stroke: "var(--rule)"
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Drawer.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: L - 4,
                                    y: y(v) + 3,
                                    fontSize: 9,
                                    textAnchor: "end",
                                    fill: "var(--muted)",
                                    children: v.toFixed(v < 10 ? 1 : 0)
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Drawer.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, v, true, {
                            fileName: "[project]/components/live/Drawer.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)),
                    ticks.map((tt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: x(tt),
                            y: H - 4,
                            fontSize: 9,
                            textAnchor: "middle",
                            fill: "var(--muted)",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtClock"])(tt)
                        }, tt, false, {
                            fileName: "[project]/components/live/Drawer.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)),
                    limit !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: L,
                                x2: W - R,
                                y1: y(limit),
                                y2: y(limit),
                                stroke: "var(--critical)",
                                strokeDasharray: "5 4"
                            }, void 0, false, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: W - R,
                                y: y(limit) - 3,
                                fontSize: 9,
                                textAnchor: "end",
                                fill: "var(--critical)",
                                children: [
                                    limitMode === "min" ? "≥" : "≤",
                                    " ",
                                    limit
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/Drawer.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    markers.filter((e)=>e.t >= from).map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: x(e.t),
                                    x2: x(e.t),
                                    y1: T,
                                    y2: H - B,
                                    stroke: "var(--accent)",
                                    strokeDasharray: "2 3"
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Drawer.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                                    children: e.text.en
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Drawer.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, e.id, true, {
                            fileName: "[project]/components/live/Drawer.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this)),
                    d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: d,
                        fill: "none",
                        stroke: "var(--ink)",
                        strokeWidth: 1.5,
                        strokeLinejoin: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/live/Drawer.tsx",
                        lineNumber: 70,
                        columnNumber: 15
                    }, this),
                    p.length > 0 && p.length < 4 && p.map((pt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: x(pt[0]),
                            cy: y(pt[1]),
                            r: 3,
                            fill: "var(--ink)"
                        }, pt[0], false, {
                            fileName: "[project]/components/live/Drawer.tsx",
                            lineNumber: 71,
                            columnNumber: 56
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Drawer.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/Drawer.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c = MiniChart;
const ROWS = [
    {
        p: "DO",
        label: "DO",
        unit: "mg/l",
        limit: "≥ 5",
        bad: (v)=>v < 5
    },
    {
        p: "BOD",
        label: "BOD",
        unit: "mg/l",
        limit: "≤ 3",
        bad: (v)=>v > 3
    },
    {
        p: "pH",
        label: "pH",
        unit: "",
        limit: "6.5–8.5",
        bad: (v)=>v < 6.5 || v > 8.5
    },
    {
        p: "turbidity",
        label: "Turbidity",
        unit: "NTU",
        limit: "—",
        bad: ()=>false
    },
    {
        p: "conductivity",
        label: "Conductivity",
        unit: "µS/cm",
        limit: "—",
        bad: ()=>false
    },
    {
        p: "COD",
        label: "COD",
        unit: "mg/l",
        limit: "—",
        bad: ()=>false
    }
];
function Drawer() {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { selected, select } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const { send, msg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const closeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const g = selected && data ? data.ghats[selected] : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Drawer.useEffect": ()=>{
            if (selected) closeRef.current?.focus();
        }
    }["Drawer.useEffect"], [
        selected
    ]);
    if (!g || !data) return null;
    const series = data.series[g.slug];
    const markers = data.events.filter((e)=>e.ghat === g.slug && (e.kind === "arrival" || e.kind === "effect"));
    const alerts = data.alerts.filter((a)=>a.ghat === g.slug && a.state !== "resolved");
    const res = data.resources.filter((r)=>r.target === g.slug || r.at === g.slug && r.status !== "idle");
    const kinds = [
        "aerator",
        "crew",
        "test_team",
        ...g.ngt_lake_ban ? [
            "diversion"
        ] : []
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "no-print fixed inset-0 z-40 flex justify-end",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "drawer-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": t.lv.close,
                className: "absolute inset-0 bg-black/50 cursor-default",
                onClick: ()=>select(null),
                tabIndex: -1
            }, void 0, false, {
                fileName: "[project]/components/live/Drawer.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "cc-drawer relative h-full w-full sm:w-[520px] bg-paper border-l border-rule overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 bg-paper border-b border-rule px-4 py-3 flex items-start gap-3 z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "drawer-title",
                                        className: "text-lg font-bold text-ink leading-snug",
                                        children: g.name[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$GhatTile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TierChip"], {
                                                tier: g.live_tier
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$GhatTile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SensorBadge"], {
                                                s: g.sensor
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimBadge"], {}, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted mt-1",
                                        children: g.tier_note[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: closeRef,
                                type: "button",
                                onClick: ()=>select(null),
                                className: "rounded border border-rule px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent",
                                children: t.lv.close
                            }, void 0, false, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/Drawer.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "label-caps mb-1",
                                        children: t.lv.values
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: ROWS.map((r)=>{
                                                const v = g.values[r.p];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b border-rule",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            scope: "row",
                                                            className: "text-left font-normal text-muted py-1",
                                                            children: r.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/live/Drawer.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-right tabular py-1 font-semibold", v === null ? "text-muted font-normal" : r.bad(v) ? "text-critical" : "text-ink"),
                                                            children: [
                                                                v === null ? r.p === "BOD" ? t.lv.awaitingLab : "—" : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtNum"])(v, r.p === "pH" ? 2 : 1)} ${r.unit}`,
                                                                v !== null && r.bad(v) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "sr-only",
                                                                    children: [
                                                                        " (",
                                                                        t.status.breach,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/live/Drawer.tsx",
                                                                    lineNumber: 136,
                                                                    columnNumber: 52
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/live/Drawer.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "text-right text-xs text-muted py-1 pl-3 whitespace-nowrap",
                                                            children: [
                                                                t.lv.limit,
                                                                " ",
                                                                r.limit
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/live/Drawer.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "text-right text-xs text-muted py-1 pl-3 tabular whitespace-nowrap",
                                                            children: g.as_of[r.p] ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtClock"])(g.as_of[r.p]) : ""
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/live/Drawer.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, r.p, true, {
                                                    fileName: "[project]/components/live/Drawer.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/live/Drawer.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted mt-1",
                                        children: [
                                            t.lv.lastSeen,
                                            ": ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tabular",
                                                children: g.last_seen ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtClock"])(g.last_seen) : t.lv.never
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 148,
                                                columnNumber: 32
                                            }, this),
                                            " · ",
                                            g.idols_per_h,
                                            " ",
                                            t.lv.idolsH,
                                            " · ",
                                            t.lv.total,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tabular",
                                                children: g.idols_total
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 148,
                                                columnNumber: 163
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "label-caps",
                                        children: t.lv.chart
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    g.sensor === "none" && !series?.DO.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-nodata border border-dashed border-nodata/60 rounded p-3 mt-2",
                                        children: t.lv.sensor.none
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniChart, {
                                                title: "DO",
                                                unit: "mg/l",
                                                pts: series?.DO ?? [],
                                                now: data.t,
                                                limit: 5,
                                                limitMode: "min",
                                                markers: markers
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 157,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniChart, {
                                                title: "BOD",
                                                unit: "mg/l",
                                                pts: series?.BOD ?? [],
                                                now: data.t,
                                                limit: 3,
                                                limitMode: "max",
                                                markers: markers
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniChart, {
                                                title: "Turbidity",
                                                unit: "NTU",
                                                pts: series?.turbidity ?? [],
                                                now: data.t,
                                                limit: null,
                                                limitMode: "max",
                                                markers: markers
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 159,
                                                columnNumber: 17
                                            }, this),
                                            markers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-accent",
                                                        children: "┊"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/live/Drawer.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 21
                                                    }, this),
                                                    " ",
                                                    t.lv.intervention
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 161,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "label-caps mb-2",
                                        children: t.lv.quick
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: kinds.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded bg-accent text-paper px-3 py-1.5 text-sm font-semibold",
                                                onClick: ()=>send(k, g.slug),
                                                children: t.lv.send(t.lv.kind[k])
                                            }, k, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("mt-2 text-sm", msg.ok ? "text-low" : "text-medium"),
                                        role: "status",
                                        children: msg.text
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this),
                                    res.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-2 text-sm text-muted",
                                        children: res.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    r.name[lang],
                                                    ": ",
                                                    t.lv.resStatus[r.status],
                                                    r.eta_min !== null ? `, ${t.lv.min(Math.round(r.eta_min))}` : ""
                                                ]
                                            }, r.id, true, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 185,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            alerts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "label-caps mb-2",
                                        children: t.lv.alerts
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: alerts.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$AlertFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertRow"], {
                                                a: a,
                                                compact: true
                                            }, a.id, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "text-sm space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: [
                                                    t.lv.pBreach,
                                                    ": "
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tabular font-semibold text-ink",
                                                children: g.p_breach !== null ? `${Math.round(g.p_breach * 100)}%` : "—"
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 206,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-muted",
                                                children: [
                                                    "(",
                                                    t.lv.pBreachNote,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: [
                                                    t.lv.initialSource,
                                                    ": "
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 210,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-ink",
                                                children: g.initial_source[lang]
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Drawer.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "flex flex-wrap gap-3 text-sm pb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/ghat/${g.slug}`,
                                        className: "text-link underline",
                                        children: t.lv.evidence
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 215,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/whatif",
                                        className: "text-link underline",
                                        children: t.lv.whatif
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Drawer.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/Drawer.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/Drawer.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Drawer.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/Drawer.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(Drawer, "9B9mHiyW6d42M5RwnA0oOGmKrOM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c1 = Drawer;
var _c, _c1;
__turbopack_context__.k.register(_c, "MiniChart");
__turbopack_context__.k.register(_c1, "Drawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/GhatTile.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GhatStrip",
    ()=>GhatStrip,
    "GhatTile",
    ()=>GhatTile,
    "SensorBadge",
    ()=>SensorBadge,
    "TierChip",
    ()=>TierChip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveFormat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/TopBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function TierChip({ tier, className }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex items-center gap-1 rounded px-1.5 py-px text-xs font-bold whitespace-nowrap", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_CHIP"][tier], className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_ICON"][tier]
            }, void 0, false, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            t.lv.tier[tier]
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/GhatTile.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(TierChip, "p2BMN842WmXaElEn1NQnTw7gg40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = TierChip;
function SensorBadge({ s }) {
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const icon = s === "live" ? "●" : s === "stale" ? "◐" : "○";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex items-center gap-1 text-xs whitespace-nowrap", s === "live" ? "text-low" : s === "stale" ? "text-medium" : "text-nodata"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: icon
            }, void 0, false, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            t.lv.sensor[s]
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/GhatTile.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s1(SensorBadge, "p2BMN842WmXaElEn1NQnTw7gg40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c1 = SensorBadge;
/** 60-min DO sparkline with the 5 mg/l line. */ function DoSpark({ pts, now }) {
    const W = 200;
    const H = 40;
    const from = now - 60 * 60_000;
    const p = pts.filter((x)=>x[0] >= from);
    const max = Math.max(8, ...p.map((x)=>x[1]));
    const x = (tt)=>(tt - from) / (60 * 60_000) * W;
    const y = (v)=>H - 2 - v / max * (H - 4);
    const d = p.map((pt, i)=>`${i ? "L" : "M"}${x(pt[0]).toFixed(1)},${y(pt[1]).toFixed(1)}`).join("");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${W} ${H}`,
        className: "w-full h-10",
        preserveAspectRatio: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 0,
                x2: W,
                y1: y(5),
                y2: y(5),
                stroke: "var(--critical)",
                strokeWidth: 1,
                strokeDasharray: "4 3",
                vectorEffect: "non-scaling-stroke"
            }, void 0, false, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: d,
                fill: "none",
                stroke: "var(--accent)",
                strokeWidth: 1.5,
                vectorEffect: "non-scaling-stroke",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/GhatTile.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c2 = DoSpark;
function Arrow({ slope }) {
    if (slope === null) return null;
    const a = slope <= -0.5 ? "↓" : slope >= 0.5 ? "↑" : "→";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-xl", slope <= -0.5 ? "text-critical" : slope >= 0.5 ? "text-low" : "text-muted"),
        "aria-hidden": true,
        children: a
    }, void 0, false, {
        fileName: "[project]/components/live/GhatTile.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c3 = Arrow;
function GhatTile({ g }) {
    _s2();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { select, selected, ranking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const other = lang === "en" ? "hi" : "en";
    const wb = ranking?.ghats.find((r)=>r.slug === g.slug)?.water_body_name?.[lang] ?? g.water_body;
    const DO = g.windows.DO?.mean_5 ?? g.values.DO;
    const slope = g.windows.DO?.slope_per_h ?? null;
    const noData = g.sensor !== "live" && g.live_tier === "no_data";
    const res = (data?.resources ?? []).filter((r)=>g.resources_on_site.includes(r.id));
    const openN = (data?.alerts ?? []).filter((a)=>a.ghat === g.slug && a.state === "open").length;
    const etaText = DO !== null && DO < 5 ? t.lv.etaBelow : g.eta.do_5 !== null && g.eta.do_5 <= 240 ? t.lv.eta(g.eta.do_5) : DO !== null ? t.lv.etaSteady : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>select(g.slug),
        "aria-pressed": selected === g.slug,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("group text-left w-full h-full rounded-md bg-surface p-3 flex flex-col gap-2 transition-colors hover:bg-raised", noData ? "border-2 border-dashed border-nodata/70" : "border border-rule", selected === g.slug && "!border-accent ring-1 ring-accent"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-ink leading-snug",
                                children: g.name[lang].split(" /")[0]
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                lang: other,
                                className: "text-xs text-muted leading-snug truncate",
                                children: g.name[other].split(" /")[0]
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimBadge"], {}, void 0, false, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-1.5 text-xs text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: wb
                    }, void 0, false, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    g.ngt_lake_ban && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded border border-rule px-1 text-muted",
                        children: t.lv.ngt
                    }, void 0, false, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 95,
                        columnNumber: 28
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SensorBadge, {
                            s: g.sensor
                        }, void 0, false, {
                            fileName: "[project]/components/live/GhatTile.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TierChip, {
                        tier: g.live_tier
                    }, void 0, false, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-xs mt-1 leading-snug", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_TEXT"][g.live_tier]),
                        children: g.tier_note[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "label-caps",
                                children: "DO"
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-[2.4rem] leading-none font-semibold tabular", DO === null ? "text-nodata" : DO < 5 ? "text-critical" : "text-ink"),
                                children: DO === null ? "—" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtNum"])(DO)
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pb-1 text-xs text-muted",
                        children: [
                            "mg/l",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Arrow, {
                                        slope: slope
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/GhatTile.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "tabular",
                                        children: slope !== null ? `${slope > 0 ? "+" : ""}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtNum"])(slope)}${t.lv.perH}` : ""
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/GhatTile.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            g.sensor !== "none" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DoSpark, {
                pts: data?.series[g.slug]?.DO ?? [],
                now: data?.t ?? 0
            }, void 0, false, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 120,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-10 flex items-center text-xs text-nodata border border-dashed border-nodata/50 rounded px-2",
                children: t.lv.sensor.none
            }, void 0, false, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 122,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "grid grid-cols-3 gap-1 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-3 flex justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-muted",
                                children: "BOD"
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tabular text-right", g.values.BOD === null ? "text-muted" : g.values.BOD > 3 ? "text-high font-semibold" : "text-ink"),
                                children: g.values.BOD === null ? t.lv.awaitingLab : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtNum"])(g.values.BOD)} mg/l`
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-muted",
                                children: "pH"
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "tabular text-ink",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtNum"])(g.values.pH, 2)
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-muted",
                                children: "NTU"
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "tabular text-ink",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtNum"])(g.values.turbidity)
                            }, void 0, false, {
                                fileName: "[project]/components/live/GhatTile.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            etaText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-xs", g.eta.do_5 !== null && g.eta.do_5 <= 240 || DO !== null && DO < 5 ? "text-high" : "text-muted"),
                children: etaText
            }, void 0, false, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 140,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto pt-1 border-t border-rule flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tabular",
                        children: [
                            g.idols_per_h,
                            " ",
                            t.lv.idolsH
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    res.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-accent",
                        children: [
                            res.map((r)=>t.lv.kind[r.kind]).join(", "),
                            " ",
                            t.lv.onSite
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this),
                    openN > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto rounded bg-raised px-1.5 text-ink tabular",
                        children: [
                            t.lv.alerts,
                            ": ",
                            openN
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/GhatTile.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/GhatTile.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s2(GhatTile, "oQk18O+3FZg+qNcTrcCHAVxulgU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c4 = GhatTile;
function GhatStrip() {
    _s3();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    if (!data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-64 rounded-md border border-rule bg-surface animate-pulse",
        "aria-busy": "true"
    }, void 0, false, {
        fileName: "[project]/components/live/GhatTile.tsx",
        lineNumber: 162,
        columnNumber: 21
    }, this);
    const gs = Object.values(data.ghats).sort((a, b)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_ORDER"].indexOf(a.live_tier) - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_ORDER"].indexOf(b.live_tier) || (a.windows.DO?.mean_5 ?? 99) - (b.windows.DO?.mean_5 ?? 99));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "grid gap-3 grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7",
        children: gs.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "min-w-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhatTile, {
                    g: g
                }, void 0, false, {
                    fileName: "[project]/components/live/GhatTile.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this)
            }, g.slug, false, {
                fileName: "[project]/components/live/GhatTile.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/live/GhatTile.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_s3(GhatStrip, "R8XL52iOiSXR6gP+Z4QrVgGJSvw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c5 = GhatStrip;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "TierChip");
__turbopack_context__.k.register(_c1, "SensorBadge");
__turbopack_context__.k.register(_c2, "DoSpark");
__turbopack_context__.k.register(_c3, "Arrow");
__turbopack_context__.k.register(_c4, "GhatTile");
__turbopack_context__.k.register(_c5, "GhatStrip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/MapLive.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapLive",
    ()=>MapLive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Map panel: real Leaflet map when online and the first tiles load; otherwise the schematic MapPanel.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intakeI18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveFormat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$MapPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/MapPanel.tsx [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const MapLeaflet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/live/MapLeaflet.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/live/MapLeaflet.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-[360px] sm:h-[440px] w-full grid place-items-center text-sm text-muted",
            children: "…"
        }, void 0, false, {
            fileName: "[project]/components/live/MapLive.tsx",
            lineNumber: 13,
            columnNumber: 18
        }, ("TURBOPACK compile-time value", void 0))
});
_c = MapLeaflet;
function subOnline(cb) {
    window.addEventListener("online", cb);
    window.addEventListener("offline", cb);
    return ()=>{
        window.removeEventListener("online", cb);
        window.removeEventListener("offline", cb);
    };
}
function MapLive() {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const x = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intakeI18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ix"][lang];
    const online = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subOnline, {
        "MapLive.useSyncExternalStore[online]": ()=>navigator.onLine
    }["MapLive.useSyncExternalStore[online]"], {
        "MapLive.useSyncExternalStore[online]": ()=>true
    }["MapLive.useSyncExternalStore[online]"]);
    const [failed, setFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const onFail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapLive.useCallback[onFail]": ()=>setFailed(true)
    }["MapLive.useCallback[onFail]"], []);
    if (!online || failed) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$MapPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapPanel"], {
        note: x.tilesDown
    }, void 0, false, {
        fileName: "[project]/components/live/MapLive.tsx",
        lineNumber: 32,
        columnNumber: 33
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-md border border-rule bg-paper/60 h-full flex flex-col overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 border-b border-rule",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold text-ink",
                        children: x.mapTitle
                    }, void 0, false, {
                        fileName: "[project]/components/live/MapLive.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted",
                        children: t.lv.approx
                    }, void 0, false, {
                        fileName: "[project]/components/live/MapLive.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "ml-auto flex flex-wrap gap-x-3 text-xs text-muted",
                        "aria-label": "Legend",
                        children: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_ORDER"].map((tr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": true,
                                            style: {
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_VAR"][tr]
                                            },
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_ICON"][tr]
                                        }, void 0, false, {
                                            fileName: "[project]/components/live/MapLive.tsx",
                                            lineNumber: 42,
                                            columnNumber: 15
                                        }, this),
                                        t.lv.tier[tr]
                                    ]
                                }, tr, true, {
                                    fileName: "[project]/components/live/MapLive.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "hidden md:flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": true,
                                        className: "inline-block w-3 h-3 rounded-full border border-dashed border-ink"
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/MapLive.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    x.ngtOutline
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/MapLive.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/MapLive.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/MapLive.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapLeaflet, {
                onTilesFailed: onFail
            }, void 0, false, {
                fileName: "[project]/components/live/MapLive.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/MapLive.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(MapLive, "6UPfE+ROu4OjLkzLIrust3t9rbI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c1 = MapLive;
var _c, _c1;
__turbopack_context__.k.register(_c, "MapLeaflet");
__turbopack_context__.k.register(_c1, "MapLive");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/MapPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPanel",
    ()=>MapPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ghatGeo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveFormat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const W = 640;
const H = 360;
const LON0 = 77.29;
const LON1 = 77.53;
const LAT0 = 23.165;
const LAT1 = 23.295;
const px = (p)=>({
        x: (p.lon - LON0) / (LON1 - LON0) * W,
        y: (LAT1 - p.lat) / (LAT1 - LAT0) * H
    });
// Label offsets (dx, dy, anchor) so neighbouring names do not collide.
const LABEL = {
    bairagarh: [
        14,
        -8,
        "start"
    ],
    prempura: [
        0,
        26,
        "middle"
    ],
    "rani-kamlapati": [
        -14,
        22,
        "end"
    ],
    khatlapura: [
        12,
        -24,
        "start"
    ],
    hathaikheda: [
        0,
        28,
        "middle"
    ],
    shahpura: [
        -14,
        4,
        "end"
    ],
    malikhedi: [
        14,
        4,
        "start"
    ]
};
function MapPanel({ note } = {}) {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { select, selected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const ghats = data ? Object.values(data.ghats) : [];
    const dp = px(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEPOT"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-md border border-rule bg-paper/60 h-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-3 py-2 border-b border-rule",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold text-ink",
                        children: t.lv.map
                    }, void 0, false, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted",
                        children: t.lv.approx
                    }, void 0, false, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-medium",
                        role: "status",
                        children: note
                    }, void 0, false, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "ml-auto hidden sm:flex flex-wrap gap-x-3 text-xs text-muted",
                        "aria-label": "Legend",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_ORDER"].map((tr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": true,
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_VAR"][tr]
                                        },
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_ICON"][tr]
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/MapPanel.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    t.lv.tier[tr]
                                ]
                            }, tr, true, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/MapPanel.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: `0 0 ${W} ${H}`,
                className: "w-full h-auto flex-1",
                role: "group",
                "aria-label": `${t.lv.map}. ${t.lv.approx}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                            id: "cc-vignette",
                            cx: "50%",
                            cy: "45%",
                            r: "70%",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "#15203a",
                                    stopOpacity: "0.55"
                                }, void 0, false, {
                                    fileName: "[project]/components/live/MapPanel.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "#0a0f1a",
                                    stopOpacity: "0"
                                }, void 0, false, {
                                    fileName: "[project]/components/live/MapPanel.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/live/MapPanel.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 0,
                        y: 0,
                        width: W,
                        height: H,
                        fill: "url(#cc-vignette)"
                    }, void 0, false, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        fill: "#16324a",
                        stroke: "#2c5677",
                        strokeWidth: 1,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M92,82 C118,50 196,56 238,92 C258,108 262,128 248,140 C224,152 204,168 178,174 C142,182 110,164 100,138 C92,120 86,100 92,82 Z"
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M262,118 C270,104 300,100 314,108 C322,114 316,124 302,126 C288,128 268,128 262,118 Z"
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M500,72 C508,58 548,56 566,66 C576,74 568,90 548,92 C526,94 504,86 500,72 Z"
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                cx: 396,
                                cy: 268,
                                rx: 20,
                                ry: 12
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: 556,
                                cy: 306,
                                r: 6
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        fontSize: 11,
                        fill: "#7f9bb5",
                        fontStyle: "italic",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: 150,
                                y: 112,
                                textAnchor: "middle",
                                children: lang === "hi" ? "बड़ा तालाब" : "Upper Lake"
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: 322,
                                y: 126,
                                textAnchor: "start",
                                children: lang === "hi" ? "छोटा तालाब" : "Lower Lake"
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: 535,
                                y: 52,
                                textAnchor: "middle",
                                children: lang === "hi" ? "हथाईखेड़ा जलाशय" : "Hathaikheda reservoir"
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: 420,
                                y: 296,
                                textAnchor: "middle",
                                children: lang === "hi" ? "शाहपुरा झील" : "Shahpura lake"
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: dp.x - 4,
                                y: dp.y - 4,
                                width: 8,
                                height: 8,
                                fill: "none",
                                stroke: "var(--muted)",
                                strokeWidth: 1.25
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: dp.x + 8,
                                y: dp.y + 16,
                                fontSize: 10,
                                fill: "var(--muted)",
                                children: t.lv.depot
                            }, void 0, false, {
                                fileName: "[project]/components/live/MapPanel.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/MapPanel.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    ghats.map((g)=>{
                        const geo = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_GEO"][g.slug];
                        if (!geo) return null;
                        const { x, y } = px(geo);
                        const col = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_VAR"][g.live_tier];
                        const alerting = (data?.alerts ?? []).some((a)=>a.ghat === g.slug && a.state === "open" && a.severity !== "info");
                        const [dx, dy, anchor] = LABEL[g.slug] ?? [
                            12,
                            4,
                            "start"
                        ];
                        const nd = g.live_tier === "no_data";
                        const sel = selected === g.slug;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            role: "button",
                            tabIndex: 0,
                            "aria-label": `${g.name[lang]}: ${t.lv.tier[g.live_tier]}`,
                            "aria-pressed": sel,
                            className: "cursor-pointer focus:outline-none [&:focus-visible>circle.ring]:stroke-[var(--accent)]",
                            onClick: ()=>select(g.slug),
                            onKeyDown: (e)=>{
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    select(g.slug);
                                }
                            },
                            children: [
                                alerting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    className: "cc-pulse",
                                    cx: x,
                                    cy: y,
                                    r: 9,
                                    fill: "none",
                                    stroke: col,
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/live/MapPanel.tsx",
                                    lineNumber: 109,
                                    columnNumber: 28
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    className: "ring",
                                    cx: x,
                                    cy: y,
                                    r: sel ? 14 : 12,
                                    fill: "transparent",
                                    stroke: sel ? "var(--accent)" : "transparent",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/live/MapPanel.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: x,
                                    cy: y,
                                    r: 8,
                                    fill: nd ? "var(--paper)" : col,
                                    stroke: nd ? col : "var(--paper)",
                                    strokeWidth: nd ? 2 : 1.5,
                                    strokeDasharray: nd ? "3 2" : undefined
                                }, void 0, false, {
                                    fileName: "[project]/components/live/MapPanel.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: x + dx,
                                    y: y + dy,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    fill: "var(--ink)",
                                    textAnchor: anchor,
                                    children: g.name[lang].split(" /")[0].replace(/ \(.*\)/, "").replace(/ (ghat|kund|lake ghat)$/i, "")
                                }, void 0, false, {
                                    fileName: "[project]/components/live/MapPanel.tsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: x + dx,
                                    y: y + dy + 13,
                                    fontSize: 10.5,
                                    fill: col,
                                    textAnchor: anchor,
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_ICON"][g.live_tier],
                                        " ",
                                        t.lv.tier[g.live_tier],
                                        g.values.DO !== null && g.sensor === "live" ? ` · DO ${g.values.DO.toFixed(1)}` : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/live/MapPanel.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, g.slug, true, {
                            fileName: "[project]/components/live/MapPanel.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/MapPanel.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/MapPanel.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(MapPanel, "rViZQeP4Ln/FCCEezGMMefcuPRk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c = MapPanel;
var _c;
__turbopack_context__.k.register(_c, "MapPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/Tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "useDispatch",
    ()=>useDispatch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveFormat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ActionSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ActionSheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModelsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ModelsView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$IntakePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/intake/IntakePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/TopBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
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
const TABS = [
    "plan",
    "dispatch",
    "sitrep",
    "models",
    "intake"
];
const small = "rounded border border-rule bg-surface px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent";
function useDispatch() {
    _s();
    const { api } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const send = async (kind, ghat)=>{
        try {
            const r = await api.dispatch({
                kind,
                ghat
            });
            if (r.ok && r.order) {
                const gname = data?.ghats[ghat]?.name[lang].split(" /")[0] ?? ghat;
                setMsg({
                    ok: true,
                    text: t.lv.dispatched(t.lv.kind[kind], gname, r.order.eta_min)
                });
            } else setMsg({
                ok: false,
                text: r.error?.[lang] ?? "—"
            });
        } catch  {
            setMsg({
                ok: false,
                text: t.lv.conn.offline
            });
        }
    };
    return {
        send,
        msg
    };
}
_s(useDispatch, "UwRFtBFBdXdjy7r0tvKbROeLSPg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
function DispatchTab() {
    _s1();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { select } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const { send, msg } = useDispatch();
    if (!data) return null;
    const gname = (s)=>s === null ? "" : s === "depot" ? t.lv.depot : data.ghats[s]?.name[lang].split(" /")[0] ?? s;
    const events = [
        ...data.events
    ].reverse().slice(0, 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-5 lg:grid-cols-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-ink mb-2",
                        children: t.lv.suggestions
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("mb-2 text-sm", msg.ok ? "text-low" : "text-medium"),
                        role: "status",
                        children: msg.text
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    data.suggestions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: t.lv.noSuggestions
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "space-y-2",
                        children: data.suggestions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "rounded border border-rule bg-surface p-3 flex gap-3 items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-ink",
                                                children: [
                                                    t.lv.kind[s.kind],
                                                    " → ",
                                                    gname(s.ghat)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/Tabs.tsx",
                                                lineNumber: 64,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted mt-0.5",
                                                children: s.reason[lang]
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Tabs.tsx",
                                                lineNumber: 67,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted tabular mt-1",
                                                children: [
                                                    t.lv.travel(Math.round(s.travel_min)),
                                                    " · ",
                                                    t.lv.gain,
                                                    " ",
                                                    s.q_gain.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/Tabs.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/Tabs.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded bg-accent text-paper px-3 py-1 text-sm font-semibold",
                                        onClick: ()=>send(s.kind, s.ghat),
                                        children: t.lv.apply
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Tabs.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, s.id, true, {
                                fileName: "[project]/components/live/Tabs.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-ink mt-5 mb-2",
                        children: t.lv.resources
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto rounded border border-rule",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-surface text-muted text-xs",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-2 py-1.5",
                                                children: t.lv.unit
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Tabs.tsx",
                                                lineNumber: 84,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-2 py-1.5",
                                                children: t.lv.status
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Tabs.tsx",
                                                lineNumber: 85,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-2 py-1.5",
                                                children: t.lv.location
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Tabs.tsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right px-2 py-1.5",
                                                children: t.lv.etaCol
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/Tabs.tsx",
                                                lineNumber: 87,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/Tabs.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Tabs.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: data.resources.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t border-rule",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1.5 text-ink",
                                                    children: r.name[lang]
                                                }, void 0, false, {
                                                    fileName: "[project]/components/live/Tabs.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-2 py-1.5", r.status === "idle" ? "text-muted" : r.status === "en_route" ? "text-medium" : "text-low"),
                                                    children: t.lv.resStatus[r.status]
                                                }, void 0, false, {
                                                    fileName: "[project]/components/live/Tabs.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1.5",
                                                    children: r.status === "en_route" && r.target ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "text-link hover:underline",
                                                        onClick: ()=>select(r.target),
                                                        children: [
                                                            "→ ",
                                                            gname(r.target)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/live/Tabs.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 23
                                                    }, this) : r.at !== "depot" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "text-link hover:underline",
                                                        onClick: ()=>select(r.at),
                                                        children: gname(r.at)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/live/Tabs.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: t.lv.depot
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/live/Tabs.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/live/Tabs.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1.5 text-right tabular text-ink",
                                                    children: r.eta_min !== null ? t.lv.min(Math.round(r.eta_min)) : "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/live/Tabs.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, r.id, true, {
                                            fileName: "[project]/components/live/Tabs.tsx",
                                            lineNumber: 92,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Tabs.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/live/Tabs.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-ink mb-2",
                        children: t.lv.actionLog
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: t.lv.noEvents
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "space-y-1 text-sm max-h-[32rem] overflow-y-auto pr-1",
                        children: events.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex gap-2 border-b border-rule py-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "tabular text-muted text-xs pt-0.5 w-11 shrink-0",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtClock"])(e.t)
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Tabs.tsx",
                                        lineNumber: 123,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs uppercase tracking-wide text-muted pt-0.5 w-16 shrink-0",
                                        children: e.kind
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Tabs.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-ink",
                                        children: e.text[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Tabs.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, e.id, true, {
                                fileName: "[project]/components/live/Tabs.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/Tabs.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s1(DispatchTab, "XmdnA102gTIx10PM91GtpscRXgE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"],
        useDispatch
    ];
});
_c = DispatchTab;
function SitrepTab() {
    _s2();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { sitrep, refreshSitrep } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { voiceApi } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SitrepTab.useEffect": ()=>{
            if (!sitrep) refreshSitrep();
        }
    }["SitrepTab.useEffect"], [
        sitrep,
        refreshSitrep
    ]);
    const print = ()=>{
        document.body.dataset.print = "sitrep";
        const done = ()=>{
            delete document.body.dataset.print;
            window.removeEventListener("afterprint", done);
        };
        window.addEventListener("afterprint", done);
        window.print();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 mb-3 no-print",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-ink mr-2",
                        children: t.lv.sitrepTitle
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimBadge"], {}, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted tabular",
                        children: sitrep ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtClock"])(sitrep.t) : ""
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: small,
                                disabled: !sitrep,
                                onClick: ()=>sitrep && voiceApi.say(sitrep.speak),
                                children: t.lv.speak
                            }, void 0, false, {
                                fileName: "[project]/components/live/Tabs.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: small,
                                disabled: !sitrep,
                                onClick: ()=>{
                                    if (!sitrep) return;
                                    navigator.clipboard?.writeText(sitrep.markdown[lang]).then(()=>{
                                        setCopied(true);
                                        setTimeout(()=>setCopied(false), 1500);
                                    }).catch(()=>undefined);
                                },
                                children: copied ? t.lv.copied : t.lv.copy
                            }, void 0, false, {
                                fileName: "[project]/components/live/Tabs.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: small,
                                onClick: print,
                                children: t.lv.print
                            }, void 0, false, {
                                fileName: "[project]/components/live/Tabs.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "memo rounded border border-rule bg-surface p-4 text-[0.95rem]",
                lang: lang,
                children: sitrep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                    children: sitrep.markdown[lang]
                }, void 0, false, {
                    fileName: "[project]/components/live/Tabs.tsx",
                    lineNumber: 185,
                    columnNumber: 19
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted",
                    children: t.loading
                }, void 0, false, {
                    fileName: "[project]/components/live/Tabs.tsx",
                    lineNumber: 185,
                    columnNumber: 76
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm no-print",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/brief",
                    className: "text-link",
                    children: t.lv.histBrief
                }, void 0, false, {
                    fileName: "[project]/components/live/Tabs.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/Tabs.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s2(SitrepTab, "6DLXqukOPmuCBwXU+JrXa1GALXQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c1 = SitrepTab;
const cell = (v)=>typeof v === "number" ? Number.isInteger(v) ? String(v) : v.toFixed(2) : v === null || v === undefined ? "—" : String(v);
/** Flatten one level of nesting: {observed:{DO:1}} -> {"observed DO":1}. */ function flatten(r) {
    const out = {};
    for (const [k, v] of Object.entries(r)){
        if (v && typeof v === "object" && !Array.isArray(v)) for (const [k2, v2] of Object.entries(v))out[`${k} ${k2}`] = typeof v2 === "object" ? JSON.stringify(v2) : v2;
        else out[k] = Array.isArray(v) ? v.join(", ") : v;
    }
    return out;
}
function CalibrationTable() {
    _s3();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { api } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const [cal, setCal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalibrationTable.useEffect": ()=>{
            let alive = true;
            api.calibration().then({
                "CalibrationTable.useEffect": (c)=>alive && setCal(c)
            }["CalibrationTable.useEffect"]).catch({
                "CalibrationTable.useEffect": ()=>alive && setCal({
                        available: false
                    })
            }["CalibrationTable.useEffect"]);
            return ({
                "CalibrationTable.useEffect": ()=>{
                    alive = false;
                }
            })["CalibrationTable.useEffect"];
        }
    }["CalibrationTable.useEffect"], [
        api
    ]);
    const c = cal;
    const available = c && c.available !== false;
    const rawRows = available ? Object.values(c).find((v)=>Array.isArray(v) && v.length && typeof v[0] === "object") ?? null : null;
    const rows = rawRows ? rawRows.map(flatten) : null;
    const notes = available ? Object.entries(c).filter(([k, v])=>k !== "available" && !Array.isArray(v) && v !== null && v !== undefined).map(([k, v])=>[
            k,
            typeof v === "object" ? Object.entries(flatten(v)).map(([a, b])=>`${a} ${cell(b)}`).join(", ") : v
        ]) : [];
    const cols = rows ? [
        ...new Set(rows.flatMap((r)=>Object.keys(r)))
    ] : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "max-w-4xl mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-bold text-ink mb-1",
                children: [
                    t.lv.calibration,
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimBadge"], {
                        className: "align-middle"
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 237,
                        columnNumber: 28
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            !available ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted",
                children: cal ? t.lv.calibNa : t.loading
            }, void 0, false, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 240,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    notes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-sm text-muted mb-2",
                        children: notes.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-ink",
                                        children: k
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Tabs.tsx",
                                        lineNumber: 247,
                                        columnNumber: 19
                                    }, this),
                                    ": ",
                                    cell(v)
                                ]
                            }, k, true, {
                                fileName: "[project]/components/live/Tabs.tsx",
                                lineNumber: 246,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 244,
                        columnNumber: 13
                    }, this),
                    rows ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto rounded border border-rule",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-surface text-xs text-muted",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: cols.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-1.5 text-left whitespace-nowrap",
                                                children: k
                                            }, k, false, {
                                                fileName: "[project]/components/live/Tabs.tsx",
                                                lineNumber: 258,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/Tabs.tsx",
                                        lineNumber: 256,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Tabs.tsx",
                                    lineNumber: 255,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: rows.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t border-rule",
                                            children: cols.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1.5 tabular text-ink whitespace-nowrap",
                                                    children: cell(r[k])
                                                }, k, false, {
                                                    fileName: "[project]/components/live/Tabs.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 25
                                                }, this))
                                        }, i, false, {
                                            fileName: "[project]/components/live/Tabs.tsx",
                                            lineNumber: 266,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Tabs.tsx",
                                    lineNumber: 264,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/live/Tabs.tsx",
                            lineNumber: 254,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 253,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "text-xs text-muted overflow-x-auto",
                        children: JSON.stringify(cal, null, 2)
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 278,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 242,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/Tabs.tsx",
        lineNumber: 235,
        columnNumber: 5
    }, this);
}
_s3(CalibrationTable, "snOXG2uhRHzlfPE9zZIsxlPtOL4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c2 = CalibrationTable;
function Tabs({ initialRanking, initialLb, initialAlloc }) {
    _s4();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { tab, setTab } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "cc-tabs",
        className: "rounded-md border border-rule bg-paper/70 scroll-mt-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "tablist",
                "aria-label": "Views",
                className: "no-print flex gap-1 overflow-x-auto border-b border-rule px-2",
                children: TABS.map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        role: "tab",
                        id: `tab-${x}`,
                        "aria-selected": tab === x,
                        "aria-controls": `panel-${x}`,
                        onClick: ()=>setTab(x),
                        onKeyDown: (e)=>{
                            const i = TABS.indexOf(x);
                            if (e.key === "ArrowRight") setTab(TABS[(i + 1) % TABS.length]);
                            if (e.key === "ArrowLeft") setTab(TABS[(i + TABS.length - 1) % TABS.length]);
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-4 py-2.5 text-sm whitespace-nowrap border-b-2 -mb-px", tab === x ? "border-accent text-ink font-semibold" : "border-transparent text-muted hover:text-ink"),
                        children: t.lv.tabs[x]
                    }, x, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 293,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "tabpanel",
                id: `panel-${tab}`,
                "aria-labelledby": `tab-${tab}`,
                className: "p-3 sm:p-5",
                children: [
                    tab === "plan" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ActionSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionSheet"], {
                            initial: initialRanking
                        }, void 0, false, {
                            fileName: "[project]/components/live/Tabs.tsx",
                            lineNumber: 317,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, this),
                    tab === "dispatch" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DispatchTab, {}, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 320,
                        columnNumber: 32
                    }, this),
                    tab === "intake" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$intake$2f$IntakePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntakePanel"], {
                            onOpenPlan: ()=>setTab("plan")
                        }, void 0, false, {
                            fileName: "[project]/components/live/Tabs.tsx",
                            lineNumber: 323,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this),
                    tab === "sitrep" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SitrepTab, {}, void 0, false, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 326,
                        columnNumber: 30
                    }, this),
                    tab === "models" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-3xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModelsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsView"], {
                                    initialLb: initialLb,
                                    initialAlloc: initialAlloc,
                                    ranking: initialRanking
                                }, void 0, false, {
                                    fileName: "[project]/components/live/Tabs.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/live/Tabs.tsx",
                                lineNumber: 329,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CalibrationTable, {}, void 0, false, {
                                fileName: "[project]/components/live/Tabs.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/Tabs.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/Tabs.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/Tabs.tsx",
        lineNumber: 290,
        columnNumber: 5
    }, this);
}
_s4(Tabs, "OB8+yuEQnlnUf6Tud+kJ2ahenaQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c3 = Tabs;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "DispatchTab");
__turbopack_context__.k.register(_c1, "SitrepTab");
__turbopack_context__.k.register(_c2, "CalibrationTable");
__turbopack_context__.k.register(_c3, "Tabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/TopBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SimBadge",
    ()=>SimBadge,
    "TopBar",
    ()=>TopBar,
    "btn",
    ()=>btn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lang.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveFormat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandCenter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/CommandBox.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const SPEEDS = [
    1,
    60,
    180,
    600
];
const btn = "rounded border border-rule bg-surface px-2.5 py-1 text-sm font-semibold text-ink hover:border-accent focus-visible:border-accent disabled:opacity-50";
function SimBadge({ className }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-block rounded-sm border border-medium px-1.5 py-px text-[0.65rem] font-bold tracking-[0.08em] text-medium whitespace-nowrap", className),
        title: t.lv.simNote,
        children: t.lv.simulated
    }, void 0, false, {
        fileName: "[project]/components/live/TopBar.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(SimBadge, "p2BMN842WmXaElEn1NQnTw7gg40=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = SimBadge;
function ConnPill() {
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { mode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const dot = mode === "ws" || mode === "poll" ? "bg-low" : mode === "mock" ? "bg-medium" : mode === "offline" ? "bg-critical" : "bg-nodata";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        title: t.lv.connHint[mode],
        role: "status",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-block size-2 rounded-full", dot)
            }, void 0, false, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            t.lv.conn[mode]
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/TopBar.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s1(ConnPill, "hhA6FXyTrMbUnm8tkAp2Ag2w/3c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c1 = ConnPill;
function AlertCounts() {
    _s2();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const open = (data?.alerts ?? []).filter((a)=>a.state !== "resolved");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1",
        "aria-label": t.lv.alerts,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_ORDER"].map((s)=>{
            const n = open.filter((a)=>a.severity === s).length;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold tabular", n ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_CHIP"][s] : "border border-rule text-muted"),
                title: t.lv.sev[s],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEV_ICON"][s]
                    }, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: t.lv.sev[s]
                    }, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, this),
                    n
                ]
            }, s, true, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 52,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/live/TopBar.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s2(AlertCounts, "T/J6WO4uiJUvNaslmHqZswCKXpI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c2 = AlertCounts;
function SimControls() {
    _s3();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data, api } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const [scenarios, setScenarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SimControls.useEffect": ()=>{
            let alive = true;
            api.scenarios().then({
                "SimControls.useEffect": (s)=>alive && setScenarios(s)
            }["SimControls.useEffect"]).catch({
                "SimControls.useEffect": ()=>undefined
            }["SimControls.useEffect"]);
            return ({
                "SimControls.useEffect": ()=>{
                    alive = false;
                }
            })["SimControls.useEffect"];
        }
    }["SimControls.useEffect"], [
        api
    ]);
    const running = data?.running ?? false;
    const ctl = (action, value)=>{
        api.control({
            action,
            value
        }).catch(()=>undefined);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(btn, "min-w-[4.5rem]"),
                onClick: ()=>ctl(running ? "pause" : "start"),
                "aria-pressed": running,
                disabled: !data,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: "mr-1",
                        children: running ? "❚❚" : "▶︎"
                    }, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    running ? t.lv.pause : t.lv.play
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "group",
                "aria-label": t.lv.speed,
                className: "inline-flex rounded border border-rule overflow-hidden",
                children: SPEEDS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>ctl("speed", s),
                        "aria-pressed": data?.speed === s,
                        disabled: !data,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-2 py-1 text-sm tabular font-semibold", data?.speed === s ? "bg-accent text-paper" : "bg-surface text-muted hover:text-ink"),
                        children: [
                            s,
                            "×"
                        ]
                    }, s, true, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "sr-only",
                htmlFor: "cc-scenario",
                children: t.lv.scenario
            }, void 0, false, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                id: "cc-scenario",
                className: "rounded border border-rule bg-surface px-2 py-1 text-sm text-ink max-w-[16rem]",
                value: data?.scenario.name ?? "",
                onChange: (e)=>ctl("scenario", e.target.value),
                disabled: !data,
                title: t.lv.scenario,
                children: [
                    !scenarios.some((s)=>s.name === data?.scenario.name) && data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: data.scenario.name,
                        children: data.scenario.label[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 112,
                        columnNumber: 76
                    }, this),
                    scenarios.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: s.name,
                            children: s.label[lang]
                        }, s.name, false, {
                            fileName: "[project]/components/live/TopBar.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: btn,
                onClick: ()=>ctl("reset"),
                disabled: !data,
                children: t.lv.reset
            }, void 0, false, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/TopBar.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s3(SimControls, "uR1KDirQyutKOx3VGLIx9O0tEbQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c3 = SimControls;
function VoiceControls() {
    _s4();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { voice, voiceApi } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    if (!voice.supported) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-xs text-muted",
        children: t.lv.noSpeech
    }, void 0, false, {
        fileName: "[project]/components/live/TopBar.tsx",
        lineNumber: 129,
        columnNumber: 32
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-1.5",
        children: [
            !voice.enabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(btn, "border-accent text-accent"),
                onClick: voiceApi.enable,
                children: t.lv.voiceEnable
            }, void 0, false, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: btn,
                onClick: ()=>voiceApi.setMuted(!voice.muted),
                "aria-pressed": voice.muted,
                children: voice.muted ? t.lv.unmute : t.lv.mute
            }, void 0, false, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this),
            voice.speaking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: btn,
                onClick: voiceApi.stop,
                children: t.lv.stopSpeak
            }, void 0, false, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-xs text-muted flex items-center gap-1",
                children: [
                    t.lv.announce,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "rounded border border-rule bg-surface px-1.5 py-1 text-sm text-ink",
                        value: voice.level,
                        onChange: (e)=>voiceApi.setLevel(e.target.value),
                        children: [
                            "all",
                            "high",
                            "critical",
                            "off"
                        ].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: l,
                                children: t.lv.level[l]
                            }, l, false, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-muted max-w-[16rem] truncate",
                title: voice.voiceName ?? t.lv.noVoice,
                children: [
                    voice.hindiMissing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-medium",
                        children: t.lv.hindiMissing
                    }, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 157,
                        columnNumber: 31
                    }, this) : null,
                    voice.hindiMissing ? " · " : "",
                    voice.voiceName ?? (voice.enabled ? t.lv.noVoice : "")
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/TopBar.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s4(VoiceControls, "GTtRf+tEKPpYJ6fhmKEguBCC1JU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c4 = VoiceControls;
function LangButton() {
    _s5();
    const { lang, t, setLang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>setLang(lang === "en" ? "hi" : "en"),
        className: btn,
        "aria-label": t.langSwitch,
        title: t.langSwitch,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            lang: lang === "en" ? "hi" : "en",
            children: t.langName
        }, void 0, false, {
            fileName: "[project]/components/live/TopBar.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/TopBar.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s5(LangButton, "KD40t10E8AUw3EZAGUjJEWHi0M4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c5 = LangButton;
function TopBar() {
    _s6();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "no-print sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1600px] mx-auto px-3 sm:px-5 py-2 flex flex-wrap items-center gap-x-5 gap-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mr-auto min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-lg font-bold leading-tight text-ink",
                                        children: t.lv.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/TopBar.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SimBadge, {}, void 0, false, {
                                        fileName: "[project]/components/live/TopBar.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted leading-tight",
                                children: t.lv.sub
                            }, void 0, false, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right",
                        "aria-live": "off",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[2rem] leading-none font-semibold tabular text-ink",
                                "aria-label": t.lv.simClock,
                                children: data ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtClock"])(data.t) : "--:--"
                            }, void 0, false, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[0.65rem] text-muted",
                                children: t.lv.simClock
                            }, void 0, false, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SimControls, {}, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConnPill, {}, void 0, false, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertCounts, {}, void 0, false, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1600px] mx-auto px-3 sm:px-5 pb-2 flex flex-wrap items-center gap-x-4 gap-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandBox"], {}, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VoiceControls, {}, void 0, false, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/brief",
                                className: "text-sm text-link",
                                children: t.openBrief
                            }, void 0, false, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LangButton, {}, void 0, false, {
                                fileName: "[project]/components/live/TopBar.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/TopBar.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/TopBar.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/TopBar.tsx",
        lineNumber: 178,
        columnNumber: 5
    }, this);
}
_s6(TopBar, "T/J6WO4uiJUvNaslmHqZswCKXpI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c6 = TopBar;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "SimBadge");
__turbopack_context__.k.register(_c1, "ConnPill");
__turbopack_context__.k.register(_c2, "AlertCounts");
__turbopack_context__.k.register(_c3, "SimControls");
__turbopack_context__.k.register(_c4, "VoiceControls");
__turbopack_context__.k.register(_c5, "LangButton");
__turbopack_context__.k.register(_c6, "TopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actionlog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "downloadCsv",
    ()=>downloadCsv,
    "toggleDone",
    ()=>toggleDone,
    "useActionLog",
    ()=>useActionLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const KEY = "ghatwatch.actionlog";
const listeners = new Set();
let cache = null;
let parsed = [];
const EMPTY = [];
function snapshot() {
    let raw = null;
    try {
        raw = localStorage.getItem(KEY);
    } catch  {
        raw = null;
    }
    if (raw !== cache) {
        cache = raw;
        try {
            parsed = raw ? JSON.parse(raw) : [];
        } catch  {
            parsed = [];
        }
    }
    return parsed;
}
function subscribe(cb) {
    listeners.add(cb);
    return ()=>listeners.delete(cb);
}
function save(entries) {
    try {
        localStorage.setItem(KEY, JSON.stringify(entries));
    } catch  {
    /* ignore */ }
    listeners.forEach((f)=>f());
}
function useActionLog() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, snapshot, {
        "useActionLog.useSyncExternalStore": ()=>EMPTY
    }["useActionLog.useSyncExternalStore"]);
}
_s(useActionLog, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
function toggleDone(ghat, action) {
    const cur = snapshot();
    const exists = cur.some((e)=>e.ghat === ghat && e.action === action);
    save(exists ? cur.filter((e)=>!(e.ghat === ghat && e.action === action)) : [
        ...cur,
        {
            date: new Date().toISOString().slice(0, 10),
            ghat,
            action
        }
    ]);
}
function downloadCsv(entries) {
    const esc = (s)=>`"${s.replace(/"/g, '""')}"`;
    const lines = [
        "date,ghat,action,done_by",
        ...entries.map((e)=>[
                e.date,
                e.ghat,
                e.action,
                ""
            ].map(esc).join(","))
    ];
    const blob = new Blob([
        "﻿" + lines.join("\r\n")
    ], {
        type: "text/csv;charset=utf-8"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ghatwatch-action-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_URL",
    ()=>API_URL,
    "fetchAllocation",
    ()=>fetchAllocation,
    "fetchBrief",
    ()=>fetchBrief,
    "fetchGaps",
    ()=>fetchGaps,
    "fetchGhat",
    ()=>fetchGhat,
    "fetchLeaderboard",
    ()=>fetchLeaderboard,
    "fetchRanking",
    ()=>fetchRanking,
    "pdfHref",
    ()=>pdfHref,
    "pingApi",
    ()=>pingApi,
    "postWhatIf",
    ()=>postWhatIf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_URL = (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");
async function getJson(url, timeoutMs = 2500, init) {
    const ctrl = new AbortController();
    const timer = setTimeout(()=>ctrl.abort(), timeoutMs);
    try {
        const res = await fetch(url, {
            ...init,
            signal: ctrl.signal,
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`${res.status} ${url}`);
        return await res.json();
    } finally{
        clearTimeout(timer);
    }
}
/** Try the live API, fall back to the static snapshot in /public/data. */ async function liveOrStatic(apiPath, staticPath) {
    try {
        return {
            data: await getJson(`${API_URL}${apiPath}`),
            source: "live"
        };
    } catch  {
        return {
            data: await getJson(staticPath, 10000),
            source: "static"
        };
    }
}
const fetchRanking = ()=>liveOrStatic("/api/ranking", "/data/ranking.json");
const fetchGhat = (slug)=>liveOrStatic(`/api/ghats/${encodeURIComponent(slug)}`, `/data/ghats/${encodeURIComponent(slug)}.json`);
const fetchGaps = ()=>liveOrStatic("/api/gaps", "/data/gaps.json");
const fetchBrief = ()=>liveOrStatic("/api/brief", "/data/brief.json");
const fetchLeaderboard = ()=>liveOrStatic("/api/models/leaderboard", "/data/leaderboard.json");
const fetchAllocation = (budget)=>liveOrStatic(budget === undefined ? "/api/allocate" : `/api/allocate?budget=${budget}`, "/data/allocate.json");
function postWhatIf(body) {
    return getJson(`${API_URL}/api/whatif`, 5000, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}
async function pingApi() {
    try {
        await getJson(`${API_URL}/api/health`, 1500);
        return true;
    } catch  {
        return false;
    }
}
const pdfHref = (pdf, page)=>`${API_URL}/pdf/${pdf}.pdf#page=${page}`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/ghatGeo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Approximate ghat coordinates. Orientation only; always label as "positions approximate".
// Started from docs/PLAN-LIVE.md §6; refined 11 Oct 2026 (≈ 10 min web search, OSM Nominatim/Overpass).
// Per point: source and confidence. None of these is a surveyed ghat position.
__turbopack_context__.s([
    "DEPOT",
    ()=>DEPOT,
    "GHAT_GEO",
    ()=>GHAT_GEO,
    "GHAT_ORDER",
    ()=>GHAT_ORDER,
    "haversineKm",
    ()=>haversineKm,
    "travelMin",
    ()=>travelMin
]);
const GHAT_GEO = {
    // kept (PLAN-LIVE §6). No kund mapped in OSM; point lies inside Bairagarh near Sant Hirdaram Nagar
    // station (OSM 23.2737, 77.3358). Confidence: medium.
    bairagarh: {
        lat: 23.271,
        lon: 77.337
    },
    // OSM way 922790998 "prempura ghat" (Upper Lake south shore); was ~2 km north. Confidence: high.
    prempura: {
        lat: 23.2176,
        lon: 77.3753
    },
    // Upper Lake shore nearest OSM "Rani Kamlawati Park" (way 399629364) / Rani Kamlapati Mahal
    // (way 1002690457); no Kamla Park kund mapped. Small shift. Confidence: medium.
    "rani-kamlapati": {
        lat: 23.2517,
        lon: 77.3969
    },
    // Khatlapura Mandir, Lower Lake bank (wanderlog.com/place/details/4400503, Google-derived);
    // was ~1 km north and inland. Confidence: medium-high.
    khatlapura: {
        lat: 23.25,
        lon: 77.4109
    },
    // OSM way 28826931 "Hataikheda Dam", shoreline point nearest the old value; ghat spot unconfirmed.
    // Confidence: medium-low.
    hathaikheda: {
        lat: 23.2677,
        lon: 77.4892
    },
    // OSM way 28672561 "Shahpura Lake", east shore; old value was 1.5 km east of the lake.
    // Exact ghat unknown. Confidence: medium-low.
    shahpura: {
        lat: 23.2034,
        lon: 77.4251
    },
    // OSM place=village node 11358718540 "Mali Khedi" (west Bhopal, Huzur); BMC lists Malikhedi with
    // Bairagarh as a west-side site (Hitavada 26 Feb 2026). Old value (east, 77.497) was likely wrong.
    // Village point is a proxy only. Confidence: low.
    malikhedi: {
        lat: 23.2063,
        lon: 77.3039
    }
};
const DEPOT = {
    lat: 23.252,
    lon: 77.402
};
const GHAT_ORDER = [
    "bairagarh",
    "malikhedi",
    "shahpura",
    "rani-kamlapati",
    "hathaikheda",
    "khatlapura",
    "prempura"
];
function haversineKm(a, b) {
    const R = 6371;
    const toRad = (d)=>d * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}
function travelMin(from, to) {
    const a = from === "depot" ? DEPOT : GHAT_GEO[from] ?? DEPOT;
    const b = to === "depot" ? DEPOT : GHAT_GEO[to] ?? DEPOT;
    return Math.round(haversineKm(a, b) / 25 * 60 + 10);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dict",
    ()=>dict,
    "paramName",
    ()=>paramName,
    "seriesLabel",
    ()=>seriesLabel
]);
const en = {
    appName: "Ghat Watch",
    appSub: "Bhopal immersion ghats, water-quality risk",
    title: "Durga visarjan action sheet",
    today: "Today",
    daysLeft: (n)=>n > 0 ? `Durga visarjan 20 Oct 2026 · ${n} days left` : n === 0 ? "Durga visarjan is today, 20 Oct 2026" : "Durga visarjan 20 Oct 2026 has passed",
    standardLine: "CPCB class B (outdoor bathing): DO ≥ 5, BOD ≤ 3, pH 6.5–8.5",
    summaryDo: (b, n, z)=>`${b} of ${n} dissolved-oxygen readings were below 5 mg/l (${z} were zero).`,
    summaryBod: (b, n)=>`${b} of ${n} BOD readings were above 3 mg/l. MPPCB reports 2023–25, 7 ghats.`,
    openBrief: "Open brief",
    enterReadings: "Enter 2026 readings",
    evidence: "Evidence",
    models: "Models",
    sheet: "Risk list",
    live: "Live API",
    static: "Static snapshot",
    liveHint: "Data from the Ghat Watch API",
    staticHint: "API not reachable. Showing the saved snapshot built from the same reports.",
    langName: "हिन्दी",
    langSwitch: "हिन्दी में देखें",
    rank: "Rank",
    ngtBan: "NGT lake ban",
    ngtBanNote: "NGT bars immersion in Upper and Lower Lake. Route idols to designated kunds.",
    siteMedium: "Site uncertain",
    siteMediumNote: "May be two places: Ganesh tables name Kamla Park kund, Durga tables name the Lower Lake ghat.",
    whyTier: "Why this tier",
    score: "Risk score",
    partialScore: "on partial data",
    breachRate: "readings over limit",
    coverage: "data coverage",
    readingsOf: (a, e)=>`${a} of ${e} expected readings`,
    trend: {
        worsening: "Worsening",
        stable: "Stable",
        improving: "Improving"
    },
    tier: {
        insufficient_data: "No recent data",
        high: "High risk",
        medium: "Medium risk",
        low: "Low risk"
    },
    actions: "Actions",
    action: {
        aerate: "Aerate",
        clean: "Clean",
        test_first: "Test first",
        sample_metals: "Sample metals",
        lake_ban: "Lake ban"
    },
    markDone: "Mark done",
    done: "Done",
    downloadLog: "Download action log (CSV)",
    logNote: "Marking actions done builds a log of what was done where. Next year this becomes training data for the model.",
    page: (p)=>`p. ${p}`,
    pdfTitle: (r, p)=>`Open ${r} report at page ${p} (new tab)`,
    context: "Context",
    dataGap: "Data gap",
    noLimit: "no CPCB bathing limit",
    back: "Back to risk list",
    readings: "Readings",
    readingsNote: "Rows are festival, year and phase. Blank cells are shown as not sampled, never as zero.",
    limitRow: "Class B limit",
    notSampled: "not sampled",
    bdl: "BDL",
    bdlLong: "below detection limit",
    noTable: "No table in the report: not tested",
    status: {
        breach: "Over limit",
        ok: "Within limit",
        no_limit: "No bathing limit",
        missing: "Not sampled"
    },
    legend: "Legend",
    phase: {
        pre: "pre",
        during: "during",
        after: "after"
    },
    phaseLong: {
        pre: "before immersion",
        during: "during immersion",
        after: "after immersion"
    },
    festival: {
        Ganesh: "Ganesh",
        Durga: "Durga"
    },
    param: {},
    doTrend: "Dissolved oxygen across festivals (mg/l)",
    bodTrend: "BOD across festivals (mg/l)",
    limitLabel: (v)=>`limit ${v}`,
    breachMarked: "Filled red points are over the limit. Gaps in the line are tests that were not done.",
    forecast: "Durga 2026 outlook",
    forecastUnavailable: "Model forecast is not available right now. The ranking above does not depend on it.",
    pBreach: "Chance of breaching class B",
    champion: "Model used",
    agreement: "Model agreement",
    basis: (y, f, ph)=>`Based on ${f} ${y} ${ph}-immersion readings`,
    topReasons: "Why the model says this",
    caveat: "Model estimate from 544 MP site-festival records (2023–25). Not a measurement.",
    gaps: "Data gaps",
    noGaps: "No gaps recorded for this ghat.",
    briefTitle: "Brief to forward",
    briefNote: "One page per language. Every number carries its report page.",
    english: "English",
    hindi: "हिन्दी",
    both: "Both",
    copy: "Copy text",
    copied: "Copied",
    print: "Print / Save as PDF",
    download: "Download .md",
    whatifTitle: "Enter 2026 pre-immersion readings",
    whatifNote: "Values are treated as Durga 2026 pre-immersion readings with full weight. Leave a field blank if it was not measured.",
    ghat: "Ghat",
    newGhat: "New ghat (2026 data only)",
    newName: "Ghat name",
    newWater: "Water body",
    calculate: "Recalculate",
    working: "Calculating…",
    current: "Current (2023–25)",
    with2026: "With 2026 readings",
    only2026: "2026 data only",
    tierLabel: "Tier",
    forecastOff: "Forecast unavailable (API offline). Score computed in the browser with the same rules.",
    movedUp: (a, b)=>`Score rose from ${a} to ${b}.`,
    movedDown: (a, b)=>`Score fell from ${a} to ${b}.`,
    movedNone: (a)=>`Score unchanged at ${a}.`,
    drivenBy: (p)=>`Biggest driver: ${p}.`,
    noInput: "Enter at least one reading.",
    modelsTitle: "Models behind the outlook",
    experimental: "experimental",
    leaderboard: "Leaderboard",
    trainedOn: (n)=>`Trained on ${n} MP site-festival records (2023–25). Validated by site groups and on 2025 alone.`,
    colModel: "Model",
    colAuc: "AUC (site groups)",
    colAucT: "AUC (2025 hold-out)",
    colPr: "PR-AUC",
    colBrier: "Brier",
    colLog: "Log-loss",
    colF1: "F1",
    championRule: "Champion rule",
    importances: "What the champion relies on",
    cql: "Budget split suggestion (CQL)",
    policyValues: "Policy value in the simulator (higher is better)",
    policy: {
        cql: "CQL policy",
        heuristic: "Rule of thumb",
        random: "Random",
        do_nothing: "Do nothing"
    },
    budget: "Budget (units)",
    update: "Update",
    plan: "Suggested plan",
    cost: "cost",
    gain: "gain",
    loading: "Loading…",
    loadError: "Could not load data from the API or the snapshot.",
    generated: "Generated",
    footer: "Readings are reported against CPCB limits. No health effects are claimed. Source: MPPCB idol immersion reports 2023, 2024, 2025.",
    lv: {
        title: "Ghat Watch Live",
        sub: "LIVE · 20 Oct 2026 · Durga visarjan",
        simulated: "SIMULATED",
        simNote: "Simulated readings for rehearsal. Not field measurements.",
        simClock: "Sim time (IST)",
        play: "Run",
        pause: "Pause",
        reset: "Reset",
        speed: "Speed",
        scenario: "Scenario",
        conn: {
            connecting: "Connecting…",
            ws: "Live (WebSocket)",
            poll: "Live (polling)",
            mock: "Demo generator",
            offline: "Offline"
        },
        connHint: {
            connecting: "Looking for the live server",
            ws: "Streaming from the live server",
            poll: "WebSocket unavailable; polling the server every 2 s",
            mock: "Server not reachable; the browser is generating demo data",
            offline: "No data source"
        },
        sev: {
            critical: "Critical",
            high: "High",
            warn: "Warn",
            info: "Info"
        },
        tier: {
            critical: "Critical",
            high: "High",
            medium: "Medium",
            low: "Low",
            no_data: "No live data"
        },
        sensor: {
            live: "live",
            stale: "stale",
            none: "no live data"
        },
        awaitingLab: "awaiting lab (≈ 90 min)",
        eta: (m)=>`DO < 5 in ~${m} min`,
        etaSteady: "DO trend steady",
        etaBelow: "DO already below 5",
        perH: "/h",
        idolsH: "idols/h",
        onSite: "on site",
        alertsN: (n)=>`${n} open`,
        alerts: "Alerts",
        all: "All",
        ack: "Ack",
        acked: "Acknowledged",
        speak: "Speak",
        stopSpeak: "Stop",
        noAlerts: "No open alerts at this severity.",
        baseline: "before immersion",
        newest: "Newest alert",
        tabs: {
            plan: "Plan",
            dispatch: "Dispatch",
            sitrep: "Sitrep",
            models: "Models",
            intake: "Intake"
        },
        resources: "Resources",
        unit: "Unit",
        status: "Status",
        location: "Location",
        etaCol: "ETA",
        resStatus: {
            idle: "idle",
            en_route: "en route",
            working: "working"
        },
        kind: {
            aerator: "Aerator",
            crew: "Cleaning crew",
            test_team: "Test team",
            diversion: "Diversion squad"
        },
        depot: "Depot",
        min: (n)=>`${n} min`,
        suggestions: "Suggested moves",
        apply: "Apply",
        travel: (n)=>`travel ${n} min`,
        gain: "gain",
        noSuggestions: "No moves suggested right now.",
        actionLog: "Action log",
        noEvents: "Nothing logged yet.",
        sitrepTitle: "Live situation report",
        print: "Print",
        copy: "Copy",
        copied: "Copied",
        histBrief: "Historical brief (2023–25 reports)",
        calibration: "Simulator calibration",
        calibNa: "Calibration table not available yet.",
        close: "Close",
        values: "Current values",
        limit: "limit",
        chart: "Last 120 sim-min",
        pBreach: "Chance of breach, Durga 2026",
        pBreachNote: "pre-immersion model estimate, not updated live",
        initialSource: "Starting values",
        quick: "Quick actions",
        send: (k)=>`Send ${k.toLowerCase()}`,
        evidence: "Evidence with report pages",
        whatif: "Enter readings (what-if)",
        lastSeen: "Last reading",
        never: "never",
        intervention: "intervention",
        voiceEnable: "Enable voice",
        voiceOn: "Voice on",
        voiceConfirm: {
            en: "Voice alerts are on.",
            hi: "आवाज़ अलर्ट चालू हैं।"
        },
        mute: "Mute",
        unmute: "Unmute",
        announce: "Announce",
        level: {
            all: "All",
            high: "High+",
            critical: "Critical",
            off: "Off"
        },
        hindiMissing: "Hindi voice not installed",
        noVoice: "No speech voice found",
        noSpeech: "Speech not supported in this browser",
        cmdPlaceholder: "Command, e.g. status Shahpura",
        cmdRun: "Run",
        cmdLabel: "Command",
        micStart: "Talk",
        micListening: "Listening…",
        micHint: "Needs Chrome, network and microphone permission",
        map: "Map (schematic)",
        approx: "Positions approximate",
        dispatched: (k, g, m)=>`${k} sent to ${g}, ETA ${m} min.`,
        nav: "Live command center",
        ngt: "NGT ban",
        total: "Idols so far",
        readings: "readings"
    }
};
const hi = {
    appName: "घाट वॉच",
    appSub: "भोपाल विसर्जन घाट, जल-गुणवत्ता जोखिम",
    title: "दुर्गा विसर्जन कार्य-पत्रक",
    today: "आज",
    daysLeft: (n)=>n > 0 ? `दुर्गा विसर्जन 20 अक्टूबर 2026 · ${n} दिन शेष` : n === 0 ? "दुर्गा विसर्जन आज, 20 अक्टूबर 2026" : "दुर्गा विसर्जन 20 अक्टूबर 2026 हो चुका",
    standardLine: "CPCB श्रेणी B (खुले में स्नान): DO ≥ 5, BOD ≤ 3, pH 6.5–8.5",
    summaryDo: (b, n, z)=>`घुलित ऑक्सीजन के ${n} में से ${b} माप 5 mg/l से कम थे (${z} शून्य)।`,
    summaryBod: (b, n)=>`बीओडी के ${n} में से ${b} माप 3 mg/l से अधिक थे। MPPCB रिपोर्ट 2023–25, 7 घाट।`,
    openBrief: "सार खोलें",
    enterReadings: "2026 के आंकड़े दर्ज करें",
    evidence: "साक्ष्य",
    models: "मॉडल",
    sheet: "जोखिम सूची",
    live: "लाइव API",
    static: "सहेजा गया डेटा",
    liveHint: "घाट वॉच API से डेटा",
    staticHint: "API उपलब्ध नहीं। इन्हीं रिपोर्टों से बना सहेजा गया डेटा दिखाया जा रहा है।",
    langName: "English",
    langSwitch: "View in English",
    rank: "क्रम",
    ngtBan: "NGT झील रोक",
    ngtBanNote: "NGT ने बड़ी और छोटी झील में विसर्जन रोका है। मूर्तियाँ निर्धारित कुंडों में भेजें।",
    siteMedium: "स्थल अनिश्चित",
    siteMediumNote: "दो अलग स्थान हो सकते हैं: गणेश तालिकाओं में कमला पार्क कुंड, दुर्गा तालिकाओं में छोटी झील घाट।",
    whyTier: "यह श्रेणी क्यों",
    score: "जोखिम स्कोर",
    partialScore: "आंशिक आंकड़ों पर",
    breachRate: "माप सीमा से बाहर",
    coverage: "आंकड़ा कवरेज",
    readingsOf: (a, e)=>`${e} अपेक्षित में से ${a} माप`,
    trend: {
        worsening: "बिगड़ रहा",
        stable: "स्थिर",
        improving: "सुधर रहा"
    },
    tier: {
        insufficient_data: "आंकड़े उपलब्ध नहीं",
        high: "उच्च जोखिम",
        medium: "मध्यम जोखिम",
        low: "कम जोखिम"
    },
    actions: "कार्रवाई",
    action: {
        aerate: "वायु-संचार",
        clean: "सफाई",
        test_first: "पहले जाँच",
        sample_metals: "धातु जाँच",
        lake_ban: "झील पर रोक"
    },
    markDone: "पूरा करें",
    done: "पूरा",
    downloadLog: "कार्रवाई लॉग (CSV) डाउनलोड",
    logNote: "पूरी की गई कार्रवाइयाँ दर्ज होती हैं। अगले वर्ष यही लॉग मॉडल के प्रशिक्षण का आधार बनेगा।",
    page: (p)=>`पृष्ठ ${p}`,
    pdfTitle: (r, p)=>`${r} रिपोर्ट पृष्ठ ${p} पर खोलें (नया टैब)`,
    context: "संदर्भ",
    dataGap: "आंकड़ों की कमी",
    noLimit: "CPCB स्नान मानक तय नहीं",
    back: "जोखिम सूची पर लौटें",
    readings: "माप",
    readingsNote: "पंक्तियाँ: पर्व, वर्ष और चरण। खाली खाने 'नमूना नहीं' दिखते हैं, शून्य नहीं।",
    limitRow: "श्रेणी B सीमा",
    notSampled: "नमूना नहीं",
    bdl: "BDL",
    bdlLong: "पता लगाने की सीमा से कम",
    noTable: "रिपोर्ट में तालिका नहीं: जाँच नहीं हुई",
    status: {
        breach: "सीमा से बाहर",
        ok: "सीमा में",
        no_limit: "स्नान मानक नहीं",
        missing: "नमूना नहीं लिया गया"
    },
    legend: "संकेत",
    phase: {
        pre: "पहले",
        during: "दौरान",
        after: "बाद"
    },
    phaseLong: {
        pre: "विसर्जन से पहले",
        during: "विसर्जन के दौरान",
        after: "विसर्जन के बाद"
    },
    festival: {
        Ganesh: "गणेश",
        Durga: "दुर्गा"
    },
    param: {
        pH: "पीएच",
        "Dissolved oxygen": "घुलित ऑक्सीजन",
        BOD: "बीओडी",
        COD: "सीओडी",
        "Total solids": "कुल ठोस",
        "Dissolved solids": "घुलित ठोस",
        "Suspended solids": "निलंबित ठोस",
        Turbidity: "गंदलापन",
        Conductivity: "चालकता",
        Chromium: "क्रोमियम",
        Lead: "सीसा",
        Zinc: "जस्ता",
        Copper: "तांबा"
    },
    doTrend: "पर्वों में घुलित ऑक्सीजन (mg/l)",
    bodTrend: "पर्वों में बीओडी (mg/l)",
    limitLabel: (v)=>`सीमा ${v}`,
    breachMarked: "भरे लाल बिंदु सीमा से बाहर हैं। रेखा में खाली जगह = जाँच नहीं हुई।",
    forecast: "दुर्गा 2026 अनुमान",
    forecastUnavailable: "मॉडल अनुमान अभी उपलब्ध नहीं। ऊपर की सूची इस पर निर्भर नहीं है।",
    pBreach: "श्रेणी B उल्लंघन की संभावना",
    champion: "प्रयुक्त मॉडल",
    agreement: "मॉडलों की सहमति",
    basis: (y, f, ph)=>`${f} ${y} के विसर्जन-${ph} माप पर आधारित`,
    topReasons: "मॉडल ऐसा क्यों कहता है",
    caveat: "मध्यप्रदेश के 544 स्थल-पर्व रिकॉर्ड (2023–25) पर आधारित मॉडल अनुमान। यह माप नहीं है।",
    gaps: "आंकड़ों की कमी",
    noGaps: "इस घाट के लिए कोई कमी दर्ज नहीं।",
    briefTitle: "भेजने योग्य सार",
    briefNote: "हर भाषा में एक पृष्ठ। हर संख्या के साथ रिपोर्ट का पृष्ठ।",
    english: "English",
    hindi: "हिन्दी",
    both: "दोनों",
    copy: "पाठ कॉपी करें",
    copied: "कॉपी हुआ",
    print: "प्रिंट / PDF सहेजें",
    download: ".md डाउनलोड",
    whatifTitle: "2026 के विसर्जन-पूर्व आंकड़े दर्ज करें",
    whatifNote: "ये मान दुर्गा 2026 विसर्जन-पूर्व माप माने जाएँगे, पूरे भार के साथ। जो नहीं मापा, उसे खाली छोड़ें।",
    ghat: "घाट",
    newGhat: "नया घाट (केवल 2026 आंकड़े)",
    newName: "घाट का नाम",
    newWater: "जल स्रोत",
    calculate: "फिर से गणना करें",
    working: "गणना हो रही है…",
    current: "वर्तमान (2023–25)",
    with2026: "2026 आंकड़ों के साथ",
    only2026: "केवल 2026 आंकड़े",
    tierLabel: "श्रेणी",
    forecastOff: "अनुमान उपलब्ध नहीं (API बंद)। स्कोर इन्हीं नियमों से ब्राउज़र में निकाला गया।",
    movedUp: (a, b)=>`स्कोर ${a} से बढ़कर ${b} हुआ।`,
    movedDown: (a, b)=>`स्कोर ${a} से घटकर ${b} हुआ।`,
    movedNone: (a)=>`स्कोर ${a} पर अपरिवर्तित।`,
    drivenBy: (p)=>`सबसे बड़ा कारण: ${p}।`,
    noInput: "कम से कम एक माप दर्ज करें।",
    modelsTitle: "अनुमान के पीछे के मॉडल",
    experimental: "प्रायोगिक",
    leaderboard: "मॉडल तुलना",
    trainedOn: (n)=>`मध्यप्रदेश के ${n} स्थल-पर्व रिकॉर्ड (2023–25) पर प्रशिक्षित। स्थल-समूहों और केवल 2025 पर जाँचा गया।`,
    colModel: "मॉडल",
    colAuc: "AUC (स्थल समूह)",
    colAucT: "AUC (2025 अलग)",
    colPr: "PR-AUC",
    colBrier: "Brier",
    colLog: "Log-loss",
    colF1: "F1",
    championRule: "चयन नियम",
    importances: "चुना गया मॉडल किन बातों पर निर्भर है",
    cql: "बजट बँटवारे का सुझाव (CQL)",
    policyValues: "सिम्युलेटर में नीति मूल्य (अधिक बेहतर)",
    policy: {
        cql: "CQL नीति",
        heuristic: "सामान्य नियम",
        random: "यादृच्छिक",
        do_nothing: "कुछ न करें"
    },
    budget: "बजट (इकाई)",
    update: "अद्यतन करें",
    plan: "सुझाई गई योजना",
    cost: "लागत",
    gain: "लाभ",
    loading: "लोड हो रहा है…",
    loadError: "API या सहेजे गए डेटा से जानकारी लोड नहीं हो सकी।",
    generated: "तैयार",
    footer: "माप CPCB मानकों के सापेक्ष दिए गए हैं। स्वास्थ्य प्रभाव का दावा नहीं। स्रोत: MPPCB मूर्ति विसर्जन रिपोर्ट 2023, 2024, 2025।",
    lv: {
        title: "घाट वॉच लाइव",
        sub: "लाइव · 20 अक्टूबर 2026 · दुर्गा विसर्जन",
        simulated: "सिमुलेटेड",
        simNote: "अभ्यास के लिए सिमुलेटेड माप। ये फ़ील्ड माप नहीं हैं।",
        simClock: "सिम समय (IST)",
        play: "चलाएँ",
        pause: "रोकें",
        reset: "रीसेट",
        speed: "गति",
        scenario: "परिदृश्य",
        conn: {
            connecting: "जुड़ रहा है…",
            ws: "लाइव (WebSocket)",
            poll: "लाइव (पोलिंग)",
            mock: "डेमो जनरेटर",
            offline: "ऑफ़लाइन"
        },
        connHint: {
            connecting: "लाइव सर्वर खोजा जा रहा है",
            ws: "लाइव सर्वर से सीधा डेटा",
            poll: "WebSocket नहीं; हर 2 सेकंड सर्वर से डेटा",
            mock: "सर्वर उपलब्ध नहीं; ब्राउज़र डेमो डेटा बना रहा है",
            offline: "कोई डेटा स्रोत नहीं"
        },
        sev: {
            critical: "गंभीर",
            high: "उच्च",
            warn: "चेतावनी",
            info: "सूचना"
        },
        tier: {
            critical: "गंभीर",
            high: "उच्च",
            medium: "मध्यम",
            low: "कम",
            no_data: "लाइव डेटा नहीं"
        },
        sensor: {
            live: "लाइव",
            stale: "पुराना",
            none: "लाइव डेटा नहीं"
        },
        awaitingLab: "लैब प्रतीक्षा (≈ 90 मिनट)",
        eta: (m)=>`~${m} मिनट में DO < 5`,
        etaSteady: "DO रुझान स्थिर",
        etaBelow: "DO पहले से 5 से कम",
        perH: "/घं",
        idolsH: "मूर्ति/घंटा",
        onSite: "मौके पर",
        alertsN: (n)=>`${n} खुले`,
        alerts: "अलर्ट",
        all: "सभी",
        ack: "स्वीकारें",
        acked: "स्वीकार किया",
        speak: "सुनाएँ",
        stopSpeak: "रोकें",
        noAlerts: "इस स्तर का कोई खुला अलर्ट नहीं।",
        baseline: "विसर्जन से पहले",
        newest: "नवीनतम अलर्ट",
        tabs: {
            plan: "योजना",
            dispatch: "तैनाती",
            sitrep: "स्थिति रिपोर्ट",
            models: "मॉडल",
            intake: "इनटेक"
        },
        resources: "संसाधन",
        unit: "इकाई",
        status: "स्थिति",
        location: "स्थान",
        etaCol: "पहुँच",
        resStatus: {
            idle: "खाली",
            en_route: "रास्ते में",
            working: "कार्यरत"
        },
        kind: {
            aerator: "एरेटर",
            crew: "सफाई दल",
            test_team: "जाँच दल",
            diversion: "डायवर्जन दल"
        },
        depot: "डिपो",
        min: (n)=>`${n} मिनट`,
        suggestions: "सुझाई गई तैनाती",
        apply: "लागू करें",
        travel: (n)=>`यात्रा ${n} मिनट`,
        gain: "लाभ",
        noSuggestions: "अभी कोई सुझाव नहीं।",
        actionLog: "कार्रवाई लॉग",
        noEvents: "अभी कुछ दर्ज नहीं।",
        sitrepTitle: "लाइव स्थिति रिपोर्ट",
        print: "प्रिंट",
        copy: "कॉपी",
        copied: "कॉपी हुआ",
        histBrief: "ऐतिहासिक सार (2023–25 रिपोर्ट)",
        calibration: "सिम्युलेटर अंशांकन",
        calibNa: "अंशांकन तालिका अभी उपलब्ध नहीं।",
        close: "बंद करें",
        values: "वर्तमान मान",
        limit: "सीमा",
        chart: "पिछले 120 सिम-मिनट",
        pBreach: "उल्लंघन की संभावना, दुर्गा 2026",
        pBreachNote: "विसर्जन-पूर्व मॉडल अनुमान, लाइव अद्यतन नहीं",
        initialSource: "आरंभिक मान",
        quick: "त्वरित कार्रवाई",
        send: (k)=>`${k} भेजें`,
        evidence: "रिपोर्ट पृष्ठों सहित साक्ष्य",
        whatif: "माप दर्ज करें (what-if)",
        lastSeen: "अंतिम माप",
        never: "कभी नहीं",
        intervention: "कार्रवाई",
        voiceEnable: "आवाज़ चालू करें",
        voiceOn: "आवाज़ चालू",
        voiceConfirm: {
            en: "Voice alerts are on.",
            hi: "आवाज़ अलर्ट चालू हैं।"
        },
        mute: "म्यूट",
        unmute: "आवाज़ खोलें",
        announce: "घोषणा",
        level: {
            all: "सभी",
            high: "उच्च+",
            critical: "गंभीर",
            off: "बंद"
        },
        hindiMissing: "हिन्दी आवाज़ इंस्टॉल नहीं",
        noVoice: "कोई आवाज़ नहीं मिली",
        noSpeech: "इस ब्राउज़र में आवाज़ समर्थित नहीं",
        cmdPlaceholder: "आदेश, जैसे: शाहपुरा की स्थिति",
        cmdRun: "चलाएँ",
        cmdLabel: "आदेश",
        micStart: "बोलें",
        micListening: "सुन रहा है…",
        micHint: "Chrome, नेटवर्क और माइक अनुमति चाहिए",
        map: "नक्शा (योजनाबद्ध)",
        approx: "स्थान अनुमानित",
        dispatched: (k, g, m)=>`${k} ${g} भेजा गया, ${m} मिनट में।`,
        nav: "लाइव कमांड सेंटर",
        ngt: "NGT रोक",
        total: "अब तक मूर्तियाँ",
        readings: "माप"
    }
};
const dict = {
    en,
    hi
};
function paramName(t, p) {
    return t.param[p] ?? p;
}
function seriesLabel(t, label) {
    const [f, y, ph] = label.split(" ");
    return `${t.festival[f] ?? f} ${y} ${t.phase[ph] ?? ph ?? ""}`.trim();
}
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
"[project]/lib/intakeI18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Intake + real-map strings (docs/PLAN-INTAKE.md §3). Every string en + hi.
__turbopack_context__.s([
    "ix",
    ()=>ix
]);
const en = {
    // map
    mapTitle: "Map of Bhopal",
    tilesDown: "map tiles unavailable, schematic shown",
    mapLoading: "Loading map…",
    ngtOutline: "dashed outline: NGT lake ban",
    // intake
    title: "Report intake",
    sub: "Drop an MPPCB report (PDF or photo) or type readings. Nothing enters the ranking until you review and accept.",
    tab: "Intake",
    nav: "Report intake",
    upload: "Upload report",
    manual: "Type readings",
    dropHere: "Drop a PDF, JPG or PNG here",
    orPick: "or choose a file",
    camera: "Take photo",
    pages: "Pages (optional, e.g. 28-30)",
    forceOcr: "Force OCR (scanned pages)",
    year: "Year",
    festival: "Festival",
    phase: "Phase",
    detected: "detected from the report",
    start: "Extract readings",
    uploading: (p)=>`Uploading… ${p}%`,
    tooBig: (mb)=>`File is larger than ${mb} MB.`,
    badType: "Only PDF, JPG or PNG files.",
    failed: "Could not start the job.",
    ghat: "Ghat",
    newSite: "New site (not one of the 7 ghats)",
    newSiteName: "Site name",
    bdlToggle: "BDL / not sampled",
    sourceNote: "Source note / page",
    sourceNotePh: "e.g. MPPCB lab sheet, 18 Oct, page 2",
    submitManual: "Check readings",
    needOne: "Enter at least one value or mark a cell BDL / not sampled.",
    // capabilities
    capText: "Text PDFs",
    capOcr: "OCR",
    ready: "ready",
    notInstalled: "not installed",
    howEnable: "how to enable",
    mockMode: "Backend intake API not reachable: running a local demo job (no data is saved).",
    realMode: "Connected to the intake API",
    // stages
    stages: "Processing agents",
    elapsed: (s)=>`${s.toFixed(1)} s`,
    stageStatus: {
        pending: "waiting",
        running: "running",
        done: "done",
        failed: "failed",
        skipped: "skipped"
    },
    ocrChip: (engine, conf)=>`OCR ${engine}: mean confidence ${Math.round(conf * 100)}%`,
    jobStatus: {
        running: "Processing",
        needs_review: "Ready for review",
        accepted: "Accepted",
        rejected: "Rejected",
        failed: "Failed"
    },
    // review
    review: "Review extracted readings",
    reviewNote: "Values are proposals until you accept. Cell colour = extraction confidence.",
    confHigh: "≥ 90% plain",
    confMid: "70–90% amber",
    confLow: "< 70% red",
    site: "Site",
    asPrinted: "as printed",
    mapTo: "Map to ghat",
    unmatched: "unmatched: choose a ghat or keep as new site",
    keepNew: "Keep as new site",
    param: "Parameter",
    value: "Value",
    flag: "Flag",
    unit: "Unit",
    conf: "Conf.",
    issues: "Issues",
    pageThumb: (n)=>`Page ${n}`,
    openFull: "Open full size",
    inPack: "already in pack",
    rows: (n)=>`${n} rows`,
    quality: (q)=>`${q.rows} rows · ${q.numeric} numeric · ${q.flagged} flagged · ${q.tables} tables · mean confidence ${Math.round(q.mean * 100)}% · ${q.matched} sites matched, ${q.unmatched} unmatched`,
    rerun: "Re-run analysis with corrections",
    accept: "Accept",
    reject: "Reject",
    working: "Working…",
    acceptedMsg: (n, g)=>`${n} rows accepted. Ranking updated for ${g} ghat(s).`,
    rejectedMsg: "Job rejected. Nothing was added.",
    edited: "edited",
    level: {
        info: "info",
        warn: "warning",
        error: "error"
    },
    // results
    results: "What changes",
    before: "Before",
    after: "After",
    score: "score",
    rank: "rank",
    unchanged: "unchanged",
    newReasons: "New reasons",
    forecast: "Forecast from the new pre-immersion values",
    estimate: "pre-immersion model estimate",
    allocation: "Allocation hint",
    downloadEn: "Download report (.md, English)",
    downloadHi: "Download report (.md, हिन्दी)",
    toPlan: "Open the Plan tab",
    uploadedPage: (n)=>`uploaded p. ${n}`,
    uploadedTitle: "Officer-added reading: open the uploaded page image (not yet verified by MPPCB)",
    // accepted
    accepted: "Accepted officer-added data",
    acceptedNone: "No officer-added data yet.",
    remove: "Remove",
    acceptedAt: "accepted",
    source: "Source",
    // badge
    badge: (n)=>`Includes officer-added data (${n} rows, not yet verified by MPPCB)`,
    badgeLink: "Review in Intake",
    newJob: "Start another",
    notVerified: "officer-added, not yet verified by MPPCB"
};
const hi = {
    mapTitle: "भोपाल का नक्शा",
    tilesDown: "नक्शे की टाइलें उपलब्ध नहीं, योजनाबद्ध नक्शा दिखाया गया",
    mapLoading: "नक्शा लोड हो रहा है…",
    ngtOutline: "डैश वाली रेखा: NGT झील प्रतिबंध",
    title: "रिपोर्ट दर्ज करें",
    sub: "MPPCB रिपोर्ट (PDF या फ़ोटो) डालें या माप टाइप करें। आपकी जाँच और स्वीकृति से पहले कुछ भी रैंकिंग में नहीं जाता।",
    tab: "इनटेक",
    nav: "रिपोर्ट दर्ज करें",
    upload: "रिपोर्ट अपलोड करें",
    manual: "माप टाइप करें",
    dropHere: "PDF, JPG या PNG यहाँ छोड़ें",
    orPick: "या फ़ाइल चुनें",
    camera: "फ़ोटो लें",
    pages: "पृष्ठ (वैकल्पिक, जैसे 28-30)",
    forceOcr: "OCR ज़बरदस्ती चलाएँ (स्कैन पृष्ठ)",
    year: "वर्ष",
    festival: "त्योहार",
    phase: "चरण",
    detected: "रिपोर्ट से पहचाना गया",
    start: "माप निकालें",
    uploading: (p)=>`अपलोड हो रहा है… ${p}%`,
    tooBig: (mb)=>`फ़ाइल ${mb} MB से बड़ी है।`,
    badType: "केवल PDF, JPG या PNG फ़ाइलें।",
    failed: "काम शुरू नहीं हो सका।",
    ghat: "घाट",
    newSite: "नया स्थल (7 घाटों में से नहीं)",
    newSiteName: "स्थल का नाम",
    bdlToggle: "BDL / नमूना नहीं",
    sourceNote: "स्रोत टिप्पणी / पृष्ठ",
    sourceNotePh: "जैसे MPPCB लैब शीट, 18 अक्टूबर, पृष्ठ 2",
    submitManual: "माप जाँचें",
    needOne: "कम से कम एक मान भरें या किसी खाने को BDL / नमूना नहीं चिह्नित करें।",
    capText: "टेक्स्ट PDF",
    capOcr: "OCR",
    ready: "तैयार",
    notInstalled: "स्थापित नहीं",
    howEnable: "कैसे चालू करें",
    mockMode: "बैकएंड इनटेक API उपलब्ध नहीं: स्थानीय डेमो काम चल रहा है (कोई डेटा सहेजा नहीं जाता)।",
    realMode: "इनटेक API से जुड़ा",
    stages: "प्रोसेसिंग एजेंट",
    elapsed: (s)=>`${s.toFixed(1)} सेकंड`,
    stageStatus: {
        pending: "प्रतीक्षा",
        running: "चल रहा है",
        done: "पूर्ण",
        failed: "विफल",
        skipped: "छोड़ा गया"
    },
    ocrChip: (engine, conf)=>`OCR ${engine}: औसत विश्वास ${Math.round(conf * 100)}%`,
    jobStatus: {
        running: "प्रोसेस हो रहा है",
        needs_review: "जाँच के लिए तैयार",
        accepted: "स्वीकृत",
        rejected: "अस्वीकृत",
        failed: "विफल"
    },
    review: "निकाले गए माप जाँचें",
    reviewNote: "स्वीकृति तक मान केवल प्रस्ताव हैं। खाने का रंग = निकालने का विश्वास।",
    confHigh: "≥ 90% सामान्य",
    confMid: "70–90% पीला",
    confLow: "< 70% लाल",
    site: "स्थल",
    asPrinted: "जैसा छपा",
    mapTo: "घाट से जोड़ें",
    unmatched: "मेल नहीं: घाट चुनें या नया स्थल रखें",
    keepNew: "नया स्थल रखें",
    param: "मापदंड",
    value: "मान",
    flag: "चिह्न",
    unit: "इकाई",
    conf: "विश्वास",
    issues: "समस्याएँ",
    pageThumb: (n)=>`पृष्ठ ${n}`,
    openFull: "पूरे आकार में खोलें",
    inPack: "पैक में पहले से",
    rows: (n)=>`${n} पंक्तियाँ`,
    quality: (q)=>`${q.rows} पंक्तियाँ · ${q.numeric} संख्यात्मक · ${q.flagged} चिह्नित · ${q.tables} तालिकाएँ · औसत विश्वास ${Math.round(q.mean * 100)}% · ${q.matched} स्थल मिले, ${q.unmatched} नहीं मिले`,
    rerun: "सुधार के साथ विश्लेषण दोबारा चलाएँ",
    accept: "स्वीकार करें",
    reject: "अस्वीकार करें",
    working: "काम जारी…",
    acceptedMsg: (n, g)=>`${n} पंक्तियाँ स्वीकृत। ${g} घाट की रैंकिंग अद्यतन।`,
    rejectedMsg: "काम अस्वीकृत। कुछ नहीं जोड़ा गया।",
    edited: "संपादित",
    level: {
        info: "सूचना",
        warn: "चेतावनी",
        error: "त्रुटि"
    },
    results: "क्या बदलता है",
    before: "पहले",
    after: "बाद में",
    score: "स्कोर",
    rank: "रैंक",
    unchanged: "अपरिवर्तित",
    newReasons: "नए कारण",
    forecast: "नए विसर्जन-पूर्व मानों से पूर्वानुमान",
    estimate: "विसर्जन-पूर्व मॉडल अनुमान",
    allocation: "संसाधन सुझाव",
    downloadEn: "रिपोर्ट डाउनलोड (.md, English)",
    downloadHi: "रिपोर्ट डाउनलोड (.md, हिन्दी)",
    toPlan: "योजना टैब खोलें",
    uploadedPage: (n)=>`अपलोड पृ. ${n}`,
    uploadedTitle: "अधिकारी द्वारा जोड़ा माप: अपलोड पृष्ठ की छवि खोलें (MPPCB द्वारा अभी सत्यापित नहीं)",
    accepted: "स्वीकृत अधिकारी-जोड़ा डेटा",
    acceptedNone: "अभी कोई अधिकारी-जोड़ा डेटा नहीं।",
    remove: "हटाएँ",
    acceptedAt: "स्वीकृत",
    source: "स्रोत",
    badge: (n)=>`अधिकारी द्वारा जोड़ा डेटा शामिल (${n} पंक्तियाँ, MPPCB द्वारा अभी सत्यापित नहीं)`,
    badgeLink: "इनटेक में देखें",
    newJob: "नया शुरू करें",
    notVerified: "अधिकारी द्वारा जोड़ा, MPPCB द्वारा अभी सत्यापित नहीं"
};
const ix = {
    en,
    hi
};
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
"[project]/lib/lang.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setLang",
    ()=>setLang,
    "useLang",
    ()=>useLang
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const KEY = "ghatwatch.lang";
const listeners = new Set();
function read() {
    try {
        return localStorage.getItem(KEY) === "hi" ? "hi" : "en";
    } catch  {
        return "en";
    }
}
function subscribe(cb) {
    listeners.add(cb);
    const onStorage = (e)=>e.key === KEY && cb();
    window.addEventListener("storage", onStorage);
    return ()=>{
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
    };
}
function setLang(l) {
    try {
        localStorage.setItem(KEY, l);
    } catch  {
    /* private mode: keep in memory only */ }
    listeners.forEach((f)=>f());
}
function useLang() {
    _s();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, read, {
        "useLang.useSyncExternalStore[lang]": ()=>"en"
    }["useLang.useSyncExternalStore[lang]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLang.useEffect": ()=>{
            document.documentElement.lang = lang;
        }
    }["useLang.useEffect"], [
        lang
    ]);
    const set = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLang.useCallback[set]": (l)=>setLang(l)
    }["useLang.useCallback[set]"], []);
    return {
        lang,
        t: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dict"][lang],
        setLang: set
    };
}
_s(useLang, "Ktzd5oXy6tMvTx0nf2i8YVQB4D4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/liveClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WS_URL",
    ()=>WS_URL,
    "httpApi",
    ()=>httpApi,
    "mockApi",
    ()=>mockApi,
    "startLiveClient",
    ()=>startLiveClient
]);
// Live data client: WebSocket first; if it does not open within 3 s, poll GET /api/live/snapshot
// every 2 s; if that also fails, run the local demo generator (mockLive). Reconnects with backoff.
// Create only inside useEffect and call stop() in cleanup (StrictMode mounts twice in dev).
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockLive.ts [app-client] (ecmascript)");
;
;
const WS_URL = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_URL"].replace(/^http/, "ws") + "/ws/live";
async function req(path, init, timeoutMs = 3000) {
    const ctrl = new AbortController();
    const timer = setTimeout(()=>ctrl.abort(), timeoutMs);
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_URL"]}${path}`, {
            ...init,
            headers: init?.body ? {
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
const post = (path, body)=>req(path, {
        method: "POST",
        body: JSON.stringify(body)
    });
async function staticCalibration() {
    try {
        const res = await fetch("/data/live/calibration.json", {
            cache: "no-store"
        });
        if (!res.ok) return {
            available: false
        };
        return await res.json();
    } catch  {
        return {
            available: false
        };
    }
}
const httpApi = {
    kind: "http",
    snapshot: ()=>req("/api/live/snapshot"),
    control: (r)=>post("/api/live/control", r),
    scenarios: ()=>req("/api/live/scenarios"),
    dispatch: (r)=>post("/api/live/dispatch", r),
    ack: (id)=>post("/api/live/ack", {
            alert_id: id
        }),
    suggestions: ()=>req("/api/live/suggestions"),
    sitrep: ()=>req("/api/live/sitrep"),
    command: (text, lang)=>post("/api/live/command", {
            text,
            lang
        }),
    calibration: async ()=>{
        try {
            const c = await req("/api/live/calibration");
            if (c && c.available !== false) return c;
        } catch  {
        /* fall through to the static artefact */ }
        return staticCalibration();
    }
};
function mockApi(m) {
    return {
        kind: "mock",
        snapshot: async ()=>m.snapshot(),
        control: async (r)=>m.control(r),
        scenarios: async ()=>m.scenarios(),
        dispatch: async (r)=>m.dispatch(r),
        ack: async (id)=>m.ack(id),
        suggestions: async ()=>m.getSuggestions(),
        sitrep: async ()=>m.sitrep(),
        command: async (text, lang)=>m.command(text, lang),
        calibration: staticCalibration
    };
}
function startLiveClient(ranking, cb) {
    let stopped = false;
    let mode = "connecting";
    let ws = null;
    let wsGen = 0;
    let backoff = 2000;
    let reconnectTimer = null;
    let pollTimer = null;
    let polling = false;
    let mock = null;
    let mockUnsub = null;
    const setMode = (m, api)=>{
        mode = m;
        cb.onMode(m, api);
    };
    const stopMock = ()=>{
        mockUnsub?.();
        mockUnsub = null;
        mock?.stop();
        mock = null;
    };
    const startMock = ()=>{
        if (mock || stopped) return;
        try {
            mock = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockLive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockLive"](ranking);
        } catch  {
            setMode("offline", httpApi);
            return;
        }
        const api = mockApi(mock);
        setMode("mock", api);
        mockUnsub = mock.subscribe((msg)=>!stopped && cb.onMessage(msg, "mock"));
        mock.start();
    };
    const stopPoll = ()=>{
        polling = false;
        if (pollTimer) clearTimeout(pollTimer);
        pollTimer = null;
    };
    const pollOnce = async ()=>{
        if (!polling || stopped) return;
        try {
            const s = await httpApi.snapshot();
            if (!polling || stopped) return;
            if (mode !== "poll") {
                stopMock();
                setMode("poll", httpApi);
            }
            cb.onPoll(s);
        } catch  {
            if (!polling || stopped) return;
            if (mode !== "mock") startMock();
        }
        if (polling && !stopped) pollTimer = setTimeout(pollOnce, mode === "mock" ? 10000 : 2000);
    };
    const startPoll = ()=>{
        if (polling || stopped) return;
        polling = true;
        void pollOnce();
    };
    const scheduleReconnect = ()=>{
        if (stopped || reconnectTimer) return;
        reconnectTimer = setTimeout(()=>{
            reconnectTimer = null;
            openWs();
        }, backoff);
        backoff = Math.min(backoff * 2, 30000);
    };
    const fallback = ()=>{
        if (stopped) return;
        startPoll();
        scheduleReconnect();
    };
    function openWs() {
        if (stopped) return;
        const gen = ++wsGen;
        let opened = false;
        let sock;
        try {
            sock = new WebSocket(WS_URL);
        } catch  {
            fallback();
            return;
        }
        ws = sock;
        const openTimer = setTimeout(()=>{
            if (!opened && gen === wsGen) {
                try {
                    sock.close();
                } catch  {
                /* ignore */ }
                fallback();
            }
        }, 3000);
        sock.onopen = ()=>{
            if (gen !== wsGen || stopped) return;
            opened = true;
            clearTimeout(openTimer);
            backoff = 2000;
            stopPoll();
            stopMock();
            setMode("ws", httpApi);
        };
        sock.onmessage = (ev)=>{
            if (gen !== wsGen || stopped) return;
            try {
                const msg = JSON.parse(typeof ev.data === "string" ? ev.data : "");
                if (msg && (msg.type === "snapshot" || msg.type === "tick")) cb.onMessage(msg, "ws");
            } catch  {
            /* ignore malformed frame */ }
        };
        sock.onclose = ()=>{
            clearTimeout(openTimer);
            if (gen !== wsGen || stopped) return;
            ws = null;
            if (opened) fallback();
            else if (!polling) fallback();
        };
        sock.onerror = ()=>{
        /* onclose follows */ };
    }
    openWs();
    return {
        stop () {
            stopped = true;
            wsGen++;
            if (reconnectTimer) clearTimeout(reconnectTimer);
            stopPoll();
            stopMock();
            try {
                ws?.close();
            } catch  {
            /* ignore */ }
            ws = null;
        },
        refetchSnapshot () {
            if (stopped) return;
            if (mock) {
                cb.onMessage({
                    type: "snapshot",
                    seq: mock.snapshot().seq,
                    state: mock.snapshot()
                }, "mock");
                return;
            }
            httpApi.snapshot().then((s)=>!stopped && cb.onMessage({
                    type: "snapshot",
                    seq: s.seq,
                    state: s
                }, mode)).catch(()=>undefined);
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/liveFormat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SEV_BAR",
    ()=>SEV_BAR,
    "SEV_CHIP",
    ()=>SEV_CHIP,
    "SEV_ICON",
    ()=>SEV_ICON,
    "SEV_ORDER",
    ()=>SEV_ORDER,
    "SEV_RANK",
    ()=>SEV_RANK,
    "TIER_CHIP",
    ()=>TIER_CHIP,
    "TIER_ICON",
    ()=>TIER_ICON,
    "TIER_ORDER",
    ()=>TIER_ORDER,
    "TIER_TEXT",
    ()=>TIER_TEXT,
    "TIER_VAR",
    ()=>TIER_VAR,
    "fmtClock",
    ()=>fmtClock,
    "fmtDay",
    ()=>fmtDay,
    "fmtNum",
    ()=>fmtNum
]);
const clockFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
});
const dayFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short"
});
const fmtClock = (t)=>clockFmt.format(t);
const fmtDay = (t)=>dayFmt.format(t);
function fmtNum(v, d = 1) {
    return typeof v === "number" && Number.isFinite(v) ? v.toFixed(d) : "—";
}
const TIER_ORDER = [
    "critical",
    "high",
    "no_data",
    "medium",
    "low"
];
const SEV_ORDER = [
    "critical",
    "high",
    "warn",
    "info"
];
const SEV_RANK = {
    info: 0,
    warn: 1,
    high: 2,
    critical: 3
};
const TIER_ICON = {
    critical: "✕",
    high: "▲",
    medium: "◆",
    low: "✓",
    no_data: "○"
};
const TIER_TEXT = {
    critical: "text-critical",
    high: "text-high",
    medium: "text-medium",
    low: "text-low",
    no_data: "text-nodata"
};
const TIER_CHIP = {
    critical: "bg-critical text-paper border border-critical",
    high: "border border-high text-high bg-high-bg",
    medium: "border border-medium text-medium bg-medium-bg",
    low: "border border-low text-low",
    no_data: "border border-dashed border-nodata text-nodata"
};
const TIER_VAR = {
    critical: "var(--critical)",
    high: "var(--high)",
    medium: "var(--medium)",
    low: "var(--low)",
    no_data: "var(--nodata)"
};
const SEV_ICON = {
    critical: "✕",
    high: "▲",
    warn: "◆",
    info: "i"
};
const SEV_CHIP = {
    critical: "bg-critical text-paper border border-critical",
    high: "border border-high text-high bg-high-bg",
    warn: "border border-medium text-medium",
    info: "border border-nodata text-muted"
};
const SEV_BAR = {
    critical: "border-l-critical",
    high: "border-l-high",
    warn: "border-l-medium",
    info: "border-l-nodata"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/liveStore.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiveProvider",
    ()=>LiveProvider,
    "useLiveStore",
    ()=>useLiveStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Live state: useReducer + context. Applies snapshots and ticks, keeps per-ghat ring buffers
// (6 sim-h), alerts upsert/resolve, seq-gap refetch, and fans out newly arrived alerts to
// subscribers (voice). Alerts that arrive in a snapshot are never announced.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liveClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const KEEP_MS = 6 * 60 * 60_000;
const PARAMS = [
    "DO",
    "BOD",
    "turbidity"
];
const emptySeries = ()=>({
        DO: [],
        BOD: [],
        turbidity: []
    });
function trim(pts, now) {
    const cut = now - KEEP_MS;
    let i = 0;
    while(i < pts.length && pts[i][0] < cut)i++;
    return i ? pts.slice(i) : pts;
}
function mergeSnapshotSeries(prev, snap, now) {
    const out = emptySeries();
    for (const p of PARAMS){
        const s = snap?.[p] ?? [];
        const first = s.length ? s[0][0] : Infinity;
        const older = (prev?.[p] ?? []).filter((pt)=>pt[0] < first);
        out[p] = trim([
            ...older,
            ...s
        ], now);
    }
    return out;
}
function applySnapshot(prev, s) {
    const series = {};
    const ghats = {};
    // A reset moves time backwards: drop old buffers.
    const keepOld = prev && s.t >= prev.t && prev.t_start === s.t_start;
    for (const [slug, g] of Object.entries(s.ghats)){
        series[slug] = mergeSnapshotSeries(keepOld ? prev?.series[slug] : undefined, g.series, s.t);
        const rest = {
            ...g
        };
        delete rest.series;
        ghats[slug] = rest;
    }
    return {
        seq: s.seq,
        t: s.t,
        t_start: s.t_start,
        speed: s.speed,
        running: s.running,
        scenario: s.scenario,
        ghats,
        series,
        resources: s.resources,
        alerts: s.alerts_open.filter((a)=>a.state !== "resolved"),
        events: s.events_recent.slice(-200),
        suggestions: s.suggestions,
        suggestions_version: s.suggestions_version,
        sitrep_version: s.sitrep_version,
        stats: s.stats
    };
}
function applyTick(d, m) {
    const series = {
        ...d.series
    };
    for (const [slug, pts] of Object.entries(m.points ?? {})){
        const cur = series[slug] ?? emptySeries();
        const next = {
            ...cur
        };
        for (const p of PARAMS){
            const add = pts[p];
            if (add && add.length) next[p] = trim([
                ...cur[p],
                ...add
            ], m.t);
        }
        series[slug] = next;
    }
    let alerts = d.alerts;
    if (m.alerts_upsert?.length || m.alerts_resolved?.length) {
        const byId = new Map(alerts.map((a)=>[
                a.id,
                a
            ]));
        for (const a of m.alerts_upsert ?? []){
            if (a.state === "resolved") byId.delete(a.id);
            else byId.set(a.id, a);
        }
        for (const id of m.alerts_resolved ?? [])byId.delete(id);
        alerts = [
            ...byId.values()
        ];
    }
    const ghats = {
        ...d.ghats
    };
    for (const [slug, g] of Object.entries(m.ghats ?? {})){
        const rest = {
            ...g
        };
        delete rest.series;
        ghats[slug] = rest;
    }
    return {
        ...d,
        seq: m.seq,
        t: m.t,
        speed: m.speed,
        running: m.running,
        scenario: m.scenario ?? d.scenario,
        ghats,
        series,
        resources: m.resources ?? d.resources,
        alerts,
        events: m.events?.length ? [
            ...d.events,
            ...m.events
        ].slice(-200) : d.events,
        suggestions_version: m.suggestions_version,
        sitrep_version: m.sitrep_version
    };
}
function reducer(s, a) {
    switch(a.type){
        case "snapshot":
            return {
                ...s,
                data: applySnapshot(s.data, a.state)
            };
        case "tick":
            return s.data ? {
                ...s,
                data: applyTick(s.data, a.msg)
            } : s;
        case "mode":
            return {
                ...s,
                mode: a.mode
            };
        case "suggestions":
            return s.data ? {
                ...s,
                data: {
                    ...s.data,
                    suggestions: a.items
                }
            } : s;
    }
}
const LiveCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useLiveStore() {
    _s();
    const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LiveCtx);
    if (!c) throw new Error("useLiveStore outside LiveProvider");
    return c;
}
_s(useLiveStore, "rCFJOMMDYLWM7qBzTJAGkiO6eRA=");
const sevRank = {
    info: 0,
    warn: 1,
    high: 2,
    critical: 3
};
function LiveProvider({ ranking, children }) {
    _s1();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(reducer, {
        data: null,
        mode: "connecting"
    });
    const [api, setApi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpApi"]);
    const [sitrep, setSitrep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const listeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const lastSeq = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pollAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clientRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const apiRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpApi"]);
    const emitAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveProvider.useCallback[emitAlerts]": (as)=>{
            if (!as.length) return;
            listeners.current.forEach({
                "LiveProvider.useCallback[emitAlerts]": (f)=>f(as)
            }["LiveProvider.useCallback[emitAlerts]"]);
        }
    }["LiveProvider.useCallback[emitAlerts]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveProvider.useEffect": ()=>{
            const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startLiveClient"])(ranking, {
                onMessage (msg) {
                    if (msg.type === "snapshot") {
                        lastSeq.current = msg.state.seq;
                        pollAlerts.current = null;
                        dispatch({
                            type: "snapshot",
                            state: msg.state
                        });
                        return;
                    }
                    const gap = lastSeq.current !== null && msg.seq !== lastSeq.current + 1;
                    lastSeq.current = msg.seq;
                    dispatch({
                        type: "tick",
                        msg
                    });
                    emitAlerts((msg.alerts_upsert ?? []).filter({
                        "LiveProvider.useEffect.client": (a)=>a.state === "open"
                    }["LiveProvider.useEffect.client"]));
                    if (gap) client.refetchSnapshot();
                },
                onPoll (s) {
                    // Polling only delivers snapshots. The first one is a baseline (never announced);
                    // later, alerts that are new or escalated since the previous poll arrived live.
                    const prev = pollAlerts.current;
                    const now = new Map(s.alerts_open.map({
                        "LiveProvider.useEffect.client": (a)=>[
                                a.id,
                                a
                            ]
                    }["LiveProvider.useEffect.client"]));
                    if (prev) {
                        const fresh = s.alerts_open.filter({
                            "LiveProvider.useEffect.client.fresh": (a)=>a.state === "open" && (!prev.has(a.id) || sevRank[a.severity] > sevRank[prev.get(a.id).severity])
                        }["LiveProvider.useEffect.client.fresh"]);
                        emitAlerts(fresh);
                    }
                    pollAlerts.current = now;
                    lastSeq.current = s.seq;
                    dispatch({
                        type: "snapshot",
                        state: s
                    });
                },
                onMode (mode, a) {
                    apiRef.current = a;
                    setApi(a);
                    dispatch({
                        type: "mode",
                        mode
                    });
                }
            });
            clientRef.current = client;
            return ({
                "LiveProvider.useEffect": ()=>{
                    client.stop();
                    clientRef.current = null;
                }
            })["LiveProvider.useEffect"];
        }
    }["LiveProvider.useEffect"], [
        ranking,
        emitAlerts
    ]);
    // Refetch suggestions when the version changes.
    const sv = state.data?.suggestions_version;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveProvider.useEffect": ()=>{
            if (sv === undefined) return;
            let alive = true;
            apiRef.current.suggestions().then({
                "LiveProvider.useEffect": (r)=>alive && dispatch({
                        type: "suggestions",
                        items: r.items
                    })
            }["LiveProvider.useEffect"]).catch({
                "LiveProvider.useEffect": ()=>undefined
            }["LiveProvider.useEffect"]);
            return ({
                "LiveProvider.useEffect": ()=>{
                    alive = false;
                }
            })["LiveProvider.useEffect"];
        }
    }["LiveProvider.useEffect"], [
        sv,
        api
    ]);
    const refreshSitrep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveProvider.useCallback[refreshSitrep]": ()=>{
            apiRef.current.sitrep().then(setSitrep).catch({
                "LiveProvider.useCallback[refreshSitrep]": ()=>undefined
            }["LiveProvider.useCallback[refreshSitrep]"]);
        }
    }["LiveProvider.useCallback[refreshSitrep]"], []);
    // Refetch the sitrep when its version changes (throttled to one request per 3 s).
    const rv = state.data?.sitrep_version;
    const lastSitrepFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveProvider.useEffect": ()=>{
            if (rv === undefined) return;
            const wait = Math.max(0, 3000 - (Date.now() - lastSitrepFetch.current));
            const timer = setTimeout({
                "LiveProvider.useEffect.timer": ()=>{
                    lastSitrepFetch.current = Date.now();
                    refreshSitrep();
                }
            }["LiveProvider.useEffect.timer"], wait);
            return ({
                "LiveProvider.useEffect": ()=>clearTimeout(timer)
            })["LiveProvider.useEffect"];
        }
    }["LiveProvider.useEffect"], [
        rv,
        api,
        refreshSitrep
    ]);
    const subscribeAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveProvider.useCallback[subscribeAlerts]": (fn)=>{
            listeners.current.add(fn);
            return ({
                "LiveProvider.useCallback[subscribeAlerts]": ()=>{
                    listeners.current.delete(fn);
                }
            })["LiveProvider.useCallback[subscribeAlerts]"];
        }
    }["LiveProvider.useCallback[subscribeAlerts]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveProvider.useMemo[value]": ()=>({
                data: state.data,
                mode: state.mode,
                api,
                sitrep,
                refreshSitrep,
                subscribeAlerts
            })
    }["LiveProvider.useMemo[value]"], [
        state.data,
        state.mode,
        api,
        sitrep,
        refreshSitrep,
        subscribeAlerts
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveCtx.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/liveStore.tsx",
        lineNumber: 269,
        columnNumber: 10
    }, this);
}
_s1(LiveProvider, "c0M/lhm4BjwXZQLXLta0XpJNWb4=");
_c = LiveProvider;
var _c;
__turbopack_context__.k.register(_c, "LiveProvider");
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
"[project]/lib/mockLive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MockLive",
    ()=>MockLive,
    "T_START",
    ()=>T_START,
    "findGhat",
    ()=>findGhat
]);
// Demo generator: emits exactly the amendment-B shapes (snapshot, then ticks) when no backend is
// reachable. Dynamics are a plausible toy, seeded from ranking.json. Honest by construction:
// unsensored ghats never expose hidden values until a test team takes a lab reading.
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ghatGeo.ts [app-client] (ecmascript)");
;
const MIN = 60_000;
const T_START = Date.UTC(2026, 9, 20, 9, 30); // 2026-10-20T15:00+05:30
const HORIZON_MIN = 15 * 60;
const KEEP_MIN = 6 * 60;
const SRC_PRE = {
    en: "Durga 2025 pre, MPPCB 2025 p. 64/65",
    hi: "दुर्गा 2025 पूर्व, MPPCB 2025 पृ. 64/65"
};
const SRC_GANESH = {
    en: "assumed from Ganesh 2025 during, p. 28",
    hi: "गणेश 2025 दौरान से अनुमानित, पृ. 28"
};
const META = {
    bairagarh: {
        name: {
            en: "Bairagarh (Sant Hirdaram) kund",
            hi: "बैरागढ़ (संत हिरदाराम) कुंड"
        },
        water_body: "Upper Lake",
        ngt: true,
        sensored: false,
        do0: 0.6,
        bod0: 9.5,
        turb0: 18,
        ph0: 7.6,
        cond0: 410,
        share: 0.17,
        sag: 0.003,
        source: SRC_GANESH
    },
    malikhedi: {
        name: {
            en: "Malikhedi kund",
            hi: "मालीखेड़ी कुंड"
        },
        water_body: "Kund",
        ngt: false,
        sensored: false,
        do0: 0.9,
        bod0: 8.8,
        turb0: 22,
        ph0: 7.7,
        cond0: 450,
        share: 0.16,
        sag: 0.004,
        source: SRC_GANESH
    },
    shahpura: {
        name: {
            en: "Shahpura lake ghat",
            hi: "शाहपुरा झील घाट"
        },
        water_body: "Shahpura Lake",
        ngt: false,
        sensored: true,
        do0: 2.5,
        bod0: 5.4,
        turb0: 12,
        ph0: 7.9,
        cond0: 380,
        share: 0.18,
        sag: 0.0055,
        source: SRC_PRE
    },
    "rani-kamlapati": {
        name: {
            en: "Rani Kamlapati ghat / Kamla Park kund",
            hi: "रानी कमलापति घाट / कमला पार्क कुंड"
        },
        water_body: "Lower Lake",
        ngt: true,
        sensored: true,
        do0: 2.6,
        bod0: 4.6,
        turb0: 9,
        ph0: 8.0,
        cond0: 360,
        share: 0.07,
        sag: 0.013,
        source: SRC_PRE
    },
    hathaikheda: {
        name: {
            en: "Hathaikheda dam / kund",
            hi: "हथाईखेड़ा डैम / कुंड"
        },
        water_body: "Hathaikheda dam",
        ngt: false,
        sensored: true,
        do0: 7.4,
        bod0: 2.6,
        turb0: 7,
        ph0: 7.8,
        cond0: 300,
        share: 0.28,
        sag: 0.0052,
        source: SRC_PRE
    },
    khatlapura: {
        name: {
            en: "Khatlapura ghat",
            hi: "खटलापुरा घाट"
        },
        water_body: "Lower Lake",
        ngt: true,
        sensored: true,
        do0: 5.9,
        bod0: 2.5,
        turb0: 8,
        ph0: 8.1,
        cond0: 340,
        share: 0.07,
        sag: 0.02,
        source: SRC_PRE
    },
    prempura: {
        name: {
            en: "Prempura ghat",
            hi: "प्रेमपुरा घाट"
        },
        water_body: "Upper Lake",
        ngt: true,
        sensored: true,
        do0: 6.6,
        bod0: 2.2,
        turb0: 6,
        ph0: 8.2,
        cond0: 320,
        share: 0.07,
        sag: 0.017,
        source: SRC_PRE
    }
};
const SCENARIOS = [
    {
        name: "ngt_ban",
        label: {
            en: "NGT ban enforced (default)",
            hi: "NGT रोक लागू (डिफ़ॉल्ट)"
        },
        params: {
            idols_total: 12000,
            lake_share: 0.15
        }
    },
    {
        name: "ban_not_enforced",
        label: {
            en: "Ban not enforced (2025 shares)",
            hi: "रोक लागू नहीं (2025 हिस्सेदारी)"
        },
        params: {
            idols_total: 12000,
            lake_share: 0.45
        }
    },
    {
        name: "heavy_turnout",
        label: {
            en: "Heavy turnout (+40%)",
            hi: "भारी भीड़ (+40%)"
        },
        params: {
            idols_total: 16800,
            lake_share: 0.15
        }
    }
];
const RES_DEF = [
    {
        id: "aer-1",
        kind: "aerator",
        en: "Aerator 1",
        hi: "एरेटर 1"
    },
    {
        id: "aer-2",
        kind: "aerator",
        en: "Aerator 2",
        hi: "एरेटर 2"
    },
    {
        id: "aer-3",
        kind: "aerator",
        en: "Aerator 3",
        hi: "एरेटर 3"
    },
    {
        id: "crew-1",
        kind: "crew",
        en: "Cleaning crew 1",
        hi: "सफाई दल 1"
    },
    {
        id: "crew-2",
        kind: "crew",
        en: "Cleaning crew 2",
        hi: "सफाई दल 2"
    },
    {
        id: "crew-3",
        kind: "crew",
        en: "Cleaning crew 3",
        hi: "सफाई दल 3"
    },
    {
        id: "test-1",
        kind: "test_team",
        en: "Test team 1",
        hi: "जाँच दल 1"
    },
    {
        id: "test-2",
        kind: "test_team",
        en: "Test team 2",
        hi: "जाँच दल 2"
    },
    {
        id: "div-1",
        kind: "diversion",
        en: "Diversion squad",
        hi: "डायवर्जन दल"
    }
];
const KIND_NAME = {
    aerator: {
        en: "aerator",
        hi: "एरेटर"
    },
    crew: {
        en: "cleaning crew",
        hi: "सफाई दल"
    },
    test_team: {
        en: "test team",
        hi: "जाँच दल"
    },
    diversion: {
        en: "diversion squad",
        hi: "डायवर्जन दल"
    }
};
function mulberry32(seed) {
    let a = seed >>> 0;
    return ()=>{
        a = a + 0x6d2b79f5 >>> 0;
        let t = a;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
const r1 = (v)=>Math.round(v * 10) / 10;
const r2 = (v)=>Math.round(v * 100) / 100;
/** Arrival intensity by IST hour: small bump in the late afternoon, main peak 17:00–23:00. */ function profile(t) {
    const h = ((t / MIN + 330) / 60 % 24 + 24) % 24; // IST hour of day
    const peak = Math.exp(-(((h - 20) / 2.4) ** 2));
    const late = h >= 23 || h < 6 ? 0.08 : 0;
    return 0.12 + peak + late;
}
const PROFILE_SUM_PER_MIN = (()=>{
    let s = 0;
    for(let m = 0; m < HORIZON_MIN; m++)s += profile(T_START + m * MIN);
    return s;
})();
class MockLive {
    ranking;
    rand = mulberry32(20261020);
    seq = 0;
    t = T_START;
    speed = 180;
    running = true;
    scenario = SCENARIOS[0];
    truth = {};
    obs = {};
    ghats = {};
    resources = [];
    transits = [];
    alerts = {};
    clearSince = {};
    events = [];
    suggestions = [];
    suggestionsVersion = 1;
    sitrepVersion = 1;
    readingsTotal = 0;
    pending = this.emptyPending();
    fracMin = 0;
    timer = null;
    listeners = new Set();
    idSeq = 0;
    constructor(ranking){
        this.ranking = ranking;
        this.reset();
    }
    emptyPending() {
        return {
            points: {},
            upsert: new Map(),
            resolved: [],
            events: []
        };
    }
    nid(p) {
        this.idSeq += 1;
        return `${p}-${this.idSeq}`;
    }
    reset() {
        this.rand = mulberry32(20261020);
        this.t = T_START;
        this.fracMin = 0;
        this.truth = {};
        this.obs = {};
        this.alerts = {};
        this.clearSince = {};
        this.events = [];
        this.transits = [];
        this.readingsTotal = 0;
        this.pending = this.emptyPending();
        for (const slug of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"]){
            const m = META[slug];
            this.truth[slug] = {
                DO: m.do0,
                BOD: m.bod0,
                turb: m.turb0,
                sagState: 0,
                load: 0,
                idolsTotal: 0,
                idolsPerH: 0,
                crewUntil: 0,
                diverted: false
            };
            const series = {
                DO: [],
                BOD: [],
                turbidity: []
            };
            const values = {
                DO: null,
                BOD: null,
                COD: null,
                pH: null,
                turbidity: null,
                conductivity: null,
                TSS: null,
                temp: null
            };
            this.obs[slug] = {
                sensor: m.sensored ? "live" : "none",
                last_seen: null,
                values,
                as_of: {},
                series,
                bodMeasured: false,
                liveUntil: null,
                pendingLab: []
            };
            if (m.sensored) {
                // 60 min of pre-roll so sparklines are not empty at t0 (steady state, noise only).
                for(let k = 60; k >= 1; k--)this.sensorReading(slug, T_START - k * MIN, false);
                this.obs[slug].pendingLab.push({
                    due: T_START + 90 * MIN,
                    bod: 0,
                    cod: 0
                });
            }
        }
        this.resources = RES_DEF.map((r)=>({
                id: r.id,
                kind: r.kind,
                name: {
                    en: r.en,
                    hi: r.hi
                },
                at: "depot",
                status: "idle",
                target: null,
                eta_min: null,
                since: T_START
            }));
        for (const slug of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"])this.recompute(slug);
        this.evaluateAlerts(true);
        this.pending = this.emptyPending();
        this.pushEvent("control", null, {
            en: `Simulation reset: ${this.scenario.label.en}, start 15:00 IST.`,
            hi: `सिमुलेशन रीसेट: ${this.scenario.label.hi}, आरंभ 15:00 IST।`
        });
        this.computeSuggestions();
        this.sitrepVersion += 1;
        this.seq += 1;
    }
    // ---------- simulation ----------
    noise(sd) {
        // Box-Muller-lite: sum of uniforms
        return (this.rand() + this.rand() + this.rand() - 1.5) * sd * 1.15;
    }
    sensorReading(slug, t, record = true) {
        const tr = this.truth[slug];
        const m = META[slug];
        const o = this.obs[slug];
        if (this.rand() < 0.01 && record) return; // 1% dropout
        const DO = Math.max(0, r2(tr.DO + this.noise(0.12)));
        const turb = Math.max(0, r1(tr.turb * (1 + this.noise(0.05))));
        const ph = r2(m.ph0 + this.noise(0.05));
        const cond = Math.round(m.cond0 * (1 + this.noise(0.02)) + tr.idolsTotal * 0.02);
        o.values.DO = DO;
        o.values.turbidity = turb;
        o.values.pH = ph;
        o.values.conductivity = cond;
        o.values.temp = r1(26 + this.noise(0.2));
        o.values.TSS = r1(turb * 1.25);
        for (const p of [
            "DO",
            "turbidity",
            "pH",
            "conductivity",
            "temp",
            "TSS"
        ])o.as_of[p] = t;
        o.last_seen = t;
        this.pushPoint(slug, "DO", [
            t,
            DO
        ]);
        this.pushPoint(slug, "turbidity", [
            t,
            turb
        ]);
        if (record) this.readingsTotal += 1;
    }
    pushPoint(slug, p, pt) {
        const s = this.obs[slug].series[p];
        s.push(pt);
        const cut = pt[0] - KEEP_MIN * MIN;
        while(s.length && s[0][0] < cut)s.shift();
        const pend = this.pending.points[slug] ??= {};
        (pend[p] ??= []).push(pt);
    }
    stepMinute() {
        this.t += MIN;
        const params = this.scenario.params;
        const total = params.idols_total;
        const baseIntensity = total * profile(this.t) / PROFILE_SUM_PER_MIN; // idols this minute, city-wide
        for (const slug of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"]){
            const m = META[slug];
            const tr = this.truth[slug];
            let share = m.share;
            if (m.ngt) share = share * (params.lake_share / 0.15);
            if (tr.diverted) share *= 0.3;
            const lam = baseIntensity * share;
            const idols = Math.max(0, Math.round(lam + this.noise(Math.sqrt(Math.max(lam, 0.01)))));
            tr.idolsTotal += idols;
            tr.idolsPerH = tr.idolsPerH * (59 / 60) + idols; // ~ per-hour rolling sum
            const crew = this.t < tr.crewUntil ? 0.5 : 1;
            tr.load += idols * crew;
            // DO sag: first-order towards sag * idols/h, plus aerator recovery
            const aerators = this.resources.filter((r)=>r.kind === "aerator" && r.status === "working" && r.at === slug).length;
            const target = Math.min(m.do0 * 0.95, m.sag * tr.idolsPerH * crew);
            tr.sagState += (target - tr.sagState) * 0.03;
            const aerBoost = Math.min(2, aerators) * 0.035;
            tr.sagState = Math.max(-1.5, tr.sagState - aerBoost * (1 + tr.sagState * 0.2));
            tr.DO = Math.max(0, Math.min(9.5, m.do0 - tr.sagState));
            tr.BOD = m.bod0 + tr.load * 0.0028 * (m.sensored ? 1 : 1.5);
            tr.turb = m.turb0 + tr.idolsPerH * 0.12 + (this.rand() < 0.002 ? 20 : 0);
            const o = this.obs[slug];
            if (m.sensored) {
                this.sensorReading(slug, this.t);
                // lab BOD every 60 min, 30 min lag; first result after 90 min
                const minsIn = Math.round((this.t - T_START) / MIN);
                if (minsIn > 0 && minsIn % 60 === 0) o.pendingLab.push({
                    due: this.t + 30 * MIN,
                    bod: 0,
                    cod: 0
                });
            }
            for (const lab of o.pendingLab.filter((l)=>l.due <= this.t)){
                const bod = r1(tr.BOD * (1 + this.noise(0.08)));
                lab.bod = bod;
                o.values.BOD = bod;
                o.values.COD = r1(bod * 3.6 + 8);
                o.as_of.BOD = this.t;
                o.as_of.COD = this.t;
                o.bodMeasured = true;
                this.pushPoint(slug, "BOD", [
                    this.t,
                    bod
                ]);
                this.readingsTotal += 1;
            }
            o.pendingLab = o.pendingLab.filter((l)=>l.due > this.t);
            // staleness
            if (m.sensored) o.sensor = o.last_seen !== null && this.t - o.last_seen > 10 * MIN ? "stale" : "live";
            else if (o.liveUntil !== null) o.sensor = this.t <= o.liveUntil ? "live" : "stale";
        }
        this.advanceResources();
        for (const slug of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"])this.recompute(slug);
        this.evaluateAlerts(false);
    }
    advanceResources() {
        for (const tr of [
            ...this.transits
        ]){
            const res = this.resources.find((r)=>r.id === tr.resId);
            if (!res) continue;
            if (res.status === "en_route") {
                const left = Math.max(0, Math.round((tr.arrive - this.t) / MIN));
                res.eta_min = left;
                if (this.t >= tr.arrive) {
                    res.status = "working";
                    res.at = tr.ghat;
                    res.eta_min = null;
                    res.since = this.t;
                    this.pushEvent("arrival", tr.ghat, {
                        en: `${res.name.en} arrived at ${META[tr.ghat].name.en}.`,
                        hi: `${res.name.hi} ${META[tr.ghat].name.hi} पहुँचा।`
                    });
                    this.applyEffect(res, tr);
                }
            } else if (res.status === "working" && tr.workUntil !== null && this.t >= tr.workUntil) {
                res.status = "idle";
                res.target = null;
                res.since = this.t;
                this.transits = this.transits.filter((x)=>x !== tr);
            }
        }
    }
    applyEffect(res, tr) {
        const g = tr.ghat;
        const name = META[g].name;
        if (res.kind === "aerator") {
            this.pushEvent("effect", g, {
                en: `Aeration started at ${name.en}; DO expected to recover over 30–60 min.`,
                hi: `${name.hi} पर वायु-संचार शुरू; 30–60 मिनट में DO सुधरने की उम्मीद।`
            });
        } else if (res.kind === "crew") {
            this.truth[g].crewUntil = this.t + 120 * MIN;
            this.truth[g].load *= 0.4;
            tr.workUntil = this.t + 120 * MIN;
            this.pushEvent("effect", g, {
                en: `Nirmalya removal at ${name.en}; organic input halved for 2 h.`,
                hi: `${name.hi} पर निर्माल्य हटाया गया; 2 घंटे तक जैविक भार आधा।`
            });
        } else if (res.kind === "test_team") {
            const o = this.obs[g];
            const truth = this.truth[g];
            const m = META[g];
            const DO = Math.max(0, r2(truth.DO + this.noise(0.1)));
            const bod = r1(truth.BOD * (1 + this.noise(0.08)));
            o.values = {
                DO,
                BOD: bod,
                COD: r1(bod * 3.6 + 8),
                pH: r2(m.ph0 + this.noise(0.05)),
                turbidity: r1(truth.turb),
                conductivity: Math.round(m.cond0),
                TSS: r1(truth.turb * 1.25),
                temp: 26
            };
            for (const p of Object.keys(o.values))o.as_of[p] = this.t;
            o.last_seen = this.t;
            o.bodMeasured = true;
            this.pushPoint(g, "DO", [
                this.t,
                DO
            ]);
            this.pushPoint(g, "BOD", [
                this.t,
                bod
            ]);
            this.pushPoint(g, "turbidity", [
                this.t,
                r1(truth.turb)
            ]);
            this.readingsTotal += 8;
            if (!m.sensored) o.liveUntil = this.t + 120 * MIN;
            o.sensor = "live";
            tr.workUntil = this.t + 20 * MIN;
            this.pushEvent("effect", g, {
                en: `Lab reading at ${name.en}: DO ${DO} mg/l, BOD ${bod} mg/l.`,
                hi: `${name.hi} पर लैब माप: DO ${DO} mg/l, BOD ${bod} mg/l।`
            });
        } else {
            this.truth[g].diverted = true;
            this.pushEvent("effect", g, {
                en: `Diversion active at ${name.en}: 70% of arrivals routed to the nearest kund.`,
                hi: `${name.hi} पर डायवर्जन: 70% मूर्तियाँ निकटतम कुंड भेजी गईं।`
            });
        }
    }
    windowOf(pts) {
        if (!pts.length) return null;
        const now = pts[pts.length - 1][0];
        const inLast = (m)=>pts.filter((p)=>p[0] > now - m * MIN).map((p)=>p[1]);
        const mean = (a)=>a.length ? a.reduce((s, v)=>s + v, 0) / a.length : null;
        const last30 = pts.filter((p)=>p[0] > now - 30 * MIN);
        let slope = null;
        if (last30.length >= 5) {
            const xs = last30.map((p)=>(p[0] - now) / (60 * MIN));
            const ys = last30.map((p)=>p[1]);
            const mx = xs.reduce((s, v)=>s + v, 0) / xs.length;
            const my = ys.reduce((s, v)=>s + v, 0) / ys.length;
            let num = 0;
            let den = 0;
            xs.forEach((x, i)=>{
                num += (x - mx) * (ys[i] - my);
                den += (x - mx) ** 2;
            });
            slope = den > 0 ? r2(num / den) : null;
        }
        const l60 = inLast(60);
        const m5 = mean(inLast(5));
        const m30 = mean(inLast(30));
        return {
            mean_5: m5 === null ? null : r2(m5),
            mean_30: m30 === null ? null : r2(m30),
            slope_per_h: slope,
            min_60: l60.length ? Math.min(...l60) : null,
            max_60: l60.length ? Math.max(...l60) : null
        };
    }
    recompute(slug) {
        const m = META[slug];
        const o = this.obs[slug];
        const tr = this.truth[slug];
        const rk = this.ranking?.ghats.find((g)=>g.slug === slug);
        const continuous = m.sensored && o.sensor !== "none";
        const doW = continuous ? this.windowOf(o.series.DO) : null;
        const tuW = continuous ? this.windowOf(o.series.turbidity) : null;
        const doNow = doW?.mean_5 ?? o.values.DO;
        const bod = o.values.BOD;
        let tier;
        let note;
        let score = null;
        let partial = false;
        if (o.sensor === "none" || o.sensor === "stale" || doNow === null) {
            tier = "no_data";
            note = o.sensor === "stale" ? {
                en: "Last lab reading is old; send a test team",
                hi: "अंतिम लैब माप पुराना; जाँच दल भेजें"
            } : {
                en: "No live sensor; status unknown, not clean",
                hi: "लाइव सेंसर नहीं; स्थिति अज्ञात, साफ़ नहीं"
            };
        } else {
            const parts = [
                [
                    0.45,
                    Math.max(0, Math.min(1, (5 - doNow) / 5))
                ]
            ];
            if (bod !== null) parts.push([
                0.4,
                Math.max(0, Math.min(1, (bod - 3) / 3))
            ]);
            else partial = true;
            const ph = o.values.pH;
            if (ph !== null) parts.push([
                0.15,
                ph < 6.5 || ph > 8.5 ? 1 : 0
            ]);
            const wsum = parts.reduce((s, p)=>s + p[0], 0);
            score = r2(parts.reduce((s, p)=>s + p[0] * p[1], 0) / wsum);
            if (doNow < 2 || doNow === 0) tier = "critical";
            else if (doNow < 3 || score >= 0.45) tier = "high";
            else if (score >= 0.25 || bod !== null && bod > 6) tier = "medium";
            else tier = "low";
            if (!o.bodMeasured && doNow >= 5 && (tier === "low" || tier === "medium")) {
                tier = "medium";
                note = {
                    en: "DO within limit, BOD not yet measured",
                    hi: "DO सीमा में, BOD अभी मापा नहीं गया"
                };
            } else if (tier === "critical") note = {
                en: "DO below 2 mg/l",
                hi: "DO 2 mg/l से कम"
            };
            else if (tier === "high") note = doNow < 5 ? {
                en: "DO below the 5 mg/l limit",
                hi: "DO 5 mg/l सीमा से कम"
            } : {
                en: "BOD above limit",
                hi: "BOD सीमा से अधिक"
            };
            else if (tier === "medium") note = {
                en: "Close to limits; watch",
                hi: "सीमा के पास; निगरानी रखें"
            };
            else note = {
                en: "Within class B limits",
                hi: "श्रेणी B सीमा में"
            };
        }
        const slope = doW?.slope_per_h ?? null;
        const etaTo = (lvl)=>doNow !== null && slope !== null && slope < -0.05 && doNow > lvl ? Math.round((doNow - lvl) / -slope * 60) : null;
        const resOn = this.resources.filter((r)=>r.at === slug && r.status === "working").map((r)=>r.id);
        const open = Object.values(this.alerts).filter((a)=>a.ghat === slug && a.state !== "resolved").map((a)=>a.id);
        this.ghats[slug] = {
            slug,
            name: rk?.name ?? m.name,
            water_body: rk?.water_body ?? m.water_body,
            ngt_lake_ban: rk?.ngt_lake_ban ?? m.ngt,
            sensor: o.sensor,
            last_seen: o.last_seen,
            live_tier: tier,
            live_score: score,
            partial,
            tier_note: note,
            breach: {
                DO: doNow === null ? null : doNow < 5,
                BOD: bod === null ? null : bod > 3,
                pH: o.values.pH === null ? null : o.values.pH < 6.5 || o.values.pH > 8.5
            },
            values: {
                ...o.values
            },
            as_of: {
                ...o.as_of
            },
            windows: {
                DO: doW,
                turbidity: tuW
            },
            eta: {
                do_5: etaTo(5),
                do_3: etaTo(3),
                do_0: etaTo(0)
            },
            p_breach: rk?.forecast?.p_breach ?? null,
            anomaly: [],
            idols_per_h: Math.round(tr.idolsPerH),
            idols_total: tr.idolsTotal,
            resources_on_site: resOn,
            open_alerts: open,
            initial_source: m.source,
            simulated: true
        };
    }
    // ---------- alerts ----------
    upsertAlert(ghat, code, severity, text, speak, values, recommended, baselineRun) {
        const key = `${ghat}:${code}`;
        delete this.clearSince[key];
        const cur = this.alerts[key];
        const rank = {
            info: 0,
            warn: 1,
            high: 2,
            critical: 3
        };
        if (cur && cur.state !== "resolved") {
            if (rank[severity] > rank[cur.severity]) {
                const next = {
                    ...cur,
                    severity,
                    text,
                    speak,
                    values,
                    t_update: this.t,
                    state: "open",
                    baseline: false
                };
                this.alerts[key] = next;
                this.pending.upsert.set(next.id, next);
            }
            return;
        }
        const a = {
            id: this.nid(`al-${ghat}-${code}`),
            t_open: this.t,
            t_update: this.t,
            ghat,
            code,
            severity,
            text,
            speak,
            values,
            recommended,
            state: "open",
            baseline: baselineRun
        };
        if (baselineRun && code !== "NO_SENSOR") {
            a.text = {
                en: `${text.en} Already below the limit before immersion (Durga 2025 pre, MPPCB 2025 p. 64/65).`,
                hi: `${text.hi} विसर्जन से पहले ही सीमा से कम था (दुर्गा 2025 पूर्व, MPPCB 2025 पृ. 64/65)।`
            };
        }
        this.alerts[key] = a;
        this.pending.upsert.set(a.id, a);
    }
    clearAlert(ghat, code) {
        const key = `${ghat}:${code}`;
        const cur = this.alerts[key];
        if (!cur || cur.state === "resolved") return;
        const since = this.clearSince[key] ??= this.t;
        if (this.t - since >= 15 * MIN) {
            cur.state = "resolved";
            this.pending.resolved.push(cur.id);
            delete this.alerts[key];
            delete this.clearSince[key];
        }
    }
    evaluateAlerts(baseline) {
        for (const slug of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"]){
            const g = this.ghats[slug];
            const n = g.name;
            if (g.sensor === "none") {
                this.upsertAlert(slug, "NO_SENSOR", "info", {
                    en: `${n.en}: no live sensor. Status unknown, not clean.`,
                    hi: `${n.hi}: लाइव सेंसर नहीं। स्थिति अज्ञात, साफ़ नहीं।`
                }, {
                    en: `${n.en} has no live data.`,
                    hi: `${n.hi} का लाइव डेटा नहीं है।`
                }, {}, [
                    "test_team"
                ], baseline);
            } else this.clearAlert(slug, "NO_SENSOR");
            const DO = g.windows.DO?.mean_5 ?? (g.sensor === "live" ? g.values.DO : null);
            if (DO !== null && DO < 5) {
                const sev = DO < 1 ? "critical" : DO < 3 ? "high" : "warn";
                const d = r1(DO);
                this.upsertAlert(slug, "DO_LOW", sev, {
                    en: `${n.en}: dissolved oxygen ${d} mg/l, below the 5 mg/l limit.`,
                    hi: `${n.hi}: घुलित ऑक्सीजन ${d} mg/l, 5 mg/l सीमा से कम।`
                }, {
                    en: `${n.en}. Dissolved oxygen ${d}. Below limit.`,
                    hi: `${n.hi}। घुलित ऑक्सीजन ${d}। सीमा से कम।`
                }, {
                    DO: d
                }, [
                    "aerator"
                ], baseline);
            } else if (DO !== null && DO >= 5.5) this.clearAlert(slug, "DO_LOW");
            const eta = g.eta.do_5;
            if (DO !== null && DO >= 5 && eta !== null && eta <= 60) {
                this.upsertAlert(slug, "DO_ETA_60", "high", {
                    en: `${n.en}: DO projected to fall below 5 mg/l in about ${eta} min.`,
                    hi: `${n.hi}: लगभग ${eta} मिनट में DO 5 mg/l से नीचे जाने का अनुमान।`
                }, {
                    en: `${n.en}. Oxygen will cross the limit in about ${eta} minutes.`,
                    hi: `${n.hi}। लगभग ${eta} मिनट में ऑक्सीजन सीमा से नीचे जाएगी।`
                }, {
                    DO: r1(DO),
                    eta_min: eta
                }, [
                    "aerator"
                ], baseline);
            } else this.clearAlert(slug, "DO_ETA_60");
            const slope = g.windows.DO?.slope_per_h ?? null;
            if (DO !== null && slope !== null && slope <= -1 && DO < 6.5) {
                const s = r1(slope);
                this.upsertAlert(slug, "DO_FALLING_FAST", "warn", {
                    en: `${n.en}: DO falling fast, ${s} mg/l per hour.`,
                    hi: `${n.hi}: DO तेज़ी से गिर रहा, ${s} mg/l प्रति घंटा।`
                }, {
                    en: `${n.en}. Oxygen falling fast.`,
                    hi: `${n.hi}। ऑक्सीजन तेज़ी से गिर रही है।`
                }, {
                    slope_per_h: s
                }, [
                    "aerator",
                    "crew"
                ], baseline);
            } else if (slope === null || slope > -0.5) this.clearAlert(slug, "DO_FALLING_FAST");
            const bod = g.values.BOD;
            if (bod !== null && bod > 3) {
                const sev = bod > 8 ? "high" : "warn";
                this.upsertAlert(slug, "BOD_HIGH", sev, {
                    en: `${n.en}: lab BOD ${bod} mg/l, above the 3 mg/l limit.`,
                    hi: `${n.hi}: लैब BOD ${bod} mg/l, 3 mg/l सीमा से अधिक।`
                }, {
                    en: `${n.en}. Lab BOD ${Math.round(bod)}. Above limit.`,
                    hi: `${n.hi}। लैब बीओडी ${Math.round(bod)}। सीमा से अधिक।`
                }, {
                    BOD: bod
                }, [
                    "crew"
                ], baseline);
            } else if (bod !== null && bod <= 2.7) this.clearAlert(slug, "BOD_HIGH");
        }
        for (const slug of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"]){
            this.ghats[slug].open_alerts = Object.values(this.alerts).filter((a)=>a.ghat === slug && a.state !== "resolved").map((a)=>a.id);
        }
        if (this.pending.upsert.size || this.pending.resolved.length) this.computeSuggestions();
    }
    // ---------- dispatch / suggestions ----------
    computeSuggestions() {
        const items = [];
        const idleKinds = new Set(this.resources.filter((r)=>r.status === "idle").map((r)=>r.kind));
        const busyAt = (slug, kind)=>this.resources.some((r)=>r.kind === kind && r.status !== "idle" && (r.at === slug || r.target === slug));
        for (const slug of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"]){
            const g = this.ghats[slug];
            const tm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["travelMin"])("depot", slug);
            const add = (kind, q, en, hi)=>{
                if (!idleKinds.has(kind) || busyAt(slug, kind)) return;
                items.push({
                    id: this.nid("sg"),
                    kind,
                    ghat: slug,
                    q_gain: r2(q),
                    travel_min: tm,
                    rank_score: r2(q - 0.02 * tm),
                    reason: {
                        en: `${en} Experimental (heuristic, demo generator).`,
                        hi: `${hi} प्रायोगिक (नियम-आधारित, डेमो जनरेटर)।`
                    },
                    experimental: true
                });
            };
            if (g.sensor !== "live") add("test_team", 1.6, `${g.name.en}: no live data; a lab reading reveals the real state.`, `${g.name.hi}: लाइव डेटा नहीं; लैब माप से असली स्थिति पता चलेगी।`);
            const DO = g.windows.DO?.mean_5 ?? g.values.DO;
            if (g.sensor === "live" && DO !== null && DO < 5.5) add("aerator", 1.2 + (5.5 - DO) * 0.25, `${g.name.en}: DO ${r1(DO)} mg/l and falling with arrivals.`, `${g.name.hi}: DO ${r1(DO)} mg/l, आगमन के साथ गिर रहा।`);
            if (g.idols_per_h > 60 && (g.values.BOD ?? 0) > 3) add("crew", 0.6 + g.idols_per_h / 500, `${g.name.en}: ${g.idols_per_h} idols/h; nirmalya load rising.`, `${g.name.hi}: ${g.idols_per_h} मूर्ति/घंटा; निर्माल्य भार बढ़ रहा।`);
            if (g.ngt_lake_ban && g.idols_per_h > 20 && !this.truth[slug].diverted) add("diversion", 0.5, `${g.name.en}: arrivals at an NGT-ban lake ghat.`, `${g.name.hi}: NGT रोक वाले झील घाट पर आगमन।`);
        }
        items.sort((a, b)=>b.rank_score - a.rank_score);
        this.suggestions = items.slice(0, 5);
        this.suggestionsVersion += 1;
    }
    pushEvent(kind, ghat, text) {
        const e = {
            id: this.nid("ev"),
            t: this.t,
            kind,
            ghat,
            text
        };
        this.events.push(e);
        if (this.events.length > 200) this.events.shift();
        this.pending.events.push(e);
        this.sitrepVersion += 1;
    }
    // ---------- public API (mirrors REST) ----------
    subscribe(fn) {
        this.listeners.add(fn);
        return ()=>this.listeners.delete(fn);
    }
    start() {
        if (this.timer) return;
        this.emit({
            type: "snapshot",
            seq: this.seq,
            state: this.snapshot()
        });
        this.timer = setInterval(()=>this.tick(), 1000);
    }
    stop() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    }
    emit(msg) {
        this.listeners.forEach((f)=>f(msg));
    }
    tick() {
        if (this.running && this.t < T_START + HORIZON_MIN * MIN) {
            this.fracMin += this.speed / 60;
            let steps = Math.floor(this.fracMin);
            this.fracMin -= steps;
            while(steps-- > 0 && this.t < T_START + HORIZON_MIN * MIN)this.stepMinute();
        }
        this.seq += 1;
        const ghats = {};
        for (const s of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"])ghats[s] = {
            ...this.ghats[s]
        };
        const msg = {
            type: "tick",
            seq: this.seq,
            t: this.t,
            speed: this.speed,
            running: this.running,
            scenario: this.scenario,
            ghats,
            points: this.pending.points,
            resources: this.resources.map((r)=>({
                    ...r
                })),
            alerts_upsert: [
                ...this.pending.upsert.values()
            ].map((a)=>({
                    ...a
                })),
            alerts_resolved: [
                ...this.pending.resolved
            ],
            events: [
                ...this.pending.events
            ],
            suggestions_version: this.suggestionsVersion,
            sitrep_version: this.sitrepVersion
        };
        this.pending = this.emptyPending();
        this.emit(msg);
    }
    snapshot() {
        const ghats = {};
        const cut = this.t - 120 * MIN;
        for (const s of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"]){
            const ser = this.obs[s].series;
            ghats[s] = {
                ...this.ghats[s],
                series: {
                    DO: ser.DO.filter((p)=>p[0] >= cut),
                    BOD: ser.BOD.filter((p)=>p[0] >= cut),
                    turbidity: ser.turbidity.filter((p)=>p[0] >= cut)
                }
            };
        }
        return {
            seq: this.seq,
            t: this.t,
            t_start: T_START,
            speed: this.speed,
            running: this.running,
            scenario: this.scenario,
            source: "sim",
            ghats,
            resources: this.resources.map((r)=>({
                    ...r
                })),
            alerts_open: Object.values(this.alerts).map((a)=>({
                    ...a
                })),
            events_recent: this.events.slice(-50),
            suggestions: this.suggestions,
            suggestions_version: this.suggestionsVersion,
            sitrep_version: this.sitrepVersion,
            stats: {
                idols_total: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"].reduce((s, g)=>s + this.truth[g].idolsTotal, 0),
                idols_by_ghat: Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"].map((g)=>[
                        g,
                        this.truth[g].idolsTotal
                    ])),
                readings_total: this.readingsTotal,
                rejected_total: 0
            }
        };
    }
    lite() {
        return {
            seq: this.seq,
            t: this.t,
            speed: this.speed,
            running: this.running,
            scenario: this.scenario
        };
    }
    /** Re-emit a fresh snapshot (used after reset/scenario so clients re-baseline). */ resnap() {
        this.emit({
            type: "snapshot",
            seq: this.seq,
            state: this.snapshot()
        });
    }
    control(req) {
        if (req.action === "start") this.running = true;
        else if (req.action === "pause") this.running = false;
        else if (req.action === "speed" && typeof req.value === "number" && [
            1,
            60,
            180,
            600
        ].includes(req.value)) this.speed = req.value;
        else if (req.action === "reset") {
            this.reset();
            this.resnap();
            return this.lite();
        } else if (req.action === "scenario") {
            const sc = SCENARIOS.find((s)=>s.name === req.value);
            if (sc) {
                this.scenario = sc;
                this.reset();
                this.resnap();
                return this.lite();
            }
        }
        if (req.action === "start" || req.action === "pause" || req.action === "speed") {
            const v = req.action === "speed" ? `${this.speed}×` : req.action === "start" ? "running" : "paused";
            const vh = req.action === "speed" ? `${this.speed}×` : req.action === "start" ? "चालू" : "रुका";
            this.pushEvent("control", null, {
                en: `Simulation ${req.action === "speed" ? "speed " : ""}${v}.`,
                hi: `सिमुलेशन ${req.action === "speed" ? "गति " : ""}${vh}।`
            });
        }
        return this.lite();
    }
    scenarios() {
        return SCENARIOS;
    }
    dispatch(req) {
        if (!META[req.ghat]) return {
            ok: false,
            error: {
                en: "Unknown ghat.",
                hi: "अज्ञात घाट।"
            }
        };
        const idle = this.resources.filter((r)=>r.kind === req.kind && r.status === "idle");
        if (!idle.length) return {
            ok: false,
            error: {
                en: `No idle ${KIND_NAME[req.kind].en} available.`,
                hi: `कोई खाली ${KIND_NAME[req.kind].hi} उपलब्ध नहीं।`
            }
        };
        idle.sort((a, b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["travelMin"])(a.at, req.ghat) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["travelMin"])(b.at, req.ghat));
        const res = idle[0];
        const eta = res.at === req.ghat ? 5 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["travelMin"])(res.at, req.ghat);
        res.status = "en_route";
        res.target = req.ghat;
        res.eta_min = eta;
        res.since = this.t;
        const tr = {
            resId: res.id,
            ghat: req.ghat,
            arrive: this.t + eta * MIN,
            workUntil: null
        };
        this.transits = this.transits.filter((x)=>x.resId !== res.id);
        this.transits.push(tr);
        const n = META[req.ghat].name;
        this.pushEvent("dispatch", req.ghat, {
            en: `${res.name.en} dispatched to ${n.en}, ETA ${eta} min.`,
            hi: `${res.name.hi} ${n.hi} भेजा गया, ${eta} मिनट में पहुँचेगा।`
        });
        this.computeSuggestions();
        return {
            ok: true,
            order: {
                id: this.nid("ord"),
                resource_id: res.id,
                kind: req.kind,
                ghat: req.ghat,
                eta_min: eta
            }
        };
    }
    ack(alertId) {
        const a = Object.values(this.alerts).find((x)=>x.id === alertId);
        if (!a) return {
            ok: false
        };
        a.state = "acked";
        a.t_update = this.t;
        this.pending.upsert.set(a.id, {
            ...a
        });
        return {
            ok: true
        };
    }
    getSuggestions() {
        return {
            version: this.suggestionsVersion,
            items: this.suggestions
        };
    }
    sitrep() {
        const fmtT = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(this.t);
        const order = [
            "critical",
            "high",
            "no_data",
            "medium",
            "low"
        ];
        const gs = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"].map((s)=>this.ghats[s]).sort((a, b)=>order.indexOf(a.live_tier) - order.indexOf(b.live_tier));
        const tierEn = {
            critical: "CRITICAL",
            high: "HIGH",
            medium: "MEDIUM",
            low: "LOW",
            no_data: "NO LIVE DATA"
        };
        const tierHi = {
            critical: "गंभीर",
            high: "उच्च",
            medium: "मध्यम",
            low: "कम",
            no_data: "लाइव डेटा नहीं"
        };
        const open = Object.values(this.alerts).filter((a)=>a.state !== "resolved");
        const cnt = (s)=>open.filter((a)=>a.severity === s).length;
        const deployed = this.resources.filter((r)=>r.status !== "idle");
        const lineEn = (g)=>{
            const v = g.values;
            if (g.sensor === "none") return `- **${g.name.en}**: ${tierEn[g.live_tier]}. No live data; status unknown, not clean.`;
            const eta = g.eta.do_5 !== null ? `, DO < 5 in ~${g.eta.do_5} min` : "";
            return `- **${g.name.en}**: ${tierEn[g.live_tier]}. DO ${v.DO ?? "n/a"} mg/l, BOD ${v.BOD ?? "awaiting lab"}${eta}. Resources on site: ${g.resources_on_site.length}.`;
        };
        const lineHi = (g)=>{
            const v = g.values;
            if (g.sensor === "none") return `- **${g.name.hi}**: ${tierHi[g.live_tier]}। लाइव डेटा नहीं; स्थिति अज्ञात, साफ़ नहीं।`;
            const eta = g.eta.do_5 !== null ? `, लगभग ${g.eta.do_5} मिनट में DO < 5` : "";
            return `- **${g.name.hi}**: ${tierHi[g.live_tier]}। DO ${v.DO ?? "उपलब्ध नहीं"} mg/l, BOD ${v.BOD ?? "लैब प्रतीक्षा"}${eta}। मौके पर संसाधन: ${g.resources_on_site.length}।`;
        };
        const banEn = gs.filter((g)=>g.ngt_lake_ban && g.idols_total > 0).map((g)=>`${g.name.en} ${g.idols_total}`).join(", ");
        const banHi = gs.filter((g)=>g.ngt_lake_ban && g.idols_total > 0).map((g)=>`${g.name.hi} ${g.idols_total}`).join(", ");
        const en = [
            `# Situation report, ${fmtT} IST (SIMULATED)`,
            `Scenario: ${this.scenario.label.en}. Speed ${this.speed}×. Idols so far: ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"].reduce((s, g)=>s + this.truth[g].idolsTotal, 0)}.`,
            `Open alerts: ${cnt("critical")} critical, ${cnt("high")} high, ${cnt("warn")} warn, ${cnt("info")} info.`,
            "## Ghats",
            ...gs.map(lineEn),
            "## Resources",
            deployed.length ? deployed.map((r)=>`- ${r.name.en}: ${r.status === "en_route" ? `en route to ${META[r.target ?? ""]?.name.en ?? r.target}, ETA ${r.eta_min} min` : `working at ${META[r.at]?.name.en ?? r.at}`}`).join("\n") : "- All units at depot.",
            banEn ? `## NGT lake ban\nArrivals at lake ghats under the ban: ${banEn}.` : "",
            `Next review: ${new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }).format(this.t + 30 * MIN)} IST.`
        ].filter(Boolean).join("\n\n");
        const hi = [
            `# स्थिति रिपोर्ट, ${fmtT} IST (सिमुलेटेड)`,
            `परिदृश्य: ${this.scenario.label.hi}। गति ${this.speed}×। अब तक मूर्तियाँ: ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"].reduce((s, g)=>s + this.truth[g].idolsTotal, 0)}।`,
            `खुले अलर्ट: ${cnt("critical")} गंभीर, ${cnt("high")} उच्च, ${cnt("warn")} चेतावनी, ${cnt("info")} सूचना।`,
            "## घाट",
            ...gs.map(lineHi),
            "## संसाधन",
            deployed.length ? deployed.map((r)=>`- ${r.name.hi}: ${r.status === "en_route" ? `${META[r.target ?? ""]?.name.hi ?? r.target} की ओर, ${r.eta_min} मिनट` : `${META[r.at]?.name.hi ?? r.at} पर कार्यरत`}`).join("\n") : "- सभी इकाइयाँ डिपो पर।",
            banHi ? `## NGT झील रोक\nरोक वाले झील घाटों पर आगमन: ${banHi}।` : ""
        ].filter(Boolean).join("\n\n");
        const worst = gs.filter((g)=>g.live_tier === "critical" || g.live_tier === "high");
        const speakEn = [
            `Situation at ${fmtT}.`,
            `${cnt("critical")} critical and ${cnt("high")} high alerts open.`,
            ...worst.slice(0, 4).map((g)=>`${g.name.en.split(" /")[0]}: dissolved oxygen ${g.values.DO !== null ? Math.round(g.values.DO * 10) / 10 : "unknown"}.`),
            `${gs.filter((g)=>g.sensor !== "live").length} ghats have no live data.`,
            `${deployed.length} units deployed.`
        ].join(" ");
        const speakHi = [
            `${fmtT} की स्थिति।`,
            `${cnt("critical")} गंभीर और ${cnt("high")} उच्च अलर्ट खुले हैं।`,
            ...worst.slice(0, 4).map((g)=>`${g.name.hi.split(" /")[0]}: घुलित ऑक्सीजन ${g.values.DO !== null ? Math.round(g.values.DO * 10) / 10 : "अज्ञात"}।`),
            `${gs.filter((g)=>g.sensor !== "live").length} घाटों का लाइव डेटा नहीं है।`,
            `${deployed.length} इकाइयाँ तैनात।`
        ].join(" ");
        return {
            version: this.sitrepVersion,
            t: this.t,
            markdown: {
                en,
                hi
            },
            speak: {
                en: speakEn,
                hi: speakHi
            }
        };
    }
    history(slug, param, minutes) {
        const s = this.obs[slug]?.series[param] ?? [];
        return s.filter((p)=>p[0] >= this.t - minutes * MIN);
    }
    command(text, lang) {
        return parseCommand(text, lang, this);
    }
    ghatStatusLine(slug) {
        const g = this.ghats[slug];
        if (!g) return {
            en: "Unknown ghat.",
            hi: "अज्ञात घाट।"
        };
        if (g.sensor === "none") return {
            en: `${g.name.en}: no live data. Send a test team.`,
            hi: `${g.name.hi}: लाइव डेटा नहीं। जाँच दल भेजें।`
        };
        const DO = g.values.DO !== null ? r1(g.values.DO) : null;
        const bodEn = g.values.BOD !== null ? `BOD ${r1(g.values.BOD)}` : "BOD awaiting lab";
        const bodHi = g.values.BOD !== null ? `बीओडी ${r1(g.values.BOD)}` : "बीओडी लैब प्रतीक्षा";
        return {
            en: `${g.name.en}: dissolved oxygen ${DO ?? "unknown"}, ${bodEn}. Tier ${g.live_tier.replace("_", " ")}.`,
            hi: `${g.name.hi}: घुलित ऑक्सीजन ${DO ?? "अज्ञात"}, ${bodHi}।`
        };
    }
    allStatus() {
        const gs = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_ORDER"].map((s)=>this.ghats[s]);
        const bad = gs.filter((g)=>g.live_tier === "critical" || g.live_tier === "high");
        const nd = gs.filter((g)=>g.live_tier === "no_data");
        return {
            en: `${bad.length} ghats critical or high: ${bad.map((g)=>g.name.en.split(" /")[0]).join(", ") || "none"}. ${nd.length} with no live data.`,
            hi: `${bad.length} घाट गंभीर या उच्च: ${bad.map((g)=>g.name.hi.split(" /")[0]).join(", ") || "कोई नहीं"}। ${nd.length} का लाइव डेटा नहीं।`
        };
    }
}
// ---------- command parser (6 intents, en + hi) ----------
const ALIASES = [
    [
        "bairagarh",
        [
            "bairagarh",
            "bairagadh",
            "sant hirdaram",
            "बैरागढ़",
            "बैरागढ"
        ]
    ],
    [
        "shahpura",
        [
            "shahpura",
            "शाहपुरा"
        ]
    ],
    [
        "rani-kamlapati",
        [
            "rani kamlapati",
            "kamlapati",
            "kamla park",
            "रानी कमलापति",
            "कमलापति",
            "कमला पार्क"
        ]
    ],
    [
        "khatlapura",
        [
            "khatlapura",
            "खटलापुरा"
        ]
    ],
    [
        "prempura",
        [
            "prempura",
            "प्रेमपुरा"
        ]
    ],
    [
        "hathaikheda",
        [
            "hathaikheda",
            "hathai kheda",
            "हथाईखेड़ा",
            "हथाईखेडा"
        ]
    ],
    [
        "malikhedi",
        [
            "malikhedi",
            "mali khedi",
            "मालीखेड़ी",
            "मालीखेडी"
        ]
    ]
];
function findGhat(text) {
    const s = text.toLowerCase();
    for (const [slug, al] of ALIASES)if (al.some((a)=>s.includes(a))) return slug;
    return null;
}
function findKind(s) {
    if (/aerator|aerat|एरेटर|वायु/.test(s)) return "aerator";
    if (/test|जाँच|जांच/.test(s)) return "test_team";
    if (/crew|clean|सफाई|दल/.test(s)) return "crew";
    if (/divert|diversion|डायवर्ज/.test(s)) return "diversion";
    return null;
}
function parseCommand(text, _lang, sim) {
    const s = text.toLowerCase().trim();
    const none = {
        type: "none"
    };
    if (!s || /^(help|मदद|सहायता)/.test(s)) {
        return {
            intent: "help",
            args: {},
            ok: true,
            speak: {
                en: "Say: status Shahpura, status all, read sitrep, send aerator to Shahpura, pause, or start.",
                hi: "बोलें: शाहपुरा की स्थिति, सभी की स्थिति, रिपोर्ट पढ़ो, शाहपुरा एरेटर भेजो, रोको, या चालू करो।"
            },
            ui_action: none
        };
    }
    if (/^(send|dispatch)\b|भेज/.test(s)) {
        const kind = findKind(s);
        const ghat = findGhat(s);
        if (!kind || !ghat) return {
            intent: "send",
            args: {
                kind,
                ghat
            },
            ok: false,
            speak: {
                en: "Say which unit and which ghat, for example: send aerator to Shahpura.",
                hi: "इकाई और घाट बताएं, जैसे: शाहपुरा एरेटर भेजो।"
            },
            ui_action: none
        };
        const r = sim.dispatch({
            kind,
            ghat
        });
        if (!r.ok) return {
            intent: "send",
            args: {
                kind,
                ghat
            },
            ok: false,
            speak: r.error ?? {
                en: "Dispatch failed.",
                hi: "भेजना विफल।"
            },
            ui_action: none
        };
        return {
            intent: "send",
            args: {
                kind,
                ghat
            },
            ok: true,
            speak: {
                en: `${KIND_NAME[kind].en} sent to ${META[ghat].name.en.split(" /")[0]}. Arrives in ${r.order?.eta_min} minutes.`,
                hi: `${KIND_NAME[kind].hi} ${META[ghat].name.hi.split(" /")[0]} भेजा गया। ${r.order?.eta_min} मिनट में पहुँचेगा।`
            },
            ui_action: {
                type: "select_ghat",
                value: ghat
            }
        };
    }
    if (/sitrep|situation|report|रिपोर्ट|स्थिति रिपोर्ट/.test(s)) {
        return {
            intent: "read_sitrep",
            args: {},
            ok: true,
            speak: sim.sitrep().speak,
            ui_action: {
                type: "open_tab",
                value: "sitrep"
            }
        };
    }
    if (/^(pause|stop)\b|रोको|रोकें|रोक दो/.test(s)) {
        sim.control({
            action: "pause"
        });
        return {
            intent: "pause",
            args: {},
            ok: true,
            speak: {
                en: "Simulation paused.",
                hi: "सिमुलेशन रोका गया।"
            },
            ui_action: {
                type: "control",
                value: "pause"
            }
        };
    }
    if (/^(start|resume|play)\b|चालू|शुरू/.test(s)) {
        sim.control({
            action: "start"
        });
        return {
            intent: "start",
            args: {},
            ok: true,
            speak: {
                en: "Simulation running.",
                hi: "सिमुलेशन चालू।"
            },
            ui_action: {
                type: "control",
                value: "start"
            }
        };
    }
    if (/status|स्थिति|हाल/.test(s) || findGhat(s)) {
        const ghat = findGhat(s);
        if (ghat) return {
            intent: "status",
            args: {
                ghat
            },
            ok: true,
            speak: sim.ghatStatusLine(ghat),
            ui_action: {
                type: "select_ghat",
                value: ghat
            }
        };
        if (/all|सभी|सब/.test(s)) return {
            intent: "status_all",
            args: {},
            ok: true,
            speak: sim.allStatus(),
            ui_action: none
        };
    }
    return {
        intent: "unknown",
        args: {},
        ok: false,
        speak: {
            en: "Not understood. Say help for the list of commands.",
            hi: "समझ नहीं आया। आदेशों की सूची के लिए मदद बोलें।"
        },
        ui_action: none
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/useLive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLive",
    ()=>useLive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useLive(load, initial, deps = []) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        data: initial,
        source: initial ? "static" : null,
        error: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLive.useEffect": ()=>{
            let alive = true;
            load().then({
                "useLive.useEffect": (r)=>alive && setState({
                        data: r.data,
                        source: r.source,
                        error: false
                    })
            }["useLive.useEffect"]).catch({
                "useLive.useEffect": ()=>alive && setState({
                        "useLive.useEffect": (s)=>({
                                ...s,
                                error: !s.data
                            })
                    }["useLive.useEffect"])
            }["useLive.useEffect"]);
            return ({
                "useLive.useEffect": ()=>{
                    alive = false;
                }
            })["useLive.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useLive.useEffect"], deps);
    return state;
}
_s(useLive, "DQ0t2vFTSW+3AxUBh2SaIzhpBg8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/voice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Voice out (amendment F). Create inside useEffect; call dispose() in cleanup.
// - "Enable voice" speaks a confirmation (Chrome user-activation requirement).
// - Voice picked on voiceschanged: hi* in Hindi mode, else en-IN, else en-GB/en-US.
//   No Hindi voice in Hindi mode -> English text, flag hindiMissing.
// - Sentences split < 200 chars. Priority queue: critical cancels and interrupts; max 3 queued;
//   items older than 20 s are dropped. Baseline alerts and snapshot content are never announced
//   (the caller only passes alerts that arrived in ticks; announce() also drops baseline).
__turbopack_context__.s([
    "VoiceOut",
    ()=>VoiceOut,
    "splitSentences",
    ()=>splitSentences
]);
const MUTE_KEY = "ghatwatch.voice.muted";
const LEVEL_KEY = "ghatwatch.voice.level";
const MAX_QUEUE = 3;
const MAX_AGE_MS = 20_000;
function splitSentences(text, max = 200) {
    const parts = text.replace(/\s+/g, " ").split(/(?<=[.!?।])\s+/).map((s)=>s.trim()).filter(Boolean);
    const out = [];
    for (const p of parts){
        if (p.length < max) {
            out.push(p);
            continue;
        }
        let cur = "";
        for (const w of p.split(/(?<=[,;:])\s+|\s+/)){
            if ((cur + " " + w).trim().length >= max) {
                if (cur) out.push(cur);
                cur = w;
            } else cur = (cur + " " + w).trim();
        }
        if (cur) out.push(cur);
    }
    return out;
}
function levelAllows(level, sev) {
    if (level === "off") return false;
    if (level === "all") return true;
    if (level === "high") return sev === "high" || sev === "critical";
    return sev === "critical";
}
class VoiceOut {
    synth;
    voices = [];
    queue = [];
    current = null;
    listeners = new Set();
    lang = "en";
    state;
    onVoices = ()=>this.loadVoices();
    constructor(){
        this.synth = ("TURBOPACK compile-time value", "object") !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
        let muted = false;
        let level = "high";
        try {
            muted = localStorage.getItem(MUTE_KEY) === "1";
            const l = localStorage.getItem(LEVEL_KEY);
            if (l === "all" || l === "high" || l === "critical" || l === "off") level = l;
        } catch  {
        /* ignore */ }
        this.state = {
            supported: !!this.synth,
            enabled: false,
            muted,
            level,
            voiceName: null,
            hindiMissing: false,
            speaking: false
        };
        if (this.synth) {
            this.synth.addEventListener("voiceschanged", this.onVoices);
            this.loadVoices();
        }
    }
    dispose() {
        if (this.synth) {
            this.synth.removeEventListener("voiceschanged", this.onVoices);
            this.synth.cancel();
        }
        this.queue = [];
        this.current = null;
        this.listeners.clear();
    }
    subscribe(fn) {
        this.listeners.add(fn);
        return ()=>this.listeners.delete(fn);
    }
    getState() {
        return this.state;
    }
    set(p) {
        this.state = {
            ...this.state,
            ...p
        };
        this.listeners.forEach((f)=>f());
    }
    loadVoices() {
        if (!this.synth) return;
        this.voices = this.synth.getVoices();
        this.refreshChoice();
    }
    pick(lang) {
        const v = this.voices;
        if (lang === "hi") {
            const hi = v.find((x)=>x.lang.toLowerCase().startsWith("hi"));
            if (hi) return {
                voice: hi,
                tag: hi.lang,
                hindiMissing: false
            };
        }
        const en = v.find((x)=>x.lang.toLowerCase().replace("_", "-") === "en-in") ?? v.find((x)=>x.lang.toLowerCase().replace("_", "-") === "en-gb") ?? v.find((x)=>x.lang.toLowerCase().replace("_", "-") === "en-us") ?? v.find((x)=>x.lang.toLowerCase().startsWith("en")) ?? null;
        return {
            voice: en,
            tag: en?.lang ?? "en-IN",
            hindiMissing: lang === "hi" && v.length > 0
        };
    }
    refreshChoice() {
        const p = this.pick(this.lang);
        this.set({
            voiceName: p.voice ? `${p.voice.name} (${p.voice.lang})` : null,
            hindiMissing: p.hindiMissing
        });
    }
    setLang(l) {
        this.lang = l;
        this.refreshChoice();
    }
    setMuted(m) {
        try {
            localStorage.setItem(MUTE_KEY, m ? "1" : "0");
        } catch  {
        /* ignore */ }
        if (m && this.synth) {
            this.synth.cancel();
            this.queue = [];
            this.current = null;
        }
        this.set({
            muted: m,
            speaking: false
        });
    }
    setLevel(l) {
        try {
            localStorage.setItem(LEVEL_KEY, l);
        } catch  {
        /* ignore */ }
        this.set({
            level: l
        });
    }
    /** Must be called from a click handler: unlocks speech in Chrome. */ enable(confirm) {
        this.set({
            enabled: true
        });
        this.say(confirm, {
            critical: true,
            force: true
        });
    }
    /** Auto-announce an alert that arrived live. */ announce(a) {
        if (a.baseline || a.state !== "open") return;
        if (!this.state.enabled || this.state.muted) return;
        if (!levelAllows(this.state.level, a.severity)) return;
        this.say(a.speak, {
            critical: a.severity === "critical"
        });
    }
    /** Speak on user request (Speak buttons, command replies). Ignores level; respects mute unless forced. */ say(text, opts = {}) {
        if (!this.synth) return;
        if (this.state.muted && !opts.force) return;
        if (opts.force && !this.state.enabled) this.set({
            enabled: true
        });
        const p = this.pick(this.lang);
        const useHi = this.lang === "hi" && !p.hindiMissing && p.voice?.lang.toLowerCase().startsWith("hi");
        const str = useHi ? text.hi : text.en;
        const item = {
            chunks: splitSentences(str),
            lang: p.voice?.lang ?? (useHi ? "hi-IN" : "en-IN"),
            voice: p.voice,
            critical: !!opts.critical,
            at: Date.now()
        };
        if (!item.chunks.length) return;
        if (item.critical) {
            this.queue = [
                item,
                ...this.queue.filter((q)=>q.critical)
            ].slice(0, MAX_QUEUE);
            this.current = null;
            this.synth.cancel();
            // Chrome: speaking immediately after cancel() can be swallowed; defer a tick.
            setTimeout(()=>this.next(), 60);
            return;
        }
        this.queue.push(item);
        while(this.queue.length > MAX_QUEUE){
            const i = this.queue.findIndex((q)=>!q.critical);
            this.queue.splice(i >= 0 ? i : 0, 1);
        }
        if (!this.current) this.next();
    }
    stop() {
        this.queue = [];
        this.current = null;
        this.synth?.cancel();
        this.set({
            speaking: false
        });
    }
    next() {
        if (!this.synth || this.current) return;
        const now = Date.now();
        this.queue = this.queue.filter((q)=>now - q.at <= MAX_AGE_MS);
        const item = this.queue.shift();
        if (!item) {
            this.set({
                speaking: false
            });
            return;
        }
        this.current = item;
        this.set({
            speaking: true
        });
        this.speakChunk(item, 0);
    }
    speakChunk(item, i) {
        if (!this.synth || this.current !== item) return;
        if (i >= item.chunks.length) {
            this.current = null;
            this.next();
            return;
        }
        const u = new SpeechSynthesisUtterance(item.chunks[i]);
        u.lang = item.lang;
        if (item.voice) u.voice = item.voice;
        u.rate = 1;
        const done = ()=>this.speakChunk(item, i + 1);
        u.onend = done;
        u.onerror = done;
        this.synth.speak(u);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_0p80uc_x5awd-._.js.map