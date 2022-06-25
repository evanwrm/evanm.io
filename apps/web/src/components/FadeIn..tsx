import clsx from "clsx";
import { HTMLMotionProps, m } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"div"> {
    className?: string;
    children?: React.ReactNode;
}

const FadeIn: React.FC<Props> = ({ className, children, ...props }: Props) => {
    return (
        <m.div
            className={clsx(className)}
            initial={{ x: 25, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.05 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
            {...props}
        >
            {children}
        </m.div>
    );
};

export default FadeIn;
