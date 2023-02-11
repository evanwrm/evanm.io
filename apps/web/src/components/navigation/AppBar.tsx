"use client";

import ResponsiveButton from "@/components/animation/ResponsiveButton";
import Icon from "@/components/Icon";
import SpotlightToggle from "@/components/input/SpotlightToggle";
import ThemeToggle from "@/components/input/ThemeToggle";
import NavLink from "@/components/navigation/NavLink";
import RouteNavList from "@/components/navigation/RouteNavList";
import { headerRoutes } from "@/config/header";
import { useFramerVariants } from "@/hooks/useFramerVariants";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { anticipateTransition, slideInTopVariants } from "@/lib/animation/framerVariants";
import { SocialLink } from "@/lib/validators/Social";
import { Portal } from "@radix-ui/react-portal";
import { AnimatePresence, m } from "framer-motion";
import React, { Suspense, useState } from "react";

interface Props {
    title?: string;
    github?: SocialLink;
}

const DynamicMobileDrawer = React.lazy(() => import("@/components/navigation/MobileDrawer"));

const AppBar = ({ github }: Props) => {
    const { hidden } = useHideOnScroll(80, 60);
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerVariants = useFramerVariants(slideInTopVariants, { disableMountAnimation: true });

    const handleToggleOpen = (_e: React.MouseEvent) => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AnimatePresence>
                {mobileOpen && (
                    <Portal>
                        <Suspense fallback={null}>
                            <DynamicMobileDrawer onClose={() => setMobileOpen(false)}>
                                <RouteNavList
                                    routes={headerRoutes}
                                    tabIndex={0}
                                    onElementClick={handleToggleOpen}
                                    className="flex h-full w-1/2 flex-col items-start justify-center tracking-widest"
                                    itemClassName="my-2"
                                />
                            </DynamicMobileDrawer>
                        </Suspense>
                    </Portal>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!hidden && (
                    <m.nav
                        className="shadow-base-content/10 bg-base-100 min-h-16 fixed top-0 z-40 flex w-full items-center justify-center bg-opacity-60 bg-clip-padding p-2 shadow backdrop-blur backdrop-saturate-200"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={headerVariants}
                        transition={anticipateTransition}
                    >
                        <div className="inline-flex w-full max-w-full items-center">
                            <div className="flex w-1/2 items-center justify-start">
                                <ResponsiveButton
                                    className="btn-ghost btn-circle flex select-none items-center justify-center md:hidden"
                                    onClick={handleToggleOpen}
                                    tabIndex={0}
                                >
                                    <Icon.HiMenuAlt2 className="h-6 w-6" />
                                </ResponsiveButton>
                                <NavLink
                                    href="/"
                                    aria-label="Home"
                                    className="ml-2 opacity-80 transition-all hover:opacity-100"
                                >
                                    <div className="text-base-content inline font-bold">
                                        <span className="text-base-content">evanm</span>
                                        <span className="text-secondary">.io</span>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="hidden md:flex">
                                <RouteNavList
                                    routes={headerRoutes}
                                    tabIndex={0}
                                    className="flex flex-row"
                                />
                            </div>
                            <div className="mr-4 flex w-1/2 items-center justify-end gap-6">
                                {github && (
                                    <NavLink
                                        href={github.url}
                                        aria-label={github.name}
                                        key={github.socialId}
                                    >
                                        <ResponsiveButton className="text-base-content flex opacity-80">
                                            <Icon.SiGithub className="h-6 w-6" />
                                        </ResponsiveButton>
                                    </NavLink>
                                )}
                                <ResponsiveButton className="text-base-content flex opacity-80">
                                    <SpotlightToggle className="h-6 w-6" />
                                </ResponsiveButton>
                                <ResponsiveButton className="text-base-content flex opacity-80">
                                    <ThemeToggle className="h-6 w-6" />
                                </ResponsiveButton>
                            </div>
                        </div>
                    </m.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default AppBar;
