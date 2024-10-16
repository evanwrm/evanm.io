import { cn } from "@/lib/utils";
import { isExternal } from "@/lib/utils/uri";
import NextLink, { LinkProps } from "next/link";
import React, { forwardRef } from "react";

interface Props
    extends Pick<LinkProps, "href">,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    children?: React.ReactNode;
    className?: string;
}

const Link = forwardRef<HTMLAnchorElement, Props>(
    ({ href, className, children, ...props }: Props, ref) => {
        const url = typeof href === "string" ? href : (href.href ?? "");

        if (isExternal(url))
            return (
                <a
                    ref={ref}
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
            <NextLink className={cn(className)} href={href} {...props}>
                {children}
            </NextLink>
        );
    }
);
Link.displayName = "Link";

export { Link };
