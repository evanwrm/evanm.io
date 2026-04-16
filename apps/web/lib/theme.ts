export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "themechange";

function resolveTheme(theme: string) {
    return theme === "dark" ||
        (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
}

export function getTheme(): string {
    if (typeof window === "undefined") return "system";
    return localStorage.getItem(THEME_STORAGE_KEY) || "system";
}

export function setTheme(theme: string) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    applyTheme(theme);
}

export function applyTheme(theme: string) {
    // disable transitions
    const css = document.createElement("style");
    const textNode = document.createTextNode(
        "*, *::before, *::after { transition: none !important; }",
    );
    css.appendChild(textNode);
    document.head.appendChild(css);

    // apply theme
    const resolvedTheme = resolveTheme(theme);
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");

    // Force a reflow & reenable transitions
    window.getComputedStyle(document.body).getPropertyValue("color");
    document.head.removeChild(css);

    window.dispatchEvent(
        new CustomEvent(THEME_CHANGE_EVENT, {
            detail: { theme, resolvedTheme },
        }),
    );
}
