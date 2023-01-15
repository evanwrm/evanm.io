"use client";

import { buttonVariants } from "@/lib/animation/framerVariants";
import { cn } from "@/lib/utils/styles";
import { HTMLMotionProps, m, Variants } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"div"> {
    variants?: Variants;
    className?: string;
    children?: React.ReactNode;
}

const IconButton = ({ variants = buttonVariants, className, children, ...props }: Props) => {
    return (
        <m.div
            className={cn(className, "cursor-pointer")}
            whileHover="hover"
            // whileFocus="hover"
            whileTap="tap"
            variants={variants}
            {...props}
        >
            {children}
        </m.div>
    );
};

export default IconButton;
