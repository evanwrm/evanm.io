import { articleIncrementViewsSchema } from "@/lib/services/api";
import { articleIncrementViews } from "@/lib/services/sanity/api";

export async function POST(req: Request) {
    const data = await req.json();
    await articleIncrementViews(articleIncrementViewsSchema.parse(data));
    return Response.json({ status: "success", now: Date.now() });
}
