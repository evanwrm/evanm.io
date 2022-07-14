import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export const useHideOnScroll = (
    threshold: number,
    showThreshold: number = -1,
    invert: boolean = false
) => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(invert);
    const [travel, setTravel] = useState(0);

    useEffect(() => {
        const updateTravel = () => {
            if (showThreshold > 0 && scrollY.get() < showThreshold) {
                setTravel(0);
                setHidden(invert);
            } else {
                const delta = scrollY.get() - scrollY.getPrevious();
                setTravel(prevTravel => prevTravel + delta);
            }
        };

        const unsubscribeY = scrollY.onChange(updateTravel);

        return () => {
            unsubscribeY();
        };
    }, [invert, showThreshold, scrollY]);

    useEffect(() => {
        const thresholdInverted = threshold < 0;

        if (travel > Math.abs(threshold)) {
            setHidden(!invert || thresholdInverted);
            setTravel(0);
        } else if (travel < -Math.abs(threshold)) {
            setHidden(invert && !thresholdInverted);
            setTravel(0);
        }
    }, [invert, threshold, travel]);

    return { hidden, travel };
};
