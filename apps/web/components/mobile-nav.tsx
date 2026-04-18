import { XIcon } from "lucide-react";
import { Icon } from "@/components/icon";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
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
        <Drawer direction="left" noBodyStyles>
            <DrawerTrigger className="md:hidden" asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("nav.openNavigation")}
                    className="h-8 w-8 rounded-full"
                >
                    <Icon.MenuIcon className="h-6 w-6" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-72">
                <DrawerClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">{t("nav.close")}</span>
                </DrawerClose>
                <DrawerHeader>
                    <DrawerTitle className="text-left">
                        <DrawerClose asChild>
                            <Link
                                href="/"
                                aria-label="evanm.io"
                                className="text-foreground/80 hover:text-foreground transition-all"
                            >
                                <div className="inline font-bold">
                                    <span>evanm</span>
                                    <span className="text-red-600">.io</span>
                                </div>
                            </Link>
                        </DrawerClose>
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col items-start justify-start px-4">
                    <Separator className="my-2" />
                    {links.map((link, i) => (
                        <div
                            key={link.href}
                            className={cn(
                                "fade-in slide-in-from-bottom-12 animate-in text-foreground/80 ease-spring hover:text-foreground w-full p-2 transition duration-500",
                                pathname === localizedPath(link.href)
                                    ? "text-foreground"
                                    : "",
                            )}
                            style={{
                                animationDelay: `${100 + i * 50}ms`,
                                animationFillMode: "both",
                            }}
                        >
                            <DrawerClose asChild>
                                <Link
                                    href={link.href}
                                    className="h-full text-xs font-semibold"
                                >
                                    {link.label}
                                </Link>
                            </DrawerClose>
                        </div>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
