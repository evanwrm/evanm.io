import type { AsyncLocalStorage } from "node:async_hooks";
import type { Locale } from "@/lib/i18n/locales";

declare global {
    var __i18nLocaleStore: AsyncLocalStorage<Locale> | undefined;
}

export {};
