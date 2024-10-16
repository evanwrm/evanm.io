"use client";

import { buttonVariants } from "@/lib/animation/framer-variants";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, m, Variants } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
    variants?: Variants;
}

export const HoverButton = ({
    variants = buttonVariants,
    className,
    children,
    ...props
}: Props) => {
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
