import { interpolate } from "remotion";
import { EASE_IN, EASE_OUT } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 0 → 1 between start and start + len.
export const enter = (f: number, start: number, len: number) =>
  interpolate(f, [start, start + len], [0, 1], { ...clamp, easing: EASE_IN });

export const leave = (f: number, start: number, len: number) =>
  interpolate(f, [start, start + len], [0, 1], { ...clamp, easing: EASE_OUT });

export const lin = (f: number, start: number, len: number) =>
  interpolate(f, [start, start + len], [0, 1], clamp);

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
