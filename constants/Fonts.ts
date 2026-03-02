export const FONTS = {
  "Montserrat-Bold": require("@/assets/fonts/montserrat/Montserrat-Bold.otf"),
  "Montserrat-ExtraLight": require("@/assets/fonts/montserrat/Montserrat-ExtraLight.otf"),
  "Montserrat-Regular": require("@/assets/fonts/montserrat/Montserrat-Regular.otf"),
  "Montserrat-Light": require("@/assets/fonts/montserrat/Montserrat-Light.otf"),
  "Montserrat-Thin": require("@/assets/fonts/montserrat/Montserrat-Thin.otf"),
  "Montserrat-SemiBold": require("@/assets/fonts/montserrat/Montserrat-SemiBold.otf"),
};

export type FontType = keyof typeof FONTS;
