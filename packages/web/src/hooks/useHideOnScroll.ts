import { useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";

export const useHideOnScroll = (threshold: number) => {
    const { scrollY } = useViewportScroll();
    const [hidden, setHidden] = useState(false);
    const [travel, setTravel] = useState(0);

    const updateTravel = () => {
        const delta = scrollY.get() - scrollY.getPrevious();
        setTravel(prevTravel => prevTravel + delta);
    };

    useEffect(() => {
        const unsubscribeY = scrollY.onChange(updateTravel);

        return () => {
            unsubscribeY();
        };
    }, []);

    useEffect(() => {
        if (travel > threshold) {
            setHidden(true);
            setTravel(travel % threshold);
        } else if (travel < -threshold) {
            setHidden(false);
            setTravel(travel % threshold);
        }
    }, [travel]);

    return { hidden, travel };
};
