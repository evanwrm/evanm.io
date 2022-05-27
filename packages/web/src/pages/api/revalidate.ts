// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import getHandler from "../../lib/apiHandler";
import { REVALIDATE_SECRET } from "../../lib/constants";
import { APIError, UnauthorizedError } from "../../lib/errors";

interface RevalidateDto {
    revalidated?: boolean;
}

const handler = getHandler().get(
    async (req: NextApiRequest, res: NextApiResponse<RevalidateDto>) => {
        // Check for secret to confirm this is a valid request
        if (req.headers.token !== REVALIDATE_SECRET) throw new UnauthorizedError("Invalid token");

        try {
            // TODO: update when stable
            // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
            await res.unstable_revalidate("/path-to-revalidate");
            return res.json({ revalidated: true });
        } catch (err) {
            // If there was an error, Next.js will continue
            // to show the last successfully generated page
            throw new APIError(500, "Error revalidating");
        }
    }
);

export default handler;
