import { HexBackground } from "@/components/background-hex";
import { Footer } from "@/components/templates/footer";
import { Header } from "@/components/templates/header";
import { env } from "@/lib/env/client.mjs";
import React from "react";

const headerRoutes = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/#projects",
        label: "Projects"
    },
    {
        href: "/#publications",
        label: "Publications"
    },
    {
        href: `${env.NEXT_PUBLIC_SITE_URL}/cv`,
        label: "CV"
    }
];

interface Props {
    children: React.ReactNode;
}

export default function LandingLayout({ children }: Props) {
    return (
        <>
            <Header routes={headerRoutes} />
            <HexBackground className="text-foreground/40 h-48" />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer routes={headerRoutes} />
        </>
    );
}
