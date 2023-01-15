import { env } from "@/lib/env/server.mjs";
import { apiProcedure, procedure, router } from "@/lib/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const systemRouter = router({
    healthz: procedure.query(async () => {
        return { status: "success" };
    }),
    revalidatez: apiProcedure
        .input(z.object({ path: z.string() }))
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
                return res?.json({ status: "success" });
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
