import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { CTA, DIRECTORY, FEATURES, HERO, PAIN, SCENE } from "../timing";
import { BAR, PHONE, PLACE, SCROLL } from "../layout";
import { SCREENS } from "../screens";
import { C } from "../theme";
import { enter, lin, mix } from "../anim";
import { IPhone } from "../components/IPhone";
import { Screen } from "../components/Screen";

const smooth = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
const whipEase = Easing.bezier(0.65, 0, 0.35, 1);

// The one phone that runs from the hero to the CTA (global frames).
export const PhoneTrack: React.FC = () => {
  const g = useCurrentFrame();
  if (g < SCENE.hero.from) return null;

  const h = g - SCENE.hero.from;
  const q = g - SCENE.features.from;
  const d = g - SCENE.directory.from;
  const c = g - SCENE.cta.from;

  // --- Hero: bar snaps full, stretches into the screen.
  const fill = mix(PAIN.crawlTo, 1, enter(h, 0, HERO.snapFull));
  const m = enter(h, HERO.morphStart, HERO.morphLen);
  const body = lin(h, HERO.bodyIn, HERO.bodyLen);
  const strips = Array.from({ length: 6 }, (_, i) =>
    enter(h, HERO.stripsStart + i * HERO.stripStagger, HERO.stripLen),
  );
  const s0 = PLACE.hero.s;
  const target = {
    l: PLACE.hero.x - (PHONE.screenW * s0) / 2,
    t: PLACE.hero.y - (PHONE.screenH * s0) / 2,
    w: PHONE.screenW * s0,
    h: PHONE.screenH * s0,
    r: (PHONE.radius - PHONE.bezel) * s0,
  };
  const rect = {
    l: mix(BAR.x, target.l, m),
    t: mix(BAR.y, target.t, m),
    w: mix(BAR.w, target.w, m),
    h: mix(BAR.h, target.h, m),
    r: mix(BAR.h / 2, target.r, m),
  };
  const rectFade = 1 - lin(h, HERO.morphStart + HERO.morphLen, 4);

  // --- Booking phone position across hero → features → whip.
  const shift = enter(q, FEATURES.phoneShift, FEATURES.phoneShiftLen);
  const whip = interpolate(d, [0, DIRECTORY.whipLen], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: whipEase,
  });
  const blur = Math.sin(whip * Math.PI) * 14;
  const bx = mix(PLACE.hero.x, PLACE.features.x, shift) - whip * 900;
  const bs = mix(PLACE.hero.s, PLACE.hero.s + 0.04, smooth(q, 0, FEATURES.scrollEnd));
  const bScroll =
    mix(SCROLL.heroFrom, SCROLL.heroTo, smooth(h, HERO.scrollStart, HERO.scrollEnd)) +
    (SCROLL.featuresTo - SCROLL.heroTo) * smooth(q, 0, FEATURES.scrollEnd);
  const tilt = Math.sin((h / HERO.tiltPeriod) * Math.PI * 2) * 5 * body * (1 - whip);

  // --- Directory phone: whips in, then settles small for the CTA.
  const settle = enter(c, CTA.phoneSettle, CTA.phoneSettleLen);
  const dx = mix(PLACE.directory.x + 900, PLACE.directory.x, whip);
  const dy = mix(PLACE.directory.y, PLACE.cta.y, settle);
  const ds = mix(PLACE.directory.s, PLACE.cta.s, settle);
  const dScroll = mix(0, SCROLL.directoryTo, smooth(d, DIRECTORY.scrollStart, DIRECTORY.scrollEnd)) * (1 - settle);
  const home = lin(c, 2, 8);

  const glowX = d > 0 ? dx : bx;
  const glowY = d > 0 ? dy : PLACE.hero.y;

  return (
    <>
      {/* Soft brand glow behind the phone */}
      <div
        style={{
          position: "absolute",
          left: glowX - 700,
          top: glowY - 700,
          width: 1400,
          height: 1400,
          background: `radial-gradient(circle, rgba(244,193,255,0.22) 0%, rgba(145,214,255,0.08) 40%, rgba(0,0,0,0) 68%)`,
          opacity: body,
        }}
      />
      {d < DIRECTORY.whipLen && (
        <IPhone x={bx} y={PLACE.hero.y} scale={bs} rotateY={tilt} rotateX={2 * body} bodyOpacity={body} blur={blur}>
          <Screen shot={SCREENS.booking} label="Business booking page" scroll={bScroll} strips={strips} />
        </IPhone>
      )}
      {d >= 0 && (
        <IPhone x={dx} y={dy} scale={ds} blur={blur}>
          <Screen shot={SCREENS.directory} label="flinxy.com/directory" scroll={dScroll} />
          {c >= 0 && (
            <div style={{ position: "absolute", inset: 0, opacity: home }}>
              <Screen shot={SCREENS.home} label="flinxy.com" scroll={0} />
            </div>
          )}
        </IPhone>
      )}
      {/* Progress bar → screen morph (on top until it lands) */}
      {rectFade > 0 && (
        <div
          style={{
            position: "absolute",
            left: rect.l,
            top: rect.t,
            width: rect.w,
            height: rect.h,
            borderRadius: rect.r,
            overflow: "hidden",
            background: m > 0 ? `rgba(145,214,255,${1 - m * 0.85})` : "rgba(255,255,255,0.14)",
            border: m > 0 ? `2px solid ${C.blue}` : undefined,
            opacity: rectFade,
          }}
        >
          {m === 0 && (
            <div style={{ width: `${fill * 100}%`, height: "100%", background: C.blue, borderRadius: BAR.h / 2 }} />
          )}
        </div>
      )}
    </>
  );
};
