// Captures real Flinxy screens on an iPhone-sized viewport (3x) and writes src/screens.ts.
// Business names, logos and photos are blurred so no business or person is identifiable.
// Run: node scripts/capture.mjs
import { chromium, devices } from "playwright";
import { writeFileSync, mkdirSync } from "fs";

const OUT = "public/screens";
const MAX_H = 932 * 4; // cap full-page captures at ~4 screens
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium",
});
const ctx = await browser.newContext({ ...devices["iPhone 14 Pro Max"], deviceScaleFactor: 3 });
const page = await ctx.newPage();

const open = async (url) => {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  // Dismiss cookie/consent banners if present.
  for (const label of ["Accept", "Accept all", "Got it", "OK"]) {
    const b = page.getByRole("button", { name: label, exact: true });
    if (await b.count()) await b.first().click().catch(() => {});
  }
};

// Blur every element whose own text contains a business name, plus photos and logos.
const redact = (names) =>
  page.evaluate((names) => {
    const lower = names.map((n) => n.toLowerCase()).filter((n) => n.length > 2);
    const blur = (el, px) => (el.style.filter = `blur(${px}px)`);
    for (const el of document.querySelectorAll("body *")) {
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ").toLowerCase();
      if (own && lower.some((n) => own.includes(n))) blur(el, 9);
    }
    for (const img of document.querySelectorAll("img, picture, video")) {
      const r = img.getBoundingClientRect();
      if (r.width > 40 && r.height > 40 && !/flinxy/i.test(img.getAttribute("alt") ?? "")) blur(img, 22);
    }
    for (const el of document.querySelectorAll("body *")) {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg.includes("url(")) blur(el, 22);
    }
  }, names);

const shoot = async (name) => {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const height = Math.min(h, MAX_H);
  const file = `${OUT}/${name}.jpg`;
  await page.screenshot({ path: file, type: "jpeg", quality: 92, clip: { x: 0, y: 0, width: 430, height } });
  console.log("captured", file, 430 * 3, height * 3);
  return { src: `screens/${name}.jpg`, width: 430 * 3, height: height * 3 };
};

// 1. Directory: find business booking pages + their names.
await open("https://flinxy.com/directory");
const NAV = /^\/(directory|login|signup|register|about|pricing|blog|terms|privacy|contact|faq|help)?\/?$/i;
const biz = await page.$$eval("a[href]", (as) =>
  as
    .map((a) => ({ href: a.href, text: a.innerText.trim().split("\n")[0] }))
    .filter((l) => l.href.startsWith(location.origin)),
);
const seen = new Set();
const links = biz.filter((l) => {
  const p = new URL(l.href).pathname;
  if (NAV.test(p) || seen.has(p)) return false;
  seen.add(p);
  return true;
});
console.log("business links:", links.map((l) => new URL(l.href).pathname).join(", "));
const names = links.map((l) => l.text).filter(Boolean);
await redact(names);
const directory = await shoot("directory");

// 2. Business booking pages (first three).
const shots = [];
for (const [i, l] of links.slice(0, 3).entries()) {
  await open(l.href);
  const title = (await page.title()).split(/[|\-–]/)[0].trim();
  const h1 = await page.$$eval("h1, h2", (hs) => hs.slice(0, 2).map((h) => h.innerText.trim()));
  await redact([...names, title, ...h1]);
  shots.push(await shoot(`booking-${i + 1}`));
}

// 3. Home.
await open("https://flinxy.com");
const home = await shoot("home");

writeFileSync(
  "src/screens.ts",
  `// Written by scripts/capture.mjs. null = not captured yet (renders an empty labelled slot).
export type Shot = { src: string; width: number; height: number } | null;
export const SCREENS: { booking: Shot; directory: Shot; home: Shot } = ${JSON.stringify(
    { booking: shots[0] ?? null, directory, home },
    null,
    2,
  )};
export const EXTRA_BOOKING: Shot[] = ${JSON.stringify(shots.slice(1), null, 2)};
`,
);
await browser.close();
