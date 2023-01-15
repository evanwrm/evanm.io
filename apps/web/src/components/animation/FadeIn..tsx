"use client";

import { lightBounceTransition, slideFadeRightVariants } from "@/lib/animation/framerVariants";
import { cn } from "@/lib/utils/styles";
import { HTMLMotionProps, m, Variants } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"div"> {
    variants?: Variants;
    className?: string;
    children?: React.ReactNode;
}

const FadeIn = ({ variants = slideFadeRightVariants, className, children }: Props) => {
    return (
        <m.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            viewport={{ amount: 0.05 }}
            transition={lightBounceTransition}
        >
            {children}
        </m.div>
    );
};

export default FadeIn;
