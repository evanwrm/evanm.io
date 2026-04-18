import { AsyncLocalStorage } from "node:async_hooks";
import { defineMiddleware } from "astro:middleware";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/locales";

const localeStorage = (globalThis.__i18nLocaleStore ??=
    new AsyncLocalStorage<Locale>());

export const onRequest = defineMiddleware((ctx, next) => {
    const path = ctx.originPathname || new URL(ctx.request.url).pathname;
    const first = path.split("/")[1] ?? "";
    const locale = (locales as readonly string[]).includes(first)
        ? (first as Locale)
        : defaultLocale;
    return localeStorage.run(locale, () => next());
});
