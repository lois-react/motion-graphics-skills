// Written by scripts/capture.mjs. null = not captured yet (renders an empty labelled slot).
export type Shot = { src: string; width: number; height: number } | null;
export const SCREENS: { booking: Shot; directory: Shot; home: Shot } = {
  booking: null,
  directory: null,
  home: null,
};
