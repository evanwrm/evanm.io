import RootProviders from "@/app/RootProviders";
import Analytics from "@/components/analytics/Analytics";
import BackToTop from "@/components/navigation/BackToTop";
import ProgressBar from "@/components/ProgressBar";
import { cn } from "@/lib/utils/styles";
import "@/styles/globals.css";
import "@/styles/prism.css";
import { Fira_Code, Plus_Jakarta_Sans } from "@next/font/google";
import "katex/dist/katex.css";
import React from "react";

const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans"
});
const fontMono = Fira_Code({
    subsets: ["latin"],
    variable: "--font-mono"
});

// export const reportWebVitals = (metric: NextWebVitalsMetric) => {
//     const body = JSON.stringify(metric);
//     const url = "/";

//     if (navigator.sendBeacon) {
//         navigator.sendBeacon(url, body);
//     } else {
//         fetch(url, { body, method: "POST", keepalive: true });
//     }
// };

interface Props {
    children?: React.ReactNode;
}

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
