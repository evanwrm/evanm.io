import { articleFindSchema } from "@/lib/services/api";
import { articleFind } from "@/lib/services/sanity/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.searchParams;
    return Response.json(await articleFind(articleFindSchema.parse(params.get("data"))));
}
