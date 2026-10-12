import { Composition } from "remotion";
import { Film } from "./Film";
import { FPS, TOTAL } from "./timing";

export const RemotionRoot = () => (
  <Composition id="FlinxyVideo" component={Film} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
);
