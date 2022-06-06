import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import React from "react";
import { isExternal } from "../lib/utils";

interface Props extends LinkProps, React.HTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode;
    className?: string;
}

const NavLink: React.FC<Props> = ({ href, as, className, children, ...props }: Props) => {
    const url = typeof href === "string" ? href : href.href ?? "";

    if (isExternal(url))
        return (
            <a
                href={url}
                className={clsx(className)}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );

    return (
        <Link href={href} as={as} passHref>
            <a className={clsx(className)} {...props}>
                {children}
            </a>
        </Link>
    );
};

export default NavLink;
