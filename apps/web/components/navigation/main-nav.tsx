"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/navigation/link";
import { cn } from "@/lib/utils";

interface Props {
    links: { href: string; label: string }[];
    className?: string;
}
export const MainNav = ({ links, className }: Props) => {
    const pathname = usePathname();

    return (
        <nav className={cn("hidden gap-x-8 md:flex", className)}>
            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-sm/6 transition-colors hover:text-foreground",
                        pathname === link.href
                            ? "text-foreground"
                            : "text-muted-foreground",
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};
