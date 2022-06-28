import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { withTRPC } from "@trpc/next";
import { AnimatePresence, LazyMotion } from "framer-motion";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import superjson from "superjson";
import ProgressBar from "../components/ProgressBar";
import { AppRouter } from "../lib/server/routers/app";
import { NEXT_PUBLIC_SITE_URL, NODE_ENV, VERCEL_URL } from "../lib/utils/constants";
import "../styles/globals.css";

const AppWrapper: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps
}: AppProps) => {
    useEffect(() => {
        if (NODE_ENV === "production") {
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
        <React.Fragment>
            <DefaultSeo
                openGraph={{
                    url: NEXT_PUBLIC_SITE_URL,
                    type: "website",
                    images: [
                        {
                            url: `${NEXT_PUBLIC_SITE_URL}/favicons/apple-touch-icon.png`,
                            width: 180,
                            height: 180,
                            alt: "evanm.io logo",
                            type: "image/png"
                        }
                    ]
                }}
            />
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
            </Head>
            <LazyMotion
                features={async () => (await import("../lib/framerFeatures")).default}
                strict
            >
                <AnimatePresence exitBeforeEnter>
                    <ThemeProvider defaultTheme="system">
                        <ProgressBar options={{ showSpinner: false, trickleSpeed: 300 }} />
                        <Component {...pageProps} />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </ThemeProvider>
                </AnimatePresence>
            </LazyMotion>
        </React.Fragment>
    );
};

export default withTRPC<AppRouter>({
    config() {
        const getBaseUrl = () => {
            if (typeof window !== "undefined") return "";
            if (VERCEL_URL) return VERCEL_URL;
            return NEXT_PUBLIC_SITE_URL;
        };

        // https://trpc.io/docs/links
        const url = `${getBaseUrl()}/api/trpc`;
        const links = [httpBatchLink({ url, maxBatchSize: 10 })];

        return {
            links,
            transformer: superjson,
            queryClientConfig: { defaultOptions: { queries: { staleTime: Infinity } } }
        };
    },
    ssr: false // https://github.com/trpc/trpc/discussions/958
})(AppWrapper);
