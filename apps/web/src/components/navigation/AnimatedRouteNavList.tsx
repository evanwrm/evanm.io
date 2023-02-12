"use client";

import FadeIn from "@/components/animation/FadeIn.";
import NavLink from "@/components/navigation/NavLink";
import { lightBounceTransition } from "@/lib/animation/framerVariants";
import { cn } from "@/lib/utils/styles";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    routes: { path: string; label: string }[];
    onElementClick?: React.MouseEventHandler;
    className?: string;
    itemClassName?: string;
}

const RouteNavList = ({ routes, className, itemClassName, onElementClick, ...props }: Props) => {
    return (
        <ul className={cn(className)} {...props}>
            {routes.map((route, i) => (
                <FadeIn transition={{ ...lightBounceTransition, delay: i * 0.05 }} key={route.path}>
                    <li className={cn("px-4 py-2", itemClassName)}>
                        <NavLink
                            href={route.path}
                            aria-label={route.label}
                            onClick={onElementClick}
                            className="link-underline from-secondary/20 to-secondary/80 rounded bg-gradient-to-r font-bold opacity-80 transition-all hover:opacity-100"
                        >
                            <span className="text-base-content">{route.label}</span>
                        </NavLink>
                    </li>
                </FadeIn>
            ))}
        </ul>
    );
};

export default RouteNavList;
