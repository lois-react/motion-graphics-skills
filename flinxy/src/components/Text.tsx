import React from "react";
import { C, fontFamily, TYPE } from "../theme";
import { SAFE, W } from "../layout";

// Centered text block. `t` = entrance progress, `out` = exit progress.
export const Line: React.FC<{
  top: number;
  t: number;
  out?: number;
  size?: number;
  weight?: 400 | 700;
  color?: string;
  rise?: number;
  children: React.ReactNode;
}> = ({ top, t, out = 0, size = TYPE.headline, weight = 700, color = C.white, rise = 40, children }) => (
  <div
    style={{
      position: "absolute",
      left: SAFE.side,
      width: W - SAFE.side * 2,
      top,
      textAlign: "center",
      fontFamily,
      fontWeight: weight,
      fontSize: size,
      lineHeight: 1.18,
      letterSpacing: weight === 700 ? -1.5 : 0,
      color,
      opacity: Math.min(1, t * 3) * (1 - out),
      transform: `translateY(${(1 - t) * rise - out * 30}px)`,
    }}
  >
    {children}
  </div>
);
