import { z } from "zod";

export const routeRevalidateSchema = z.object({
    path: z.string(),
    type: z.enum(["page", "layout"]).optional(),
});

export type RouteRevalidate = z.infer<typeof routeRevalidateSchema>;
