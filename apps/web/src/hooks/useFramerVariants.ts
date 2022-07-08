import { Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface VariantConfig {
    disableMountAnimation: boolean;
}

export const useFramerVariants = (
    initialVariants: Variants,
    { disableMountAnimation }: VariantConfig
) => {
    const [variants, setVariants] = useState<Variants>({ ...initialVariants, hidden: {} });

    useEffect(() => {
        if (disableMountAnimation)
            setVariants(oldVariants => ({ ...oldVariants, hidden: initialVariants?.hidden }));
    }, [initialVariants, disableMountAnimation]);

    return variants;
};
