"use client";

import { useStaticSpotlightActions } from "@/hooks/useSpotlightActions";
import { env } from "@/lib/env/client.mjs";
import { trpc } from "@/lib/utils/trpc";
import { getBaseUrl } from "@/lib/utils/uri";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink, httpLink, loggerLink, splitLink } from "@trpc/react-query";
import { LazyMotion } from "framer-motion";
import { KBarProvider } from "kbar";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";

interface Props {
    children: React.ReactNode;
}

// TODO: dynamic meta not supported
// const DynamicMeta = () => {
//     const { resolvedTheme } = useTheme();
//     return (
//         <head>
//             <meta name="theme-color" content={resolvedTheme === "dark" ? "#000" : "#fff"} />
//         </head>
//     );
// };

export const ClientProvider = ({ children }: Props) => {
    const url = `${getBaseUrl()}/api/trpc`;
    const [queryClient] = useState(
        () => new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } })
    );
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                loggerLink({
                    enabled: opts =>
                        env.NEXT_PUBLIC_NODE_ENV === "development" ||
                        (opts.direction === "down" && opts.result instanceof Error)
                }),
                splitLink({
                    condition(op) {
                        return op.context.skipBatch === true;
                    },
                    true: httpLink({ url }),
                    false: httpBatchLink({ url, maxURLLength: 2048 })
                })
            ],
            transformer: SuperJSON
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};

const RootProviders = ({ children }: Props) => {
    const [actions] = useStaticSpotlightActions();

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
                "font-family:monospace;color:#4b6bfb;font-size:12px;"
            );
        }
    }, []);

    return (
        <ClientProvider>
            <LazyMotion
                features={() => import("@/lib/animation/framerFeatures").then(res => res.default)}
                strict
            >
                <ThemeProvider defaultTheme="system">
                    <KBarProvider
                        actions={actions}
                        options={{ enableHistory: true, toggleShortcut: "$mod+k" }}
                    >
                        {/* <DynamicMeta /> */}
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </KBarProvider>
                </ThemeProvider>
            </LazyMotion>
        </ClientProvider>
    );
};

export default RootProviders;
