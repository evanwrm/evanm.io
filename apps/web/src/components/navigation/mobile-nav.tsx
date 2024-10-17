"use client";

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
    DrawerTrigger
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { lightBounceTransition } from "@/lib/animation/framer-variants";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

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
                    <Icon.CgMenuLeft className="h-6 w-6" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-72">
                <DrawerClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
                    <Cross2Icon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
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
                    <ul className="flex flex-col gap-4 p-2">
                        {routes.map((route, i) => (
                            <FadeIn
                                key={route.href}
                                transition={{ ...lightBounceTransition, delay: i * 0.05 }}
                            >
                                <li
                                    className={cn(
                                        "text-foreground/60 hover:text-foreground/80 text-xs",
                                        pathname === route.href ? "text-foreground" : ""
                                    )}
                                >
                                    <DrawerClose asChild>
                                        <Link
                                            href={route.href}
                                            aria-label={route.label}
                                            className={cn(
                                                "text-center align-middle font-semibold transition-all",
                                                "link-underline rounded bg-gradient-to-r from-red-600/20 to-red-600/80"
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
