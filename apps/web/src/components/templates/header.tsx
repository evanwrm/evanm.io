"use client";

import { HoverButton } from "@/components/animation/hover-button";
import { Link } from "@/components/navigation/link";
import { MainNav } from "@/components/navigation/main-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { Spotlight } from "@/components/navigation/spotlight";
import { useHideOnScroll, useScrollY } from "@/hooks/use-scroll";
import { useSpotlightActions } from "@/hooks/use-spotlight-actions";
import { cn } from "@/lib/utils";

interface Props {
    routes: { href: string; label: string }[];
}

export const Header = ({ routes }: Props) => {
    const yPos = useScrollY();
    const { hidden } = useHideOnScroll({ threshold: 80, showThreshold: 60 });
    const items = useSpotlightActions();

    return (
        <nav
            className={cn(
                "sticky top-0 z-40 flex h-16 items-center justify-center p-4 transition-all",
                yPos > 196
                    ? "bg-background/60 border-border/60 border-b bg-clip-padding backdrop-blur backdrop-saturate-200"
                    : "border-transparent bg-transparent",
                hidden ? "pointer-events-none scale-[102%] select-none opacity-0" : ""
            )}
        >
            <div className="flex w-1/2 items-center justify-start">
                <HoverButton tabIndex={0}>
                    <MobileNav routes={routes} />
                </HoverButton>
                <Link
                    href="/"
                    aria-label="evanm.io"
                    className="text-foreground/80 hover:text-foreground ml-2 transition-all"
                >
                    <div className="inline font-bold">
                        <span>evanm</span>
                        <span className="text-red-600">.io</span>
                    </div>
                </Link>
            </div>
            <div className="hidden md:flex">
                <MainNav routes={routes} tabIndex={0} className="flex flex-row" />
            </div>
            <div className="mr-2 flex w-1/2 items-center justify-end gap-6">
                <HoverButton>
                    <Spotlight items={items} />
                </HoverButton>
            </div>
        </nav>
    );
};
