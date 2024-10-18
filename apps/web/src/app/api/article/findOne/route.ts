import { articleFindOneSchema } from "@/lib/services/api";
import { articleFindOne } from "@/lib/services/sanity/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.searchParams;
    return Response.json(await articleFindOne(articleFindOneSchema.parse(params.get("data"))));
}
