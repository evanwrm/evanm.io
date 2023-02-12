"use client";

import { lightBounceTransition, slideFadeRightVariants } from "@/lib/animation/framerVariants";
import { cn } from "@/lib/utils/styles";
import { HTMLMotionProps, m, Transition, Variants } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"div"> {
    variants?: Variants;
    transition?: Transition;
    className?: string;
    children?: React.ReactNode;
}

const FadeIn = ({
    variants = slideFadeRightVariants,
    transition = lightBounceTransition,
    className,
    children
}: Props) => {
    return (
        <m.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            viewport={{ amount: 0.05 }}
            transition={transition}
        >
            {children}
        </m.div>
    );
};

export default FadeIn;
