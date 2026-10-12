import React from "react";
import { useCurrentFrame } from "remotion";
import { CTA, DIRECTORY, FEATURES, HERO, MOVE } from "../timing";
import { C, fontFamily, TYPE } from "../theme";
import { enter, leave } from "../anim";
import { Line } from "../components/Text";

export const HeroText: React.FC = () => {
  const f = useCurrentFrame();
  const out = leave(f, HERO.headlineOut, MOVE.exit);
  return (
    <>
      <Line top={290} t={enter(f, HERO.headlineIn, MOVE.enter)} out={out}>
        Set up in <span style={{ color: C.pink }}>minutes.</span>
      </Line>
      <Line top={410} t={enter(f, HERO.subIn, MOVE.enter)} out={out} size={TYPE.sub} weight={400} rise={24}
        color="rgba(255,255,255,0.8)">
        An AI assistant builds your Flinxy booking page.
      </Line>
    </>
  );
};

const Chip: React.FC<{ top: number; t: number; out: number; dot: string; title: string; sub?: string }> = ({
  top, t, out, dot, title, sub,
}) => (
  <div
    style={{
      position: "absolute",
      left: 540,
      top,
      width: 460,
      padding: "26px 28px",
      borderRadius: 32,
      background: "rgba(20,20,22,0.82)",
      border: "1.5px solid rgba(255,255,255,0.16)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
      fontFamily,
      opacity: Math.min(1, t * 3) * (1 - out),
      transform: `translateX(${(1 - t) * -70}px) scale(${0.9 + 0.1 * t})`,
      transformOrigin: "0% 50%",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 16, height: 16, borderRadius: 8, background: dot, flexShrink: 0 }} />
      <div style={{ fontWeight: 700, fontSize: 38, lineHeight: 1.15, color: C.white, letterSpacing: -0.5 }}>{title}</div>
    </div>
    {sub && (
      <div style={{ fontWeight: 400, fontSize: TYPE.small, color: "rgba(255,255,255,0.75)", marginTop: 10, paddingLeft: 32, whiteSpace: "nowrap" }}>
        {sub}
      </div>
    )}
  </div>
);

export const FeatureChips: React.FC = () => {
  const f = useCurrentFrame();
  const out = leave(f, FEATURES.out, MOVE.exit);
  return (
    <>
      <Chip top={760} t={enter(f, FEATURES.chips[0], FEATURES.chipLen)} out={out} dot={C.blue} title="Smart booking" />
      <Chip top={940} t={enter(f, FEATURES.chips[1], FEATURES.chipLen)} out={out} dot={C.pink}
        title="Paid straight to your account" sub="via Flutterwave, in naira" />
    </>
  );
};

export const DirectoryText: React.FC = () => {
  const f = useCurrentFrame();
  const out = leave(f, DIRECTORY.out, MOVE.exit);
  const n = Math.round(140 * enter(f, DIRECTORY.counterIn, DIRECTORY.countLen));
  return (
    <>
      <Line top={290} t={enter(f, DIRECTORY.headlineIn, MOVE.enter)} out={out} size={76}>
        Clients find you on the <span style={{ color: C.blue }}>Flinxy Directory.</span>
      </Line>
      <Line top={500} t={enter(f, DIRECTORY.counterIn, MOVE.enter)} out={out} size={TYPE.sub} weight={400} rise={24}
        color="rgba(255,255,255,0.8)">
        About <span style={{ fontWeight: 700, color: C.pink, fontVariantNumeric: "tabular-nums" }}>{n}</span> businesses use Flinxy.
      </Line>
    </>
  );
};

export const CtaText: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Line top={290} t={enter(f, CTA.wordmarkIn, MOVE.enter)} size={64} color={C.pink}>
        Flinxy
      </Line>
      <Line top={400} t={enter(f, CTA.headlineIn, MOVE.enter)}>
        Your booking page, in minutes.
      </Line>
      <div
        style={{
          position: "absolute",
          top: 640,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, enter(f, CTA.storeIn, MOVE.enter) * 3),
          transform: `translateY(${(1 - enter(f, CTA.storeIn, MOVE.enter)) * 24}px)`,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: TYPE.small,
            color: C.black,
            background: C.white,
            borderRadius: 999,
            padding: "16px 36px",
          }}
        >
          Get <b>Flinxy Business</b> on the App Store
        </div>
      </div>
      <Line top={735} t={enter(f, CTA.urlIn, MOVE.enter)} size={TYPE.small} weight={400} color={C.blue} rise={16}>
        flinxy.com
      </Line>
    </>
  );
};
