import Document, { Head, Html, Main, NextScript } from "next/document";
// import { themeColor } from "../components/ThemeProvider";

class DocumentWrapper extends Document {
    // `getInitialProps` belongs to `_document` (instead of `_app`),
    // it's compatible with server-side generation (SSG).
    // static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    //     // Resolution order
    //     //
    //     // On the server:
    //     // 1. app.getInitialProps
    //     // 2. page.getInitialProps
    //     // 3. document.getInitialProps
    //     // 4. app.render
    //     // 5. page.render
    //     // 6. document.render
    //     //
    //     // On the server with error:
    //     // 1. document.getInitialProps
    //     // 2. app.render
    //     // 3. page.render
    //     // 4. document.render
    //     //
    //     // On the client
    //     // 1. app.getInitialProps
    //     // 2. page.getInitialProps
    //     // 3. app.render
    //     // 4. page.render

    //     const originalRenderPage = ctx.renderPage;

    //     ctx.renderPage = () =>
    //         originalRenderPage({
    //             enhanceApp: App => props => <App {...props} />,
    //             enhanceComponent: Component => Component
    //         });

    //     const initialProps = await Document.getInitialProps(ctx);

    //     return {
    //         ...initialProps
    //     };
    // }

    render(): JSX.Element {
        return (
            <Html>
                {/* prettier-ignore */}
                <Head>
                    <link rel="preload" href="/fonts/Inter-roman.var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                    <link rel="preload" href="/fonts/FiraCode-VF.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                    
                    <meta name="application-name" content="evanm.io PWA" />
                    <meta name="theme-color" content="#ffffff" />
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
                </Head>
                <body className="transition duration-150 scrollbar">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default DocumentWrapper;
