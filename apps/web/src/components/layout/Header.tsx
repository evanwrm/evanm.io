import Portal from "@reach/portal";
import { AnimatePresence, m } from "framer-motion";
import { useKBar } from "kbar";
import { NextSeoProps } from "next-seo";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import { useFramerVariants } from "../../hooks/useFramerVariants";
import { useHideOnScroll } from "../../hooks/useHideOnScroll";
import { anticipateTransition, slideInTopVariants } from "../../lib/framerVariants";
import { getMedia } from "../../lib/media";
import { DeepNullable } from "../../types/utils";
import { Global } from "../../validators/Global";
import { Seo } from "../../validators/Seo";
import { SocialLink } from "../../validators/Social";
import ResponsiveButton from "../animations/ResponsiveButton";
import Icon from "../Icon";
import NavLink from "../navigation/NavLink";
import RouteNavList from "../navigation/RouteNavList";
import PageSeo from "../PageSeo";
import ThemeSwap from "../ThemeSwap";

interface Props {
    title?: string;
    global?: Global;
    seo?: Seo;
    socials?: SocialLink[];
}

const DynamicMobileDrawer = dynamic(() => import("./MobileDrawer"), { suspense: true, ssr: false });

const Header = ({ title, global, seo, socials }: Props) => {
    // Ensure our Seo is compatiable with a nullable NextSeoProps
    const extendedSeo: Partial<DeepNullable<NextSeoProps>> = {
        ...seo,
        ...(title && { title }),
        openGraph: { ...seo?.openGraph, ...(title && { title }) }
    };
    const pageSeo = extendedSeo as NextSeoProps;

    const { hidden } = useHideOnScroll(80, 60);
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerVariants = useFramerVariants(slideInTopVariants, { disableMountAnimation: true });

    const { query } = useKBar();

    const handleToggleOpen = (_e: React.MouseEvent) => {
        setMobileOpen(!mobileOpen);
    };

    // Prevent scrolling when menu is open
    useEffect(() => {
        const body = document.body;
        if (mobileOpen) body?.style?.setProperty("overflow", "hidden");
        else body?.style?.removeProperty("overflow");
    }, [mobileOpen]);

    const routes = [
        {
            path: "/",
            label: "Home"
        },
        {
            path: "/#projects",
            label: "Projects"
        },
        {
            path: "/#publications",
            label: "Publications"
        },
        {
            path: global?.cv ? getMedia(global?.cv) : "/#cv",
            label: "CV"
        }
    ];
    const github = socials?.find(social => social.socialId === "github");

    return (
        <>
            <PageSeo {...pageSeo} />
            <Portal>
                <AnimatePresence>
                    <Suspense fallback={null}>
                        {mobileOpen && (
                            <DynamicMobileDrawer
                                open={mobileOpen}
                                onClose={() => setMobileOpen(false)}
                            >
                                <RouteNavList
                                    routes={routes}
                                    tabIndex={0}
                                    onElementClick={handleToggleOpen}
                                    className="flex h-full w-1/2 flex-col items-center justify-center tracking-widest"
                                />
                            </DynamicMobileDrawer>
                        )}
                    </Suspense>
                </AnimatePresence>
            </Portal>
            <AnimatePresence>
                {!hidden && (
                    <m.div
                        className="shadow-base-content/10 navbar bg-base-100 fixed top-0 z-40 flex w-full items-center justify-center bg-opacity-60 bg-clip-padding shadow backdrop-blur backdrop-saturate-200"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={headerVariants}
                        transition={anticipateTransition}
                    >
                        <div className={"w-full max-w-full"}>
                            <div className="flex w-1/2 items-center justify-start">
                                <ResponsiveButton
                                    className="btn-ghost btn-circle flex select-none items-center justify-center md:hidden"
                                    onClick={handleToggleOpen}
                                    tabIndex={0}
                                >
                                    <Icon icon="HiMenuAlt2" className="h-6 w-6" />
                                </ResponsiveButton>
                                <NavLink
                                    href="/"
                                    aria-label="Home"
                                    className="ml-2 opacity-80 hover:opacity-100"
                                >
                                    <div className="text-base-content inline font-bold">
                                        <span className="hover:text-base-content">evanm</span>
                                        <span className="text-secondary">.io</span>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="hidden transition md:flex">
                                <RouteNavList
                                    routes={routes}
                                    tabIndex={0}
                                    className="flex flex-row"
                                />
                            </div>
                            <div className="mr-4 flex w-1/2 items-center justify-end gap-6">
                                {github && (
                                    <a
                                        href={`${github.url}/${seo?.openGraph?.site_name ?? ""}`}
                                        aria-label={github.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={github.socialId}
                                    >
                                        <ResponsiveButton className="flex opacity-80">
                                            <Icon icon="SiGithub" className="h-6 w-6" />
                                        </ResponsiveButton>
                                    </a>
                                )}
                                <ResponsiveButton
                                    className="flex opacity-80"
                                    onClick={() => query.toggle()}
                                >
                                    <Icon className="h-6 w-6" icon="RiCommandLine" />
                                </ResponsiveButton>
                                <ResponsiveButton className="flex opacity-80">
                                    <ThemeSwap className="h-6 w-6" />
                                </ResponsiveButton>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
