import { seoFind } from "@/lib/services/sanity/api";

export async function GET() {
    return Response.json(await seoFind());
}
