import MarketingProviders from "@/app/(marketing)/MarketingProviders";
import RouteTransition from "@/components/animation/RouteTransition";
import HexBackdrop from "@/components/HexBackdrop";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import React, { Suspense } from "react";

interface Props {
    children: React.ReactNode;
}

const DynamicSpotlight = React.lazy(() => import("@/components/navigation/Spotlight"));

const MarketingLayout = ({ children }: Props) => {
    return (
        <MarketingProviders>
            <div className="flex min-h-screen flex-col items-center justify-center overflow-clip">
                <Header title="Home" />
                <HexBackdrop className="text-base-content/40 mt-16" />
                <Suspense>
                    <DynamicSpotlight />
                </Suspense>
                <RouteTransition>{children}</RouteTransition>
                <Footer />
            </div>
        </MarketingProviders>
    );
};

export default MarketingLayout;
