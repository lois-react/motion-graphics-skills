import React from "react";
import { Easing, useCurrentFrame, interpolate } from "remotion";
import { MOVE, PAIN } from "../timing";
import { BAR } from "../layout";
import { C, fontFamily, TYPE } from "../theme";
import { enter, leave, lin } from "../anim";
import { Line } from "../components/Text";

export const barProgress = (f: number) =>
  PAIN.crawlTo *
  interpolate(f, [PAIN.crawlStart, PAIN.crawlEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

export const Pain: React.FC = () => {
  const f = useCurrentFrame();
  const head = enter(f, PAIN.headlineIn, MOVE.enter);
  const headOut = leave(f, PAIN.headlineOut, 4);
  const bar = lin(f, PAIN.barIn, MOVE.fade);
  const dots = ".".repeat(1 + (Math.floor(f / PAIN.dotsEvery) % 3));
  const sh = f - PAIN.shudderAt;
  const shake = sh >= 0 && sh < PAIN.shudderLen ? Math.sin((sh / PAIN.shudderLen) * Math.PI * 4) * 10 : 0;

  return (
    <>
      <Line top={720} t={head} out={headOut}>
        Getting bookable shouldn't.
      </Line>
      <div
        style={{
          position: "absolute",
          left: BAR.x,
          top: BAR.y - 62,
          width: BAR.w,
          fontFamily,
          fontSize: TYPE.small,
          color: "rgba(255,255,255,0.7)",
          opacity: bar * (1 - headOut),
        }}
      >
        Setting up bookings{dots}
      </div>
      <div
        style={{
          position: "absolute",
          left: BAR.x + shake,
          top: BAR.y,
          width: BAR.w,
          height: BAR.h,
          borderRadius: BAR.h / 2,
          background: "rgba(255,255,255,0.14)",
          opacity: bar,
          overflow: "hidden",
        }}
      >
        <div style={{ width: `${barProgress(f) * 100}%`, height: "100%", background: C.white, borderRadius: BAR.h / 2 }} />
      </div>
    </>
  );
};
