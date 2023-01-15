import { env } from "@/lib/env/client.mjs";

export const headerRoutes = [
    {
        path: "/",
        label: "Home"
    },
    {
        path: "/#projects",
        label: "Projects"
    },
    {
        path: "/#publications",
        label: "Publications"
    },
    {
        path: `${env.NEXT_PUBLIC_SITE_URL}/cv`,
        label: "CV"
    }
];
