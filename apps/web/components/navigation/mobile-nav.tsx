"use client";

import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FadeIn } from "@/components/animation/fade-in";
import { Icon } from "@/components/icon";
import { Link } from "@/components/navigation/link";
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
import { lightBounceTransition } from "@/lib/animation/framer-variants";
import { cn } from "@/lib/utils";

interface Props {
    routes: { href: string; label: string }[];
}

export const MobileNav = ({ routes }: Props) => {
    const pathname = usePathname();

    return (
        <Drawer direction="left" noBodyStyles>
            <DrawerTrigger className="md:hidden" asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation"
                    className="h-8 w-8 rounded-full"
                >
                    <Icon.MenuIcon className="h-6 w-6" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-72">
                <DrawerClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DrawerClose>
                <DrawerHeader>
                    <DrawerTitle className="text-left">
                        <DrawerClose asChild>
                            <Link
                                href="/"
                                aria-label="evanm.io"
                                className="text-foreground/80 transition-all hover:text-foreground"
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
                    <ul className="flex flex-col gap-4 p-2">
                        {routes.map((route, i) => (
                            <FadeIn
                                key={route.href}
                                transition={{
                                    ...lightBounceTransition,
                                    delay: i * 0.05,
                                }}
                            >
                                <li
                                    className={cn(
                                        "text-foreground/60 text-xs hover:text-foreground/80",
                                        pathname === route.href
                                            ? "text-foreground"
                                            : "",
                                    )}
                                >
                                    <DrawerClose asChild>
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
                                    </DrawerClose>
                                </li>
                            </FadeIn>
                        ))}
                    </ul>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
