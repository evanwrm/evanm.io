import { publicationFindSchema } from "@/lib/services/api";
import { publicationFind } from "@/lib/services/sanity/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.searchParams;
    return Response.json(await publicationFind(publicationFindSchema.parse(params.get("data"))));
}
