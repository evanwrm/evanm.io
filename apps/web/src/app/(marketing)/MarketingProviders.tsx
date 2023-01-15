"use client";

import { useHydratedSpotlightActions } from "@/hooks/useSpotlightActions";
import { useRegisterActions } from "kbar";

interface Props {
    children: React.ReactNode;
}

const MarketingProviders = ({ children }: Props) => {
    const actions = useHydratedSpotlightActions();
    useRegisterActions(...actions);

    return <>{children}</>;
};

export default MarketingProviders;
