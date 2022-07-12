import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../lib/server/context";
import { appRouter } from "../../../lib/server/routers/app";

export default trpcNext.createNextApiHandler({
    router: appRouter,
    batching: { enabled: true },
    createContext
});
