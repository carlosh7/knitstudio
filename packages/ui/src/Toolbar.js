import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Toolbar({ left, center, right }) {
    return (_jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            height: 48,
            background: "#1a1a2e",
            color: "#fff",
            borderBottom: "1px solid #333",
        }, children: [_jsx("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: left }), _jsx("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: center }), _jsx("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: right })] }));
}
//# sourceMappingURL=Toolbar.js.map