import { landingFind } from "@/lib/services/sanity/api";

export async function GET() {
    return Response.json(await landingFind());
}
