import type { ReactNode } from "react";

interface IconProps {
  size?: number;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  children: ReactNode;
}

export function Icon({
  size = 19,
  strokeWidth = 2,
  stroke = "currentColor",
  fill = "none",
  children,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
