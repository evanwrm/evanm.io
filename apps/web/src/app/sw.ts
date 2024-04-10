import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "@serwist/sw";

const serwist = new Serwist();
const revision = crypto.randomUUID();

serwist.install({
    precacheEntries: (self as any).__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: defaultCache,
    fallbacks: {
        entries: [
            {
                url: "/",
                revision,
                matcher({ request }) {
                    return request.destination === "document";
                }
            }
        ]
    }
});
