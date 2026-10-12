import React from "react";
import { PHONE } from "../layout";

const FW = PHONE.screenW + PHONE.bezel * 2;
const FH = PHONE.screenH + PHONE.bezel * 2;

// iPhone 15 Pro style: black titanium band, thin bezel, Dynamic Island, side buttons.
export const IPhone: React.FC<{
  x: number;
  y: number;
  scale: number;
  rotateY?: number;
  rotateX?: number;
  bodyOpacity?: number;
  blur?: number;
  children: React.ReactNode;
}> = ({ x, y, scale, rotateY = 0, rotateX = 0, bodyOpacity = 1, blur = 0, children }) => {
  const btn = (side: "l" | "r", top: number, h: number): React.CSSProperties => ({
    position: "absolute",
    top,
    [side === "l" ? "left" : "right"]: -5,
    width: 6,
    height: h,
    borderRadius: 3,
    background: "linear-gradient(90deg, #3a3a3e, #1c1c1f)",
    opacity: bodyOpacity,
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x - FW / 2,
        top: y - FH / 2,
        width: FW,
        height: FH,
        transform: `perspective(2400px) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        transformOrigin: "50% 50%",
        filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
      }}
    >
      <div style={btn("l", 200, 40)} />
      <div style={btn("l", 280, 80)} />
      <div style={btn("l", 380, 80)} />
      <div style={btn("r", 300, 120)} />
      {/* Titanium band */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: PHONE.radius,
          background: "linear-gradient(145deg, #4a4a4f 0%, #1d1d20 30%, #2c2c30 70%, #55555a 100%)",
          boxShadow: `0 60px 140px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.08)`,
          opacity: bodyOpacity,
        }}
      />
      {/* Bezel */}
      <div
        style={{
          position: "absolute",
          inset: 4,
          borderRadius: PHONE.radius - 4,
          background: "#000",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          opacity: bodyOpacity,
        }}
      />
      {/* Screen */}
      <div
        style={{
          position: "absolute",
          left: PHONE.bezel,
          top: PHONE.bezel,
          width: PHONE.screenW,
          height: PHONE.screenH,
          borderRadius: PHONE.radius - PHONE.bezel,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {children}
        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: PHONE.screenW / 2 - 66,
            width: 132,
            height: 38,
            borderRadius: 19,
            background: "#000",
            opacity: bodyOpacity,
          }}
        />
        {/* Glass sheen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(120deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 35%)",
            opacity: bodyOpacity,
          }}
        />
      </div>
    </div>
  );
};
