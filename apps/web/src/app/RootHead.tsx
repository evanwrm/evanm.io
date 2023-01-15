import { env } from "@/lib/env/client.mjs";
import { NextSeo } from "next-seo";

const DefaultHead = () => {
    return (
        <>
            {/* prettier-ignore */}
            <>
                <meta charSet="utf-8" />
                <meta 
                    name="viewport" 
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" 
                />
                
                <meta name="application-name" content="evanm.io PWA" />
                <meta name="theme-color" content="#000" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />

                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="evanm.io PWA" />

                <meta name="msapplication-config" content="/static/favicons/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="msapplication-TileImage" content="/static/favicons/mstile-144x144.png" />
                <meta name="msapplication-tap-highlight" content="no" />

                <link rel="manifest" href="/manifest.webmanifest" />       
                <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
                <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
            </>
            <NextSeo
                useAppDir={true}
                openGraph={{
                    url: env.NEXT_PUBLIC_SITE_URL,
                    type: "website",
                    images: [
                        {
                            url: `${env.NEXT_PUBLIC_SITE_URL}/static/favicons/apple-touch-icon.png`,
                            width: 180,
                            height: 180,
                            alt: "evanm.io logo",
                            type: "image/png"
                        }
                    ]
                }}
            />
        </>
    );
};

export default DefaultHead;
