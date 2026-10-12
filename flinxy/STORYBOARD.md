# Flinxy: "Years / Minutes" storyboard

**The one point:** your craft took years; your booking page takes minutes.
**Hero moment (6.0s):** a slow, stuck setup bar snaps to 100% and opens into an iPhone. Inside it, the real Flinxy booking page builds itself strip by strip.

1080x1920, 30fps, **20.0s**. Beat = 0.5s (120 BPM). Every cut lands on a beat. Easing is snappy: `bezier(0.16, 1, 0.3, 1)` for entrances and `bezier(0.7, 0, 0.84, 0)` for exits, 6 to 9 frames each. Nothing important sits in the top 300px or the bottom 400px.

| # | Act | Time (s) | On screen | What moves |
|---|---|---|---|---|
| 1 | Hook | 0.0–2.5 | Black. Headline **"Your craft took years."** Below it, one small word at a time: *Lashes · Braids · Nails · Fades · Spa*. | Frame 0: "Your" punches in (scale 1.12 to 1, 8 frames). "craft took" lands at 0.5s and **"years."** at 1.0s in pink. The trade word below swaps on every beat with a short vertical slot-roll. |
| 2 | Pain | 2.5–6.0 | **"Getting bookable shouldn't."** Under it, a thin progress bar labelled *Setting up bookings…* crawls to about 12% and stalls. | Hard cut on 2.5. Headline slides up 40px. The bar creeps with a slow linear ease (the only slow move in the film) and the ellipsis ticks on each beat. At 5.5s the bar shudders twice, as if stuck. |
| 3 | **Hero** | 6.0–10.0 | **"Set up in minutes."** with a smaller line: *An AI assistant builds your Flinxy booking page.* An iPhone with a **real Flinxy booking page**. | On 6.0 the bar snaps to 100% in blue (4 frames), then stretches to become the iPhone screen. The real booking screenshot is cut into about 6 horizontal strips that slide in one after another, 2 frames apart. Once it's built, the page scrolls gently and the phone tilts slightly in 3D. |
| 4 | Solution | 10.0–13.0 | Same phone, scrolled to services and times. Two chips pop in beside it, a beat apart: **"Smart booking"** and **"Paid straight to your account"**, with *via Flutterwave, in naira* in small type. | Each chip springs in from the phone edge on a beat (10.5s, 11.5s). The phone keeps a slow push-in. |
| 5 | Solution | 13.0–16.0 | The phone whip-slides to the **real Flinxy Directory**. **"Clients find you on the Flinxy Directory."** A small line counts up: *About 140 businesses use Flinxy.* | Whip pan with motion blur (6 frames) on 13.0. The directory scrolls. The number counts 0 to 140 over 1s with ease-out. "About" stays visible the whole time. |
| 6 | CTA | 16.0–20.0 | The **flinxy.com** home page in the phone, set small. Wordmark **Flinxy**, then **"Your booking page, in minutes."** and *Get Flinxy Business on the App Store*. | On 16.0 the phone shrinks back and drops lower. The wordmark scales in on the beat. The CTA lines stagger in on 16.5s and 17.0s, then everything holds for at least 2.5s to read. |

## Screens used (real, captured with Playwright, business names blurred)
- `flinxy.com/directory`, used in scene 5
- 1–2 business booking pages linked from the directory, used in scenes 3 and 4
- `flinxy.com` home, used in scene 6

## Claims on screen, mapped to the facts
- "An AI assistant builds your Flinxy booking page" and "Set up in minutes" come from the AI-setup fact.
- "Smart booking" comes from the smart-booking fact.
- "Paid straight to your account, via Flutterwave, in naira" comes from the payments fact.
- "Clients find you on the Flinxy Directory" comes from the directory fact.
- "About 140 businesses use Flinxy" comes from the business-count fact (never "500+").
- "Get Flinxy Business on the App Store" comes from the app fact.

There are no people, no DMs, no "how much?" and no deposits. It isn't an "Introducing Flinxy" video either: the brand name only appears at the CTA.
