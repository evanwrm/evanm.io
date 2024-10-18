import { projectFindSchema } from "@/lib/services/api";
import { projectFind } from "@/lib/services/sanity/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.searchParams;
    return Response.json(await projectFind(projectFindSchema.parse(params.get("data"))));
}
