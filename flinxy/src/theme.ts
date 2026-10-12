import { Easing } from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Poppins (Google Fonts, OFL) bundled in public/fonts so renders never depend on the network.
export const fontFamily = "Poppins";
loadFont({ family: fontFamily, url: staticFile("fonts/Poppins-Regular.woff2"), weight: "400" });
loadFont({ family: fontFamily, url: staticFile("fonts/Poppins-Bold.woff2"), weight: "700" });

export const C = {
  black: "#000000",
  pink: "#F4C1FF",
  blue: "#91D6FF",
  white: "#FFFFFF",
};

export const TYPE = {
  headline: 84,
  sub: 36,
  small: 30,
};

export const EASE_IN = Easing.bezier(0.16, 1, 0.3, 1); // entrances
export const EASE_OUT = Easing.bezier(0.7, 0, 0.84, 0); // exits
