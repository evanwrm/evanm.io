import { isExternal } from "@/lib/uri";
import { cn } from "@/lib/utils";
import NextLink, { type LinkProps } from "next/link";

interface Props
    extends Pick<LinkProps, "href">,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    children?: React.ReactNode;
    className?: string;
}

export function Link({ href, className, children, ...props }: Props) {
    const url = typeof href === "string" ? href : (href.href ?? "");

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
        <NextLink className={cn(className)} href={href} {...props}>
            {children}
        </NextLink>
    );
}
