import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

export const isExternal = (url: string, baseLocation: string = "/") => {
    const match = parseUrl(url);
    const location = parseUrl(baseLocation);

    return (
        match.protocol !== location.protocol ||
        match.hostname !== location.hostname ||
        match.port !== location.port
    );
};
