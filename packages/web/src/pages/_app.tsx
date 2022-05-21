import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";

const AppWrapper: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps
}: AppProps) => {
    return (
        <React.Fragment>
            <DefaultSeo
                titleTemplate={`%s | ${process.env.siteDisplayName}`}
                title={process.env.siteDisplayName}
                description={process.env.description}
                openGraph={{
                    title: process.env.siteDisplayName,
                    type: "website",
                    locale: process.env.locale,
                    site_name: process.env.siteName
                }}
            />
            <Component {...pageProps} />
        </React.Fragment>
    );
};

export default AppWrapper;
