import { createContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import * as trpcNext from "@trpc/server/adapters/next";

// export const runtime = "experimental-edge";

export default trpcNext.createNextApiHandler({
    router: appRouter,
    batching: { enabled: true },
    createContext
});
