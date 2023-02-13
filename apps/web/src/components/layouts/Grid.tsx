import { cn } from "@/lib/utils/styles";
import React from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

const Grid = ({ className, children }: Props) => {
    return (
        <div className={cn("grid w-full", "grid-cols-1 md:grid-cols-2", className)}>{children}</div>
    );
};

export default Grid;
