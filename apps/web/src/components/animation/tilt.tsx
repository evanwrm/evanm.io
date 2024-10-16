"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    tiltStrength?: number;
    reset?: boolean;
    reverse?: boolean;
}

export const Tilt = ({
    tiltStrength = 100,
    reset = true,
    children,
    className,
    ...props
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState({ left: 0, top: 0, width: 0, height: 0 });

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!ref.current) return;

            const percentX = (e.clientX - rect.left) / rect.width;
            const percentY = (e.clientY - rect.top) / rect.height;
            const rotateX = (tiltStrength / 2 - tiltStrength * percentY).toFixed(2);
            const rotateY = (tiltStrength / 2 - tiltStrength * percentX).toFixed(2);

            ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
            ref.current.style.transition = "none";
        },
        [tiltStrength, rect]
    );

    const handleMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el || !reset) return;

        el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        el.style.transition = "transform 300ms";
    }, [reset]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const resizeObserver = new ResizeObserver(() => {
            setRect(el.getBoundingClientRect());
        });

        resizeObserver.observe(el);
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            resizeObserver.disconnect();
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return (
        <div ref={ref} className={cn("will-change-transform", className)} {...props}>
            {children}
        </div>
    );
};
