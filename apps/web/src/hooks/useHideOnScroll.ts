import { useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";

export const useHideOnScroll = (threshold: number, showThreshold: number = -1) => {
    const { scrollY } = useViewportScroll();
    const [hidden, setHidden] = useState(false);
    const [travel, setTravel] = useState(0);

    useEffect(() => {
        const updateTravel = () => {
            if (showThreshold > 0 && scrollY.get() < showThreshold) {
                setTravel(0);
                setHidden(false);
            } else {
                const delta = scrollY.get() - scrollY.getPrevious();
                setTravel(prevTravel => prevTravel + delta);
            }
        };

        const unsubscribeY = scrollY.onChange(updateTravel);

        return () => {
            unsubscribeY();
        };
    }, [showThreshold, scrollY]);

    useEffect(() => {
        if (travel > threshold) {
            setHidden(true);
            setTravel(travel % threshold);
        } else if (travel < -threshold) {
            setHidden(false);
            setTravel(travel % threshold);
        }
    }, [threshold, travel]);

    return { hidden, travel };
};
