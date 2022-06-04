import { useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";

export const useHideOnScroll = (threshold: number) => {
    const { scrollY } = useViewportScroll();
    const [hidden, setHidden] = useState(false);

    const updateHidden = () => {
        const delta = scrollY.get() - scrollY.getPrevious();

        if (delta > threshold) setHidden(true);
        else if (delta < -threshold) setHidden(false);
    };

    useEffect(() => {
        const unsubscribeY = scrollY.onChange(updateHidden);

        return () => {
            unsubscribeY();
        };
    }, []);

    return { hidden };
};
