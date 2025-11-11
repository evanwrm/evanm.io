"use client";

import {
    SlideDirection,
    lightBounceTransition,
    slideFadeRegistry
} from "@/lib/animation/framer-variants";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, m } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
    direction?: SlideDirection;
    once?: boolean;
}

export const FadeIn = ({
    direction = "bottom",
    transition = lightBounceTransition,
    once = true,
    className,
    children
}: Props) => {
    const variant = slideFadeRegistry[direction];
    return (
        <m.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            variants={variant}
            viewport={{ amount: 0.1, once }}
            transition={transition}
        >
            {children}
        </m.div>
    );
};
