import { intlFormat } from "date-fns";
import {
    de as deDate,
    enUS as enDate,
    es as esDate,
    fr as frDate,
    ja as jaDate,
    ko as koDate,
    ptBR as ptBrDate,
    zhCN as zhDate,
    type Locale as DateFnsLocale,
} from "date-fns/locale";
import { get } from "lodash-es";
import de from "@/i18n/locales/de";
import en, { type Translations } from "@/i18n/locales/en";
import es from "@/i18n/locales/es";
import fr from "@/i18n/locales/fr";
import ja from "@/i18n/locales/ja";
import ko from "@/i18n/locales/ko";
import ptBr from "@/i18n/locales/pt-br";
import zh from "@/i18n/locales/zh";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/locales";
import { isExternal } from "@/lib/uri";

export const LOCALE_COOKIE_NAME = "locale";

interface LocaleInfo {
    name: string;
    dir: "ltr" | "rtl";
    og: string;
    locale: string;
    translations: Translations;
    dateLocale: DateFnsLocale;
}
export const localeInfo: Record<Locale, LocaleInfo> = {
    en: {
        name: "English",
        dir: "ltr",
        og: "en_US",
        locale: "en",
        translations: en,
        dateLocale: enDate,
    },
    fr: {
        name: "Français",
        dir: "ltr",
        og: "fr_FR",
        locale: "fr",
        translations: fr,
        dateLocale: frDate,
    },
    es: {
        name: "Español",
        dir: "ltr",
        og: "es_ES",
        locale: "es",
        translations: es,
        dateLocale: esDate,
    },
    de: {
        name: "Deutsch",
        dir: "ltr",
        og: "de_DE",
        locale: "de",
        translations: de,
        dateLocale: deDate,
    },
    "pt-br": {
        name: "Português",
        dir: "ltr",
        og: "pt_BR",
        locale: "pt-BR",
        translations: ptBr,
        dateLocale: ptBrDate,
    },
    ja: {
        name: "日本語",
        dir: "ltr",
        og: "ja_JP",
        locale: "ja",
        translations: ja,
        dateLocale: jaDate,
    },
    ko: {
        name: "한국어",
        dir: "ltr",
        og: "ko_KR",
        locale: "ko",
        translations: ko,
        dateLocale: koDate,
    },
    zh: {
        name: "中文",
        dir: "ltr",
        og: "zh_CN",
        locale: "zh",
        translations: zh,
        dateLocale: zhDate,
    },
};

const localeAliases: Record<string, Locale> = {
    pt: "pt-br",
    "zh-cn": "zh",
    "zh-hans": "zh",
    "zh-sg": "zh",
};

type PathsOf<T, Prefix extends string = ""> =
    T extends Record<string, unknown>
        ? {
              [K in keyof T & string]: PathsOf<
                  T[K],
                  Prefix extends "" ? K : `${Prefix}.${K}`
              >;
          }[keyof T & string]
        : Prefix;
export type TranslationKey = PathsOf<Translations>;

const numberFormats = new Map<string, Intl.NumberFormat>();
const localePattern = new RegExp(
    `^/(${locales.filter(l => l !== defaultLocale).join("|")})(?=/|$)`,
);

export function matchLocale(value?: string | null) {
    if (!value) return null;
    const normalized = value.toLowerCase();
    if ((locales as readonly string[]).includes(normalized))
        return normalized as Locale;
    if (localeAliases[normalized]) return localeAliases[normalized];
    const base = normalized.split("-")[0];
    if ((locales as readonly string[]).includes(base)) return base as Locale;
    return localeAliases[base] ?? null;
}

export function getLocale() {
    if (typeof document !== "undefined")
        return matchLocale(document.documentElement.lang) ?? defaultLocale;
    return globalThis.__i18nLocaleStore?.getStore() ?? defaultLocale;
}
export function localizedPath(path: string, locale: Locale = getLocale()) {
    if (!path?.startsWith("/") || isExternal(path)) return path;
    const url = new URL(path, "http://_");
    const clean = url.pathname.replace(localePattern, "") || "/";
    const suffix = clean === "/" ? "" : clean;
    const newPath = locale === defaultLocale ? clean : `/${locale}${suffix}`;
    return newPath + url.search + url.hash;
}
export function setLocale(locale: Locale | null) {
    const target = locale ?? defaultLocale;
    const age = locale ? 31536000 : 0;
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale ?? ""}; Path=/; Max-Age=${age}; SameSite=Lax`;
    const url = new URL(window.location.href);
    url.pathname = localizedPath(url.pathname, target);
    window.location.href = url.href;
}

export function useTranslations(locale: Locale = getLocale()) {
    const info = localeInfo[locale] ?? localeInfo[defaultLocale];
    return {
        ...info,
        t: (key: TranslationKey): string => get(info.translations, key, key),
        formatNumber: (value: number) => {
            let nf = numberFormats.get(info.locale);
            if (!nf) {
                nf = new Intl.NumberFormat(info.locale);
                numberFormats.set(info.locale, nf);
            }
            return nf.format(value);
        },
        formatDate: (
            date: string | number | Date,
            options: Intl.DateTimeFormatOptions = {},
        ) => intlFormat(date, options, { locale: info.locale }),
    };
}
