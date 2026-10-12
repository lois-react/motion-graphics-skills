// Positions (not timing). Canvas 1080x1920. Keep content inside SAFE.
export const W = 1080;
export const H = 1920;
export const SAFE = { top: 280, bottom: 1520, side: 90 };

// iPhone geometry at scale 1.
export const PHONE = {
  screenW: 500,
  screenH: 1084,
  bezel: 16,
  radius: 86,
};

// Phone placement per scene: centre + scale.
export const PLACE = {
  hero: { x: 540, y: 1010, s: 0.88 },
  features: { x: 380, y: 1010, s: 0.88 },
  directory: { x: 540, y: 1066, s: 0.8 },
  cta: { x: 540, y: 1160, s: 0.52 },
};

// The pain-scene progress bar (becomes the phone screen).
export const BAR = { x: 220, y: 1010, w: 640, h: 12 };

// Scroll offsets inside the screen, in screen pixels (screen is 500 wide).
export const SCROLL = {
  heroFrom: 0,
  heroTo: 120,
  featuresTo: 520,
  directoryTo: 420,
};
