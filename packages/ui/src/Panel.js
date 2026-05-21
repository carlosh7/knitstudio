import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Panel({ title, children, width = 280 }) {
    return (_jsxs("div", { style: {
            width,
            background: "#16213e",
            borderRight: "1px solid #333",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }, children: [_jsx("div", { style: {
                    padding: "8px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8899aa",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #333",
                }, children: title }), _jsx("div", { style: { flex: 1, overflow: "auto", padding: 8 }, children: children })] }));
}
//# sourceMappingURL=Panel.js.map