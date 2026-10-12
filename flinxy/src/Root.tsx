import { AbsoluteFill, Composition } from "remotion";

const Placeholder = () => <AbsoluteFill style={{ backgroundColor: "#000000" }} />;

export const RemotionRoot = () => (
  <Composition id="FlinxyVideo" component={Placeholder} durationInFrames={30} fps={30} width={1080} height={1920} />
);
