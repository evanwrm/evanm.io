import { socialFindSchema } from "@/lib/services/api";
import { socialFind } from "@/lib/services/sanity/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.searchParams;
    return Response.json(await socialFind(socialFindSchema.parse(params.get("data"))));
}
