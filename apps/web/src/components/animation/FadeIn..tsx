"use client";

import {
    SlideDirection,
    lightBounceTransition,
    slideFadeRegistry
} from "@/lib/animation/framerVariants";
import { cn } from "@/lib/utils/styles";
import { Transition, Variants, m } from "framer-motion";
import React from "react";

interface Props {
    variants?: Variants | SlideDirection;
    transition?: Transition;
    className?: string;
    children?: React.ReactNode;
}

const FadeIn = ({
    variants = "bottom",
    transition = lightBounceTransition,
    className,
    children
}: Props) => {
    const variant = typeof variants === "string" ? slideFadeRegistry[variants] : variants;

    return (
        <m.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            variants={variant}
            viewport={{ amount: 0.1 }}
            transition={transition}
        >
            {children}
        </m.div>
    );
};

export default FadeIn;
