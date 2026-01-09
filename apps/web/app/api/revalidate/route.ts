import { revalidatePath } from "next/cache";
import { env } from "@/lib/env/server.mjs";
import { routeRevalidateSchema } from "@/lib/validators/system";

export async function POST(req: Request) {
    const { path, type } = routeRevalidateSchema.parse(await req.json());
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    const now = Date.now();

    // Check for secret to confirm this is a valid request
    if (token !== env.REVALIDATE_SECRET)
        return Response.json(
            { message: "Invalid token", status: "error", now },
            { status: 401 },
        );

    if (path) {
        revalidatePath(path, type);
        return Response.json({ status: "success", now });
    }

    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return Response.json(
        { message: "Invalid path", status: "error", now },
        { status: 400 },
    );
}
