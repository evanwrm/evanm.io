"use client";

import { getRelativeOffset } from "@/lib/utils/dom";
import { cn } from "@/lib/utils/styles";
import React, { useEffect, useRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    tiltStrength?: number;
    reset?: boolean;
    reverse?: boolean;
}

const Tilt = ({ className, children, tiltStrength = 100, reset = true, ...props }: Props) => {
    const tiltRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (
            e: MouseEvent,
            referenceEl: HTMLDivElement,
            rect: {
                left: number;
                top: number;
                width: number;
                height: number;
            }
        ) => {
            const percentX = (e.pageX - rect.left) / rect.width;
            const percentY = (e.pageY - rect.top) / rect.height;
            const rotateX = (tiltStrength / 2 - tiltStrength * percentY).toFixed(3);
            const rotateY = -(tiltStrength / 2 - tiltStrength * percentX).toFixed(3);

            referenceEl.style.transform = `perspective(${1000}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
        };
        const handleMouseLeave = (referenceEl: HTMLDivElement) => {
            referenceEl.style.transform = `perspective(${1000}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        };

        const referenceEl = tiltRef.current;
        if (!referenceEl) return;

        let rect = getRelativeOffset(referenceEl);
        let updateCall: number | null = null;

        const mouseMove = (e: MouseEvent) => {
            if (updateCall !== null) cancelAnimationFrame(updateCall);
            updateCall = requestAnimationFrame(() => handleMouseMove(e, referenceEl, rect));
        };
        const mouseLeave = () => {
            if (reset) requestAnimationFrame(() => handleMouseLeave(referenceEl));
        };

        referenceEl.addEventListener("mousemove", mouseMove);
        referenceEl.addEventListener("mouseleave", mouseLeave);
        window.addEventListener("resize", () => (rect = getRelativeOffset(referenceEl)));

        return () => {
            referenceEl.removeEventListener("mousemove", mouseMove);
            referenceEl.removeEventListener("mouseleave", mouseLeave);
        };
    }, [tiltRef, tiltStrength, reset]);

    return (
        <div ref={tiltRef} className={cn("will-change-transform", className)} {...props}>
            {children}
        </div>
    );
};

export default Tilt;
