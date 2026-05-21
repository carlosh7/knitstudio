import type { ReactNode } from "react";

export interface PanelProps {
  title: string;
  children: ReactNode;
  width?: number;
}

export function Panel({ title, children, width = 280 }: PanelProps) {
  return (
    <div
      style={{
        width,
        background: "#16213e",
        borderRight: "1px solid #333",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          fontSize: 12,
          fontWeight: 600,
          color: "#8899aa",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          borderBottom: "1px solid #333",
        }}
      >
        {title}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 8 }}>{children}</div>
    </div>
  );
}
