(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/live/MapLeaflet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapLeaflet,
    "shortName",
    ()=>shortName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Real Bhopal map (docs/PLAN-INTAKE.md §3). Plain Leaflet, loaded with next/dynamic ssr:false from MapLive.
// Markers are created once and then patched in place, so the pulse ring does not restart on every tick.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
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
;
;
;
const PROVIDERS = [
    {
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
        attribution: "© Stadia Maps © OpenMapTiles © OpenStreetMap contributors",
        maxZoom: 19
    },
    {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        overlay: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles © Esri — Esri, HERE, Garmin, © OpenStreetMap contributors",
        maxZoom: 16
    }
];
/** label on the left for markers whose right side is crowded */ const LABEL_LEFT = new Set([
    "rani-kamlapati",
    "bairagarh",
    "shahpura"
]);
const GLYPH = {
    aerator: "A",
    crew: "C",
    test_team: "T",
    diversion: "D"
};
function shortName(name) {
    return name.split(" /")[0].replace(/ \(.*\)/, "").replace(/ (ghat|kund|lake ghat)$/i, "").replace(/ (घाट|कुंड|झील घाट)$/u, "");
}
const esc = (s)=>s.replace(/[&<>"]/g, (c)=>({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;"
        })[c] ?? c);
const ll = (p)=>[
        p.lat,
        p.lon
    ];
function ghatIcon(slug) {
    const side = LABEL_LEFT.has(slug) ? "gw-left" : "gw-right";
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
        className: "gw-mk",
        iconSize: [
            22,
            22
        ],
        iconAnchor: [
            11,
            11
        ],
        html: `<span class="gw-pulse"></span><span class="gw-ngt"></span><span class="gw-sel"></span><span class="gw-dot"></span><span class="gw-lbl ${side}"><b></b><i></i></span>`
    });
}
function resIcon(r, idx, etaText) {
    const enRoute = r.status === "en_route";
    const dx = -10 + idx % 4 * 15;
    const dy = 16 + Math.floor(idx / 4) * 15;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
        className: `gw-res ${enRoute ? "gw-res-route" : r.status === "idle" ? "gw-res-idle" : "gw-res-work"}`,
        iconSize: [
            14,
            14
        ],
        iconAnchor: [
            7 - dx,
            7 - dy
        ],
        html: `<span>${GLYPH[r.kind]}</span>${enRoute && etaText ? `<em>${esc(etaText)}</em>` : ""}`
    });
}
function MapLeaflet({ onTilesFailed }) {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const { select, selected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"])();
    const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ghatMarkers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const resMarkers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const depotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(select);
    const failRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onTilesFailed);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapLeaflet.useEffect": ()=>{
            selectRef.current = select;
            failRef.current = onTilesFailed;
        }
    }["MapLeaflet.useEffect"], [
        select,
        onTilesFailed
    ]);
    // Create the map once.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapLeaflet.useEffect": ()=>{
            if (!box.current) return;
            const map = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].map(box.current, {
                zoomControl: true,
                attributionControl: true,
                scrollWheelZoom: false
            });
            mapRef.current = map;
            let loaded = false;
            let layers = [];
            const applyProvider = {
                "MapLeaflet.useEffect.applyProvider": (i)=>{
                    layers.forEach({
                        "MapLeaflet.useEffect.applyProvider": (l)=>l.remove()
                    }["MapLeaflet.useEffect.applyProvider"]);
                    layers = [];
                    const p = PROVIDERS[i];
                    if (!p) {
                        failRef.current();
                        return;
                    }
                    const base = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].tileLayer(p.url, {
                        subdomains: p.subdomains ?? "abc",
                        maxZoom: p.maxZoom,
                        attribution: p.attribution
                    });
                    base.on("tileload", {
                        "MapLeaflet.useEffect.applyProvider": ()=>{
                            loaded = true;
                        }
                    }["MapLeaflet.useEffect.applyProvider"]);
                    base.on("tileerror", {
                        "MapLeaflet.useEffect.applyProvider": ()=>{
                            if (!loaded) applyProvider(i + 1);
                        }
                    }["MapLeaflet.useEffect.applyProvider"]);
                    base.addTo(map);
                    layers.push(base);
                    if (p.overlay) layers.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].tileLayer(p.overlay, {
                        maxZoom: p.maxZoom
                    }).addTo(map));
                }
            }["MapLeaflet.useEffect.applyProvider"];
            applyProvider(0);
            map.fitBounds(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].latLngBounds(Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_GEO"]).map(ll)), {
                padding: [
                    36,
                    36
                ],
                maxZoom: 13
            });
            // Re-enable wheel zoom after the user clicks into the map (avoids hijacking page scroll).
            map.once("focus", {
                "MapLeaflet.useEffect": ()=>map.scrollWheelZoom.enable()
            }["MapLeaflet.useEffect"]);
            const depot = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker(ll(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEPOT"]), {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                    className: "gw-depot",
                    iconSize: [
                        12,
                        12
                    ],
                    iconAnchor: [
                        6,
                        6
                    ],
                    html: "<span></span><em></em>"
                }),
                keyboard: false,
                zIndexOffset: -100
            }).addTo(map);
            depot.bindTooltip("Depot", {
                direction: "bottom",
                offset: [
                    0,
                    6
                ],
                className: "gw-tip"
            });
            depotRef.current = depot;
            const gm = ghatMarkers.current;
            const rm = resMarkers.current;
            for (const [slug, geo] of Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_GEO"])){
                const m = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker(ll(geo), {
                    icon: ghatIcon(slug),
                    keyboard: true,
                    riseOnHover: true,
                    title: slug
                });
                m.on("click", {
                    "MapLeaflet.useEffect": ()=>selectRef.current(slug)
                }["MapLeaflet.useEffect"]);
                m.addTo(map);
                gm.set(slug, m);
            }
            return ({
                "MapLeaflet.useEffect": ()=>{
                    gm.clear();
                    rm.clear();
                    map.remove();
                    mapRef.current = null;
                }
            })["MapLeaflet.useEffect"];
        }
    }["MapLeaflet.useEffect"], []);
    // Patch ghat markers in place.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapLeaflet.useEffect": ()=>{
            depotRef.current?.setTooltipContent(t.lv.depot);
            const dl = depotRef.current?.getElement()?.querySelector("em");
            if (dl) {
                const idle = data ? data.resources.filter({
                    "MapLeaflet.useEffect": (r)=>r.status === "idle" && r.at === "depot"
                }["MapLeaflet.useEffect"]).length : 0;
                dl.textContent = `${t.lv.depot}${idle ? ` · ${idle} ${t.lv.resStatus.idle}` : ""}`;
            }
            if (!data) return;
            for (const [slug, m] of ghatMarkers.current){
                const g = data.ghats[slug];
                const el = m.getElement();
                if (!g || !el) continue;
                const col = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveFormat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_VAR"][g.live_tier];
                const alerting = data.alerts.some({
                    "MapLeaflet.useEffect.alerting": (a)=>a.ghat === slug && a.state === "open" && a.severity !== "info"
                }["MapLeaflet.useEffect.alerting"]);
                const nd = g.live_tier === "no_data";
                el.style.color = col;
                el.classList.toggle("gw-alert", alerting);
                el.classList.toggle("gw-nd", nd);
                el.classList.toggle("gw-ban", g.ngt_lake_ban);
                el.classList.toggle("gw-selected", selected === slug);
                const name = shortName(g.name[lang]);
                const doTxt = g.values.DO !== null ? `DO ${g.values.DO.toFixed(1)}` : t.lv.tier.no_data;
                const b = el.querySelector(".gw-lbl b");
                const i = el.querySelector(".gw-lbl i");
                if (b && b.textContent !== name) b.textContent = name;
                if (i && i.textContent !== doTxt) i.textContent = doTxt;
                const label = `${g.name[lang]}: ${t.lv.tier[g.live_tier]}${g.values.DO !== null ? `, DO ${g.values.DO.toFixed(1)} mg/l` : ""}`;
                el.setAttribute("aria-label", label);
                el.setAttribute("title", label);
                el.setAttribute("role", "button");
                el.setAttribute("aria-pressed", selected === slug ? "true" : "false");
            }
        }
    }["MapLeaflet.useEffect"], [
        data,
        lang,
        selected,
        t
    ]);
    // Resources: at their `at` (or `target` while en route, with the ETA). Position changes animate via CSS.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapLeaflet.useEffect": ()=>{
            const map = mapRef.current;
            if (!map || !data) return;
            const seen = new Set();
            const slotCount = new Map();
            for (const r of data.resources){
                if (r.status === "idle" && r.at === "depot") continue; // counted on the depot label
                const place = r.status === "en_route" && r.target ? r.target : r.at;
                const geo = place === "depot" ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEPOT"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHAT_GEO"][place];
                if (!geo) continue;
                const idx = slotCount.get(place) ?? 0;
                slotCount.set(place, idx + 1);
                const eta = r.eta_min !== null ? `${Math.round(r.eta_min)}′` : "";
                const key = `${place}|${idx}|${r.status}|${eta}`;
                seen.add(r.id);
                const tip = `${r.name[lang]} · ${t.lv.resStatus[r.status]}${r.status === "en_route" && r.eta_min !== null ? ` · ${t.lv.etaCol} ${t.lv.min(Math.round(r.eta_min))}` : ""}`;
                const cur = resMarkers.current.get(r.id);
                if (!cur) {
                    // New movers start at the depot and glide to their place (CSS transition on transform).
                    const startAt = r.at === "depot" && place !== "depot" ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ghatGeo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEPOT"] : geo;
                    const m = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker(ll(startAt), {
                        icon: resIcon(r, idx, eta),
                        keyboard: false,
                        interactive: true,
                        zIndexOffset: 200
                    });
                    m.bindTooltip(tip, {
                        direction: "top",
                        className: "gw-tip"
                    });
                    m.addTo(map);
                    if (startAt !== geo) requestAnimationFrame({
                        "MapLeaflet.useEffect": ()=>requestAnimationFrame({
                                "MapLeaflet.useEffect": ()=>m.setLatLng(ll(geo))
                            }["MapLeaflet.useEffect"])
                    }["MapLeaflet.useEffect"]);
                    resMarkers.current.set(r.id, {
                        m,
                        key
                    });
                } else {
                    if (cur.key !== key) {
                        cur.m.setIcon(resIcon(r, idx, eta));
                        cur.m.setLatLng(ll(geo));
                        cur.key = key;
                    }
                    cur.m.setTooltipContent(tip);
                }
            }
            for (const [id, { m }] of resMarkers.current){
                if (!seen.has(id)) {
                    m.remove();
                    resMarkers.current.delete(id);
                }
            }
        }
    }["MapLeaflet.useEffect"], [
        data,
        lang,
        t
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: box,
        className: "gw-map h-[360px] sm:h-[440px] w-full",
        role: "application",
        "aria-label": t.lv.approx
    }, void 0, false, {
        fileName: "[project]/components/live/MapLeaflet.tsx",
        lineNumber: 228,
        columnNumber: 10
    }, this);
}
_s(MapLeaflet, "MStoLBT+eWteGJloS45ZfA0+Hjg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lang$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liveStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$CommandCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUi"]
    ];
});
_c = MapLeaflet;
var _c;
__turbopack_context__.k.register(_c, "MapLeaflet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/MapLeaflet.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/live/MapLeaflet.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_live_MapLeaflet_tsx_11fl7mc_xmb4i._.js.map