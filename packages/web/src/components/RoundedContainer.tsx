import clsx from "clsx";
import React from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

const RoundedContainer: React.FC<Props> = ({ className, children }: Props) => {
    return (
        <span
            className={clsx(
                className,
                "p-3 mx-2 inline-flex justify-center items-center text-center rounded-full", // border-2
                "bg-base-content/10" // border-accent/10
            )}
        >
            {children}
        </span>
    );
};

export default RoundedContainer;
