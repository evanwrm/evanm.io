"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
    tiltStrength?: number;
}
export function Tilt({
    tiltStrength = 10,
    children,
    className,
    ...props
}: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1000px) rotateX(${-y * tiltStrength}deg) rotateY(${x * tiltStrength}deg)`;
    };

    const handleMouseLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "";
    };

    return (
        <div
            ref={ref}
            role="group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "transition-transform duration-300 ease-out will-change-transform",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
