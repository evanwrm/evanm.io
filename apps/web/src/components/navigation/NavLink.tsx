import { cn } from "@/lib/utils/styles";
import { isExternal } from "@/lib/utils/uri";
import Link, { LinkProps } from "next/link";
import React from "react";

interface Props extends Pick<LinkProps, "href">, React.HTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode;
    className?: string;
}

const NavLink = ({ href, className, children, ...props }: Props) => {
    const url = typeof href === "string" ? href : href.href ?? "";

    if (isExternal(url))
        return (
            <a
                href={url}
                className={cn(className)}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );

    return (
        <Link className={cn(className)} href={href} {...props}>
            {children}
        </Link>
    );
};

export default NavLink;
