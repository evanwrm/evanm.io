import clsx from "clsx";
import { HTMLMotionProps, m, Variants } from "framer-motion";
import React from "react";
import { lightBounceTransition, slideFadeRightVariants } from "../../lib/framerVariants";

interface Props extends HTMLMotionProps<"div"> {
    variants?: Variants;
    className?: string;
    children?: React.ReactNode;
}

const FadeIn: React.FC<Props> = ({
    variants = slideFadeRightVariants,
    className,
    children,
    ...props
}: Props) => {
    return (
        <m.div
            className={clsx(className)}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            viewport={{ amount: 0.05 }}
            transition={lightBounceTransition}
            {...props}
        >
            {children}
        </m.div>
    );
};

export default FadeIn;
