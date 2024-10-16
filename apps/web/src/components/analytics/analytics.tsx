"use client";

import { Analytics as NextAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Analytics = () => {
    return (
        <>
            <NextAnalytics />
            <SpeedInsights />
        </>
    );
};

export default Analytics;
