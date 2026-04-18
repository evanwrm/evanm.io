export const locales = [
    "en",
    "fr",
    "es",
    "de",
    "pt-br",
    "ja",
    "ko",
    "zh",
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
