import { AnimatePresence, LazyMotion } from "framer-motion";
import "katex/dist/katex.css";
import { KBarProvider } from "kbar";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import PageSeo from "../components/PageSeo";
import ProgressBar from "../components/ProgressBar";
import { generateStaticSpotlightActions } from "../lib/spotlightActions";
import { NEXT_PUBLIC_SITE_URL, NODE_ENV } from "../lib/utils/constants";
import { trpc } from "../lib/utils/trpc";
import "../styles/globals.css";
import "../styles/prism.css";

const DynamicSpotlight = dynamic(() => import("../components/navigation/Spotlight"), {
    suspense: true,
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
        <>
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
                            <PageSeo />
                            <ProgressBar options={{ showSpinner: false, trickleSpeed: 300 }} />
                            <Suspense fallback={null}>
                                <DynamicSpotlight />
                            </Suspense>
                            <Component {...pageProps} />
                            {NODE_ENV !== "production" && (
                                <div className="hidden md:block">
                                    <ReactQueryDevtools initialIsOpen={false} />
                                </div>
                            )}
                        </KBarProvider>
                    </ThemeProvider>
                </AnimatePresence>
            </LazyMotion>
        </>
    );
};

export default trpc.withTRPC(AppWrapper);
