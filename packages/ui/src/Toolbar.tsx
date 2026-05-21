import type { ReactNode } from "react";

export interface ToolbarProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export function Toolbar({ left, center, right }: ToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        height: 48,
        background: "#1a1a2e",
        color: "#fff",
        borderBottom: "1px solid #333",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {left}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {center}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {right}
      </div>
    </div>
  );
}
