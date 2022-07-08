import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";
import { env } from "../env";

export const systemRouter = createRouter()
    .query("healthz", {
        async resolve() {
            return { status: "success" };
        }
    })
    .mutation("revalidatez", {
        input: z.object({ path: z.string() }),
        async resolve({ ctx, input }) {
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
                    cause: err,
                    message: "Error revalidating"
                });
            }
        }
    });
