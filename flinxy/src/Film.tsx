import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SCENE } from "./timing";
import { C, fontFamily } from "./theme";
import { Hook } from "./scenes/Hook";
import { Pain } from "./scenes/Pain";
import { PhoneTrack } from "./scenes/PhoneTrack";
import { CtaText, DirectoryText, FeatureChips, HeroText } from "./scenes/Overlays";

export const Film: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.black, fontFamily }}>
    <Sequence name="1 Hook" from={SCENE.hook.from} durationInFrames={SCENE.hook.dur}>
      <Hook />
    </Sequence>
    <Sequence name="2 Pain" from={SCENE.pain.from} durationInFrames={SCENE.pain.dur}>
      <Pain />
    </Sequence>
    <PhoneTrack />
    <Sequence name="3 Hero text" from={SCENE.hero.from} durationInFrames={SCENE.hero.dur}>
      <HeroText />
    </Sequence>
    <Sequence name="4 Features" from={SCENE.features.from} durationInFrames={SCENE.features.dur}>
      <FeatureChips />
    </Sequence>
    <Sequence name="5 Directory" from={SCENE.directory.from} durationInFrames={SCENE.directory.dur}>
      <DirectoryText />
    </Sequence>
    <Sequence name="6 CTA" from={SCENE.cta.from} durationInFrames={SCENE.cta.dur}>
      <CtaText />
    </Sequence>
  </AbsoluteFill>
);
