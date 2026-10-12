import React from "react";
import { Img, staticFile } from "remotion";
import { PHONE } from "../layout";
import { Shot } from "../screens";
import { fontFamily } from "../theme";

// A real captured page, scrolled by `scroll` screen-pixels.
// `strips` (0..1 per strip) assembles the visible window strip by strip.
export const Screen: React.FC<{ shot: Shot; label: string; scroll: number; strips?: number[] }> = ({
  shot,
  label,
  scroll,
  strips,
}) => {
  const imgH = shot ? (PHONE.screenW * shot.height) / shot.width : PHONE.screenH;
  const maxScroll = Math.max(0, imgH - PHONE.screenH);
  const y = -Math.min(scroll, maxScroll);

  const page = (
    <div style={{ position: "absolute", left: 0, top: y, width: PHONE.screenW, height: imgH }}>
      {shot ? (
        <Img src={staticFile(shot.src)} style={{ width: PHONE.screenW, height: imgH, display: "block" }} />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.35)",
            fontFamily,
            fontSize: 22,
            textAlign: "center",
            padding: 40,
          }}
        >
          {label}
          <br />
          (screen not captured yet)
        </div>
      )}
    </div>
  );

  if (!strips) return <div style={{ position: "absolute", inset: 0 }}>{page}</div>;

  const n = strips.length;
  const h = PHONE.screenH / n;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {strips.map((t, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: i * h,
            width: PHONE.screenW,
            height: Math.ceil(h) + 1,
            overflow: "hidden",
            opacity: Math.min(1, t * 2.5),
            transform: `translateX(${(1 - t) * (i % 2 === 0 ? -140 : 140)}px)`,
          }}
        >
          <div style={{ position: "absolute", left: 0, top: -i * h, width: PHONE.screenW, height: PHONE.screenH }}>
            {page}
          </div>
        </div>
      ))}
    </div>
  );
};
