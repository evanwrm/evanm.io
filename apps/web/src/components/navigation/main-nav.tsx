"use client";

import { Link } from "@/components/navigation/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    routes: { href: string; label: string }[];
    className?: string;
    itemClassName?: string;
}

export const MainNav = ({ routes, className, itemClassName, ...props }: Props) => {
    const pathname = usePathname();

    return (
        <ul className={cn("flex gap-4", className)} {...props}>
            {routes.map(route => (
                <li
                    className={cn(
                        "text-foreground/60 hover:text-foreground/80 text-xs",
                        pathname === route.href ? "text-foreground" : "",
                        itemClassName
                    )}
                    key={route.href}
                >
                    <Link
                        href={route.href}
                        aria-label={route.label}
                        className={cn(
                            "text-center align-middle font-semibold transition-all",
                            "link-underline rounded bg-gradient-to-r from-red-600/20 to-red-600/80"
                        )}
                    >
                        {route.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
