import { educationFindSchema } from "@/lib/services/api";
import { educationFind } from "@/lib/services/sanity/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.searchParams;
    return Response.json(await educationFind(educationFindSchema.parse(params.get("data"))));
}
