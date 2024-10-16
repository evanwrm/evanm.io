import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export const useScrollX = () => {
    const { scrollX } = useScroll();
    const [x, setX] = useState(0);
    useMotionValueEvent(scrollX, "change", setX);
    return x;
};
export const useScrollY = () => {
    const { scrollY } = useScroll();
    const [y, setY] = useState(0);
    useMotionValueEvent(scrollY, "change", setY);
    return y;
};

interface HideOnScrollOptions {
    threshold: number;
    showThreshold?: number;
    invert?: boolean;
}
export const useHideOnScroll = ({
    threshold,
    showThreshold = -1,
    invert = false
}: HideOnScrollOptions) => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(invert);
    const [travel, setTravel] = useState(0);

    useEffect(() => {
        const updateTravel = () => {
            const y = scrollY.get();
            if (showThreshold > 0 && y < showThreshold) {
                setTravel(0);
                setHidden(invert);
                return;
            }

            const prevY = scrollY.getPrevious() ?? 0;
            const delta = y - prevY;
            setTravel(prevTravel => prevTravel + delta);
        };

        return scrollY.on("change", updateTravel);
    }, [invert, showThreshold, scrollY]);

    useEffect(() => {
        const absThreshold = Math.abs(threshold);
        const thresholdInverted = threshold < 0;

        if (travel > absThreshold) {
            setHidden(!invert || thresholdInverted);
            setTravel(0);
        } else if (travel < -absThreshold) {
            setHidden(invert && !thresholdInverted);
            setTravel(0);
        }
    }, [invert, threshold, travel]);

    return { hidden, travel };
};
