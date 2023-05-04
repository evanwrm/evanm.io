import RootProviders from "@/app/RootProviders";
import Analytics from "@/components/analytics/Analytics";
import BackToTop from "@/components/navigation/BackToTop";
import ProgressBar from "@/components/ProgressBar";
import { env } from "@/lib/env/client.mjs";
import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import { cn } from "@/lib/utils/styles";
import "@/styles/globals.css";
import "@/styles/prism.css";
import "katex/dist/katex.css";
import type { Metadata } from "next";
import { Fira_Code, Plus_Jakarta_Sans } from "next/font/google";
import React from "react";

const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans"
});
const fontMono = Fira_Code({
    subsets: ["latin"],
    variable: "--font-mono"
});

interface Props {
    children?: React.ReactNode;
}

// export const reportWebVitals = (metric: NextWebVitalsMetric) => {
//     const body = JSON.stringify(metric);
//     const url = "/";

//     if (navigator.sendBeacon) {
//         navigator.sendBeacon(url, body);
//     } else {
//         fetch(url, { body, method: "POST", keepalive: true });
//     }
// };

export const generateMetadata = async (): Promise<Metadata> => {
    const caller = appRouter.createCaller(await createInnerContext());
    const seo = await caller.seo.find();

    return {
        metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
        // charSet is automatically added
        title: {
            default: seo.title ?? env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
            template: seo.titleTemplate ?? `%s | ${env.NEXT_PUBLIC_DEFAULT_SITE_TITLE}`
        },
        description: seo.description ?? undefined,
        applicationName: env.NEXT_PUBLIC_DEFAULT_APPLICATION_NAME,
        authors: seo.authors,
        keywords: seo.keywords,
        referrer: "origin-when-cross-origin",
        themeColor: "#000",
        colorScheme: "dark light",
        viewport: {
            width: "device-width",
            initialScale: 1,
            minimumScale: 1
        },
        creator: seo.creator,
        publisher: seo.publisher,
        robots: {
            index: true,
            follow: true
        },
        alternates: {
            canonical: seo.canonical
        },
        icons: {
            // msapplication-* is no longer needed. browserconfig.xml is still present in assets
            icon: [
                { rel: "icon", url: "/static/favicons/favicon-32x32.png", sizes: "32x32" },
                { rel: "icon", url: "/static/favicons/favicon-16x16.png", sizes: "16x16" }
            ],
            shortcut: "/static/favicons/favicon.ico",
            apple: {
                rel: "apple-touch-icon",
                url: "/static/favicons/apple-touch-icon.png",
                sizes: "180x180"
            },
            other: [
                {
                    rel: "apple-touch-icon-precomposed",
                    url: "/static/favicons/apple-touch-icon-precomposed.png"
                },
                {
                    rel: "mask-icon",
                    url: "/static/favicons/safari-pinned-tab.svg"
                }
            ]
        },
        manifest: "/manifest.webmanifest",
        openGraph: {
            title: seo.title ?? env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
            description: seo.description ?? undefined,
            url: seo.openGraph?.url ?? env.NEXT_PUBLIC_SITE_URL,
            siteName: seo.openGraph?.site_name ?? env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
            locale: seo.openGraph?.locale ?? "en_US",
            type: "website",
            images: [
                {
                    url: `${env.NEXT_PUBLIC_SITE_URL}/static/favicons/apple-touch-icon.png`,
                    width: 180,
                    height: 180,
                    alt: `${env.NEXT_PUBLIC_DEFAULT_SITE_TITLE} logo`
                },
                ...((seo.openGraph?.images as any) ?? [])
            ]
        },
        twitter: {
            card: "summary",
            title: seo.title ?? env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
            description: seo.description ?? undefined,
            images: [
                {
                    url: `${env.NEXT_PUBLIC_SITE_URL}/static/favicons/apple-touch-icon.png`,
                    width: 180,
                    height: 180,
                    alt: `${env.NEXT_PUBLIC_DEFAULT_SITE_TITLE} logo`
                },
                ...((seo.openGraph?.images as any) ?? [])
            ]
        },
        appleWebApp: {
            capable: true,
            title: env.NEXT_PUBLIC_DEFAULT_APPLICATION_NAME,
            statusBarStyle: "default",
            startupImage: "/static/favicons/apple-touch-icon.png"
        },
        formatDetection: {
            email: false,
            address: false,
            telephone: false
        }
    };
};

const RootLayout = ({ children }: Props) => {
    return (
        <html
            lang="en"
            dir="ltr"
            className={cn(fontSans.variable, fontMono.variable)}
            suppressHydrationWarning
        >
            <body className="scrollbar transition duration-150">
                <RootProviders>
                    <Analytics />
                    <ProgressBar options={{ showSpinner: false, trickleSpeed: 300 }} />
                    {children}
                    <BackToTop />
                </RootProviders>
            </body>
        </html>
    );
};

export default RootLayout;
