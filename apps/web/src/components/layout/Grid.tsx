import clsx from "clsx";
import React from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

const Grid = ({ className, children }: Props) => {
    return (
        <div className={clsx(className, "grid w-full", "grid-cols-1 md:grid-cols-2")}>
            {children}
        </div>
    );
};

export default Grid;
