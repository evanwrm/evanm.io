import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {}

export const createInnerContext = async (opts?: CreateInnerContextOptions) => {
    return { req: opts?.req, res: opts?.res };
};

export const createContext = async (opts: CreateNextContextOptions) => {
    const contextInner = await createInnerContext(opts);
    const token = opts.req.headers.authorization?.split(" ")[1];

    return { ...contextInner, token, req: opts.req, res: opts.res };
};

export type InnerContext = inferAsyncReturnType<typeof createInnerContext>;
export type Context = inferAsyncReturnType<typeof createContext>;
