import { useLayoutEffect } from "react";

export const useBodyLock = () => {
    useLayoutEffect(() => {
        const body = document.body;
        const originalOverflow = window.getComputedStyle(body).getPropertyValue("overflow");
        const originalMargin = window.getComputedStyle(body).getPropertyValue("margin-right");
        const scrollbarWidth = window.innerWidth - body.clientWidth;
        body.style.setProperty("overflow", "hidden");
        body.style.setProperty("margin-right", `${scrollbarWidth + parseInt(originalMargin)}px`);
        return () => {
            body.style.setProperty("overflow", originalOverflow);
            body.style.setProperty("margin-right", originalMargin);
        };
    }, []);
};
