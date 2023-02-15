import { env } from "@/lib/env/server.mjs";
import { apiProcedure, procedure, router } from "@/lib/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const systemRouter = router({
    healthz: procedure
        .meta({
            openapi: {
                method: "GET",
                path: "/healthz"
            }
        })
        .input(z.void())
        .output(z.object({ status: z.string() }))
        .query(async () => {
            return { status: "success" };
        }),
    revalidatez: apiProcedure
        .meta({
            openapi: {
                method: "POST",
                path: "/revalidatez"
            }
        })
        .input(z.object({ path: z.string() }))
        .output(z.object({ status: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { token, res } = ctx;
            const { path } = input;

            // Check for secret to confirm this is a valid request
            if (token !== env.REVALIDATE_SECRET)
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Invalid token"
                });

            try {
                await res?.revalidate(path);
                return { status: "success" };
            } catch (err) {
                // If there was an error, Next.js will continue
                // to show the last successfully generated page
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    cause: err as Error,
                    message: "Error revalidating"
                });
            }
        })
});
