import { RootProvider } from "@/app/root-provider";
import Analytics from "@/components/analytics/analytics";
import BackToTop from "@/components/navigation/back-to-top";
import { env } from "@/lib/env/client.mjs";
import { seoFind } from "@/lib/services/sanity/api";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/prism.css";
import "katex/dist/katex.css";
import type { Metadata, Viewport } from "next";
import { Fira_Code, Plus_Jakarta_Sans } from "next/font/google";
import React, { Suspense } from "react";
import Loading from "./loading";

const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap"
});
const fontMono = Fira_Code({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap"
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
    const seo = await seoFind();

    return {
        metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
        title: {
            default: seo.title ?? env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
            template: seo.titleTemplate ?? `%s | ${env.NEXT_PUBLIC_DEFAULT_SITE_TITLE}`
        },
        description: seo.description ?? undefined,
        applicationName: env.NEXT_PUBLIC_DEFAULT_APPLICATION_NAME,
        authors: seo.authors,
        keywords: seo.keywords,
        referrer: "origin-when-cross-origin",
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
        openGraph: {
            title: seo.title ?? env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
            description: seo.description ?? undefined,
            url: seo.openGraph?.url ?? env.NEXT_PUBLIC_SITE_URL,
            siteName: seo.openGraph?.siteName ?? env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
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
export const viewport: Viewport = {
    themeColor: "#000",
    colorScheme: "dark light",
    width: "device-width",
    initialScale: 1,
    minimumScale: 1
};

export default function Layout({ children }: Props) {
    return (
        <html
            lang="en"
            dir="ltr"
            className={cn(fontSans.variable, fontMono.variable)}
            suppressHydrationWarning
        >
            <body className="scrollbar bg-background text-foreground transition duration-150">
                <RootProvider>
                    <div vaul-drawer-wrapper="">
                        <div className="bg-background relative flex min-h-screen flex-col overflow-clip">
                            <Analytics />
                            <Suspense fallback={<Loading />}>{children}</Suspense>
                            <BackToTop />
                        </div>
                    </div>
                </RootProvider>
            </body>
        </html>
    );
}
