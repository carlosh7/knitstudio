import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

export function Button({
  variant = "secondary",
  children,
  style,
  ...props
}: ButtonProps) {
  const variants = {
    primary: { background: "#4f46e5", color: "#fff" },
    secondary: { background: "#2a2a4a", color: "#ccc" },
    ghost: { background: "transparent", color: "#8899aa" },
  };

  return (
    <button
      style={{
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid #444",
        cursor: "pointer",
        fontSize: 13,
        ...variants[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
