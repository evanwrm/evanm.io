import { Context, InnerContext } from "@/lib/server/context";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { OpenApiMeta } from "trpc-openapi";

export const t = initTRPC
    .meta<OpenApiMeta>()
    .context<InnerContext>()
    .create({
        transformer: superjson,
        errorFormatter({ shape }) {
            return shape;
        }
    });

export const middleware = t.middleware;
export const router = t.router;

export const procedure = t.procedure;
export const apiProcedure = procedure.use(opts => {
    if (!opts.ctx.req || !opts.ctx.res) {
        throw new Error("You are missing `req` or `res` in your call.");
    }
    return opts.next({
        ctx: opts.ctx as Context
    });
});
