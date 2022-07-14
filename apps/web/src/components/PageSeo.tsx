import { NextSeo, NextSeoProps } from "next-seo";
import { useTheme } from "next-themes";
import Head from "next/head";

interface Props extends NextSeoProps {}

const PageSeo = (props: Props) => {
    const { resolvedTheme } = useTheme();

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
                <meta name="theme-color" content={resolvedTheme === "dark" ? "#000" : "#fff"} />
            </Head>
            <NextSeo {...props} />
        </>
    );
};

export default PageSeo;
