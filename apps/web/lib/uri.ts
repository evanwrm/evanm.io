export const isExternal = (url: string): boolean => {
    if (!url || url.startsWith("/") || url.startsWith("#")) return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
};
