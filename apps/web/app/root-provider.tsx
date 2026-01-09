"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LazyMotion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { env } from "@/lib/env/client.mjs";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
});

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
        <QueryClientProvider client={queryClient}>
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
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-left"
            />
        </QueryClientProvider>
    );
};
