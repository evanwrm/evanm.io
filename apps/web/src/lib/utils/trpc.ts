import { httpBatchLink, httpLink, loggerLink, splitLink } from "@trpc/client";
import { setupTRPC } from "@trpc/next";
import superjson from "superjson";
import { AppRouter } from "../server/routers/app";
import { NODE_ENV } from "./constants";
import { getBaseUrl } from "./uri";

export const trpc = setupTRPC<AppRouter>({
    config() {
        // https://trpc.io/docs/links
        const url = `${getBaseUrl()}/api/trpc`;
        const links = [
            loggerLink({
                enabled: opts =>
                    NODE_ENV === "development" ||
                    (opts.direction === "down" && opts.result instanceof Error)
            }),
            splitLink({
                condition(op) {
                    return op.context.skipBatch === true;
                },
                true: httpLink({ url }),
                false: httpBatchLink({ url, maxURLLength: 2048 })
            })
        ];

        return {
            links,
            transformer: superjson,
            queryClientConfig: { defaultOptions: { queries: { staleTime: Infinity } } }
        };
    },
    ssr: false // https://github.com/trpc/trpc/discussions/958
});
