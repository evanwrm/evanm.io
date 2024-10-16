"use client";

import {
    SlideDirection,
    lightBounceTransition,
    slideFadeRegistry
} from "@/lib/animation/framer-variants";
import { cn } from "@/lib/utils";
import { Transition, Variants, m } from "framer-motion";
import React from "react";

interface Props {
    variants?: Variants | SlideDirection;
    transition?: Transition;
    once?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const FadeIn = ({
    variants = "bottom",
    transition = lightBounceTransition,
    once = true,
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
            viewport={{ amount: 0.1, once }}
            transition={transition}
        >
            {children}
        </m.div>
    );
};
