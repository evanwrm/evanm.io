import { openApiDocument } from "@/lib/server/openapi";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest) => {
    return NextResponse.json(openApiDocument, { status: 200 });
};

export const revalidate = 3600;
