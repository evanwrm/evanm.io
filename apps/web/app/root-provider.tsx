"use client";

import { LazyMotion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { env } from "@/lib/env/client.mjs";

interface Props {
    children: React.ReactNode;
}

export const RootProvider = ({ children }: Props) => {
    useEffect(() => {
        if (env.NEXT_PUBLIC_NODE_ENV === "production") {
            // eslint-disable-next-line no-console
            console.log(
                `%c
███████╗██╗   ██╗ █████╗ ███╗   ██╗   ██╗ ██████╗ 
██╔════╝██║   ██║██╔══██╗████╗  ██║   ██║██╔═══██╗
█████╗  ██║   ██║███████║██╔██╗ ██║   ██║██║   ██║
██╔══╝  ╚██╗ ██╔╝██╔══██║██║╚██╗██║   ██║██║   ██║
███████╗ ╚████╔╝ ██║  ██║██║ ╚████║██╗██║╚██████╔╝
╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝ ╚═════╝ 
    `,
                "font-family:monospace;color:#4b6bfb;font-size:12px;",
            );
        }
    }, []);

    return (
        <LazyMotion
            features={() =>
                import("@/lib/animation/framer-features").then(
                    res => res.default,
                )
            }
            strict
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <TooltipProvider delayDuration={300}>
                    {children}
                </TooltipProvider>
            </ThemeProvider>
        </LazyMotion>
    );
};
