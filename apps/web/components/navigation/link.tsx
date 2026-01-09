import NextLink, { type LinkProps } from "next/link";
import { isExternal } from "@/lib/uri";
import { cn } from "@/lib/utils";

interface Props
    extends Pick<LinkProps, "href">,
        Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
    ref?: React.RefObject<HTMLAnchorElement>;
    children?: React.ReactNode;
    className?: string;
}

export function Link({ href, className, children, ref, ...props }: Props) {
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
