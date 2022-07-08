import clsx from "clsx";
import { HTMLMotionProps, m, Variants } from "framer-motion";
import React from "react";
import { buttonVariants } from "../../lib/framerVariants";

interface Props extends HTMLMotionProps<"div"> {
    variants?: Variants;
    className?: string;
    children?: React.ReactNode;
}

const IconButton: React.FC<Props> = ({
    variants = buttonVariants,
    className,
    children,
    ...props
}: Props) => {
    return (
        <m.div
            className={clsx(className, "cursor-pointer")}
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
