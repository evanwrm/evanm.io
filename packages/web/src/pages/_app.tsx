import { LazyMotion } from "framer-motion";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import ProgressBar from "../components/ProgressBar";
import { SITE_URL } from "../lib/constants";
import "../styles/globals.css";

const AppWrapper: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps
}: AppProps) => {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
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

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: Infinity
                    }
                }
            })
    );

    // const loadFeatures = () => import("../lib/framerFeatures").then(mod => mod.default);

    return (
        <React.Fragment>
            <DefaultSeo
                openGraph={{
                    url: SITE_URL,
                    type: "website"
                }}
            />
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <LazyMotion
                        features={async () => (await import("../lib/framerFeatures")).default}
                        strict
                    >
                        <ThemeProvider defaultTheme="system">
                            <ProgressBar options={{ showSpinner: false, trickleSpeed: 300 }} />
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </LazyMotion>
                </Hydrate>
            </QueryClientProvider>
        </React.Fragment>
    );
};

export default AppWrapper;
