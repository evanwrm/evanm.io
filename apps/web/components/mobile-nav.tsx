import { XIcon } from "lucide-react";
import { Icon } from "@/components/icon";
import { Link } from "@/components/link";
import { LogoWordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerHeader,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { localizedPath, useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Props {
    links: { href: string; label: string }[];
    pathname: string;
}
export function MobileNav({ links, pathname }: Props) {
    const { t } = useTranslations();

    return (
        <Drawer swipeDirection="left">
            <DrawerTrigger
                className="md:hidden"
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t("nav.openNavigation")}
                        className="h-8 w-8 rounded-full"
                    >
                        <Icon.MenuIcon className="h-6 w-6" />
                    </Button>
                }
            />
            <DrawerPopup className="bg-background p-0 before:hidden">
                <DrawerHeader className="flex flex-row items-center justify-between">
                    <DrawerTitle
                        className="text-base"
                        render={
                            <DrawerClose
                                render={
                                    <Link
                                        href="/"
                                        aria-label="evanm.io"
                                        className="text-foreground/80 hover:text-foreground tracking-tight transition-colors"
                                    >
                                        <LogoWordmark />
                                    </Link>
                                }
                            />
                        }
                    />
                    <DrawerClose
                        aria-label={t("nav.close")}
                        render={
                            <Button
                                variant="ghost"
                                size="icon-xs"
                                className="text-muted-foreground hover:text-foreground rounded-full"
                            />
                        }
                    >
                        <XIcon />
                    </DrawerClose>
                </DrawerHeader>
                <Separator />
                <nav className="flex flex-col p-3">
                    {links.map((link, i) => {
                        const isActive = pathname === localizedPath(link.href);
                        return (
                            <DrawerClose
                                key={link.href}
                                render={
                                    <Link
                                        href={link.href}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                        className={cn(
                                            "fade-in slide-in-from-bottom-12 animate-in ease-spring group relative flex items-center px-3 py-2 text-sm transition duration-500",
                                            isActive
                                                ? "text-foreground bg-muted/60"
                                                : "text-foreground/60 hover:text-foreground hover:bg-muted/40",
                                        )}
                                        style={{
                                            animationDelay: `${100 + i * 50}ms`,
                                            animationFillMode: "both",
                                        }}
                                    >
                                        <span
                                            aria-hidden
                                            className={cn(
                                                "absolute left-0 h-full w-0.5 rounded-full transition-all",
                                                isActive
                                                    ? "bg-red-600 opacity-100"
                                                    : "bg-foreground/40 opacity-0 group-hover:opacity-60",
                                            )}
                                        />
                                        {link.label}
                                    </Link>
                                }
                            />
                        );
                    })}
                </nav>
            </DrawerPopup>
        </Drawer>
    );
}
