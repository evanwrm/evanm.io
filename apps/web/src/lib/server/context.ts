import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = async ({ req, res }: trpcNext.CreateNextContextOptions) => {
    const token = req.headers.authorization?.split(" ")[1];

    return { token, req, res };
};

export type Context = Partial<trpc.inferAsyncReturnType<typeof createContext>>;
