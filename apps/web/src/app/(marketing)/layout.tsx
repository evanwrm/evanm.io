import MarketingProviders from "@/app/(marketing)/MarketingProviders";
import RouteTransition from "@/components/animation/RouteTransition";
import HexBackdrop from "@/components/HexBackdrop";
import Spotlight from "@/components/navigation/Spotlight";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import React from "react";

interface Props {
    children: React.ReactNode;
}

// TODO: Fix Suspense
// const DynamicSpotlight = React.lazy(() => import("@/components/navigation/Spotlight"));

const MarketingLayout = ({ children }: Props) => {
    return (
        <MarketingProviders>
            <div className="flex min-h-screen flex-col items-center justify-center overflow-clip">
                {/* @ts-expect-error Server Component */}
                <Header title="Home" />
                <HexBackdrop className="text-base-content/40 mt-16" />
                {/* <Suspense fallback={null}> */}
                <Spotlight />
                {/* </Suspense> */}
                <RouteTransition>{children}</RouteTransition>
                {/* @ts-expect-error Server Component */}
                <Footer />
            </div>
        </MarketingProviders>
    );
};

export default MarketingLayout;
