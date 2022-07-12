import clsx from "clsx";
import React from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

const RoundedContainer = ({ className, children }: Props) => {
    return (
        <span
            className={clsx(
                className,
                "mx-2 inline-flex items-center justify-center rounded-full p-3 text-center", // border-2
                "bg-base-content/10" // border-accent/10
            )}
        >
            {children}
        </span>
    );
};

export default RoundedContainer;
