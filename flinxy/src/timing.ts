// Every timing value in the film lives here. Frames at 30fps unless noted.
// Beat = 0.5s (120 BPM). Scene cuts land on beats.

export const FPS = 30;
export const BEAT = 15;
const sec = (s: number) => Math.round(s * FPS);

export const TOTAL = sec(20);

// Scene starts (absolute frames) and lengths.
export const SCENE = {
  hook: { from: sec(0), dur: sec(2.5) },
  pain: { from: sec(2.5), dur: sec(3.5) },
  hero: { from: sec(6), dur: sec(4) },
  features: { from: sec(10), dur: sec(3) },
  directory: { from: sec(13), dur: sec(3) },
  cta: { from: sec(16), dur: sec(4) },
} as const;

// Shared move lengths (frames).
export const MOVE = {
  enter: 8, // snappy entrance
  exit: 6, // snappier exit
  fade: 3, // opacity pop under an entrance
};

// 1. Hook (frames relative to scene start)
export const HOOK = {
  words: [0, BEAT, BEAT * 2], // "Your" / "craft took" / "years."
  tradeSwapEvery: BEAT, // trade word under the headline swaps on every beat
  tradeRoll: 5, // slot-roll length
  exitAt: sec(2.5) - 4,
};

// 2. Pain
export const PAIN = {
  headlineIn: 0,
  barIn: BEAT, // bar + label appear one beat after the cut
  crawlStart: BEAT,
  crawlEnd: sec(3), // bar creeps (linear) until here
  crawlTo: 0.12, // stalls around 12%
  dotsEvery: BEAT, // ellipsis ticks on each beat
  shudderAt: sec(3), // two quick shudders at 5.5s absolute
  shudderLen: 8,
  headlineOut: sec(3.5) - 2,
};

// 3. Hero (relative to hero start)
export const HERO = {
  snapFull: 4, // bar snaps to 100%
  morphStart: 4,
  morphLen: 12, // bar stretches into the phone screen
  bodyIn: 10, // phone body fades in around the screen
  bodyLen: 8,
  stripsStart: 14, // screenshot strips slide in
  stripStagger: 2,
  stripLen: 9,
  headlineIn: BEAT, // "Set up in minutes." one beat after the snap
  subIn: BEAT * 2,
  scrollStart: sec(2),
  scrollEnd: sec(4),
  tiltPeriod: sec(4),
  headlineOut: sec(4) - MOVE.exit,
};

// 4. Features (relative to features start)
export const FEATURES = {
  phoneShift: 0,
  phoneShiftLen: 10,
  chips: [BEAT, BEAT * 3], // 10.5s and 11.5s absolute
  chipLen: 10,
  scrollEnd: sec(3),
  out: sec(3) - MOVE.exit,
};

// 5. Directory (relative to directory start)
export const DIRECTORY = {
  whipLen: 6,
  headlineIn: 3,
  counterIn: BEAT * 2,
  countLen: sec(1),
  scrollStart: 6,
  scrollEnd: sec(3),
  out: sec(3) - MOVE.exit,
};

// 6. CTA (relative to CTA start)
export const CTA = {
  phoneSettle: 0,
  phoneSettleLen: 12,
  wordmarkIn: 0,
  headlineIn: BEAT, // 16.5s
  storeIn: BEAT * 2, // 17.0s
  urlIn: BEAT * 3,
};
