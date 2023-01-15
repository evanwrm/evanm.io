import { useLayoutEffect } from "react";

export const useBodyLock = () => {
    useLayoutEffect(() => {
        const body = document.body;
        const originalStyle = window.getComputedStyle(body).getPropertyValue("overflow");
        body.style.setProperty("overflow", "hidden");
        return () => body.style.setProperty("overflow", originalStyle);
    }, []);
};
