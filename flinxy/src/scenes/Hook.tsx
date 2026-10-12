import React from "react";
import { useCurrentFrame } from "remotion";
import { HOOK, MOVE } from "../timing";
import { C, fontFamily, TYPE } from "../theme";
import { enter, leave, lin } from "../anim";

const WORDS = [
  { text: "Your", color: C.white },
  { text: "craft took", color: C.white },
  { text: "years.", color: C.pink },
];
const TRADES = ["Lashes", "Braids", "Nails", "Fades", "Spa"];

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const out = leave(f, HOOK.exitAt, 4);

  const idx = Math.min(TRADES.length - 1, Math.floor(f / HOOK.tradeSwapEvery));
  const roll = enter(f, idx * HOOK.tradeSwapEvery, HOOK.tradeRoll);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - out, transform: `translateY(${-out * 30}px)` }}>
      <div
        style={{
          position: "absolute",
          top: 840,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 22,
          fontFamily,
          fontWeight: 700,
          fontSize: TYPE.headline,
          letterSpacing: -1.5,
        }}
      >
        {WORDS.map((w, i) => {
          const t = enter(f, HOOK.words[i], MOVE.enter);
          return (
            <span
              key={w.text}
              style={{
                color: w.color,
                opacity: lin(f, HOOK.words[i], MOVE.fade),
                display: "inline-block",
                transform: `translateY(${(1 - t) * 40}px) scale(${1.12 - 0.12 * t})`,
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
      {/* Trade word slot-roll */}
      <div
        style={{
          position: "absolute",
          top: 980,
          width: "100%",
          height: 56,
          overflow: "hidden",
          fontFamily,
          fontWeight: 400,
          fontSize: TYPE.sub,
          color: C.blue,
          textAlign: "center",
        }}
      >
        {idx > 0 && (
          <div style={{ position: "absolute", width: "100%", transform: `translateY(${-roll * 56}px)` }}>
            {TRADES[idx - 1]}
          </div>
        )}
        <div style={{ position: "absolute", width: "100%", transform: `translateY(${(1 - roll) * 56}px)` }}>
          {TRADES[idx]}
        </div>
      </div>
    </div>
  );
};
