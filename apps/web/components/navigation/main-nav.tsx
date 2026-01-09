"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/navigation/link";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"ul"> {
    routes: { href: string; label: string }[];
    className?: string;
    itemClassName?: string;
}

export const MainNav = ({
    routes,
    className,
    itemClassName,
    ...props
}: Props) => {
    const pathname = usePathname();

    return (
        <ul className={cn("flex gap-4", className)} {...props}>
            {routes.map(route => (
                <li
                    className={cn(
                        "text-foreground/60 text-xs hover:text-foreground/80",
                        pathname === route.href ? "text-foreground" : "",
                        itemClassName,
                    )}
                    key={route.href}
                >
                    <Link
                        href={route.href}
                        aria-label={route.label}
                        className={cn(
                            "text-center align-middle font-semibold transition-all",
                            "link-underline rounded bg-linear-to-r from-red-600/20 to-red-600/80",
                        )}
                    >
                        {route.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
