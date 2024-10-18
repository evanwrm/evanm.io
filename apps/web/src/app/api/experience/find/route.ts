import { experienceFindSchema } from "@/lib/services/api";
import { experienceFind } from "@/lib/services/sanity/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.searchParams;
    return Response.json(await experienceFind(experienceFindSchema.parse(params.get("data"))));
}
