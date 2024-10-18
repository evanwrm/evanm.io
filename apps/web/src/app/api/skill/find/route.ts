import { skillFindSchema } from "@/lib/services/api";
import { skillFind } from "@/lib/services/sanity/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.searchParams;
    return Response.json(await skillFind(skillFindSchema.parse(params.get("data"))));
}
