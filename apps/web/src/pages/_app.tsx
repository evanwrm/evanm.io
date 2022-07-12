import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { withTRPC } from "@trpc/next";
import { AnimatePresence, LazyMotion } from "framer-motion";
import "katex/dist/katex.css";
import { KBarProvider } from "kbar";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import superjson from "superjson";
import ProgressBar from "../components/ProgressBar";
import { AppRouter } from "../lib/server/routers/app";
import { generateStaticSpotlightActions } from "../lib/spotlightActions";
import { NEXT_PUBLIC_SITE_URL, NODE_ENV } from "../lib/utils/constants";
import { getBaseUrl } from "../lib/utils/uri";
import "../styles/globals.css";
import "../styles/prism.css";

const DynamicSpotlight = dynamic(() => import("../components/navigation/Spotlight"), {
    ssr: false
});

const AppWrapper: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps
}: AppProps) => {
    const router = useRouter();

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
                        <KBarProvider
                            actions={generateStaticSpotlightActions(router)}
                            options={{ enableHistory: true, toggleShortcut: "$mod+k" }}
                        >
                            <ProgressBar options={{ showSpinner: false, trickleSpeed: 300 }} />
                            <DynamicSpotlight />
                            <Component {...pageProps} />
                            <ReactQueryDevtools initialIsOpen={false} />
                        </KBarProvider>
                    </ThemeProvider>
                </AnimatePresence>
            </LazyMotion>
        </React.Fragment>
    );
};

export default withTRPC<AppRouter>({
    config() {
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
