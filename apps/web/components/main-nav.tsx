import { Link } from "@/components/link";
import { localizedPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Props {
    links: { href: string; label: string }[];
    pathname: string;
    className?: string;
}
export function MainNav({ links, pathname, className }: Props) {
    return (
        <nav className={cn("hidden gap-x-8 md:flex", className)}>
            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "hover:text-foreground text-sm/6 transition-colors",
                        pathname === localizedPath(link.href)
                            ? "text-foreground"
                            : "text-muted-foreground",
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}
