import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/button";
import { localizedPath } from "@/lib/i18n";
import { isExternal } from "@/lib/uri";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"a"> {
    href?: string;
}
export function Link({ href = "", className, children, ...props }: Props) {
    if (isExternal(href))
        return (
            <a
                href={href}
                className={cn(className)}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );

    return (
        <a href={localizedPath(href)} className={cn(className)} {...props}>
            {children}
        </a>
    );
}

interface ButtonLinkProps
    extends
        React.ComponentPropsWithoutRef<"button">,
        VariantProps<typeof buttonVariants> {
    href?: string;
}
export function ButtonLink({ href = "", children, ...props }: ButtonLinkProps) {
    return (
        <Button asChild {...props}>
            <Link href={href}>{children}</Link>
        </Button>
    );
}
