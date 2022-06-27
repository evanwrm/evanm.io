import { AnimatePresence, m } from "framer-motion";
import { NextSeo, NextSeoProps } from "next-seo";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useHideOnScroll } from "../hooks/useHideOnScroll";
import { getMedia } from "../lib/media";
import { DeepNullable } from "../lib/utils/types";
import { Global } from "../validators/Global";
import { Seo } from "../validators/Seo";
import { SocialLink } from "../validators/Social";
import Icon from "./Icon";
import NavLink from "./NavLink";
import RouteNavList from "./RouteNavList";
import ThemeSwap from "./ThemeSwap";

interface Props {
    title?: string;
    global?: Global;
    seo?: Seo;
    socials?: SocialLink[];
}

const DynamicMobileDrawer = dynamic(() => import("./MobileDrawer"), { ssr: true });

const Header: React.FC<Props> = ({ title, global, seo, socials }: Props) => {
    // Ensure our Seo is compatiable with a nullable NextSeoProps
    const extendedSeo: Partial<DeepNullable<NextSeoProps>> = {
        ...seo,
        ...(title && { title }),
        openGraph: { ...seo?.openGraph, ...(title && { title }) }
    };
    const pageSeo = extendedSeo as NextSeoProps;

    const { hidden } = useHideOnScroll(80, 100);
    const [mobileOpen, setMobileOpen] = useState(false);

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
        <React.Fragment>
            <NextSeo {...pageSeo} />
            <AnimatePresence>
                {mobileOpen && (
                    <DynamicMobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
                        <RouteNavList
                            routes={routes}
                            tabIndex={0}
                            onElementClick={handleToggleOpen}
                            className="flex flex-col items-center justify-center w-1/2 h-full tracking-widest"
                        />
                    </DynamicMobileDrawer>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!hidden && (
                    <m.div
                        className="sticky top-0 z-40 flex items-center justify-center w-full shadow shadow-base-content/10 navbar bg-base-100 bg-opacity-60 backdrop-blur-lg bg-clip-padding"
                        initial={{ opacity: 1, y: -75 }}
                        animate={{ opacity: 1, y: 0.1 }}
                        exit={{ opacity: 1, y: -75 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                    >
                        <div className={"w-full max-w-full"}>
                            <div className="flex items-center justify-start w-1/2">
                                <div
                                    className="btn btn-ghost btn-circle md:hidden"
                                    onClick={handleToggleOpen}
                                    tabIndex={0}
                                >
                                    <Icon icon="HiMenuAlt2" className="w-6 h-6" />
                                </div>
                                <NavLink
                                    href="/"
                                    aria-label="Home"
                                    className="ml-2 opacity-80 hover:opacity-100"
                                >
                                    <div className="inline font-bold text-base-content">
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
                            <div className="flex items-center justify-end w-1/2 gap-6 mr-4">
                                <m.div
                                    className="flex opacity-80"
                                    whileHover={{ scale: 1.1, opacity: 1, y: -4 }}
                                    whileFocus={{ scale: 1.1, opacity: 1, y: -4 }}
                                    whileTap={{ scale: 0.9, opacity: 1 }}
                                >
                                    <ThemeSwap className="w-6 h-6" />
                                </m.div>
                                {github && (
                                    <a
                                        href={`${github.url}/${seo?.openGraph?.site_name ?? ""}`}
                                        aria-label={github.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={github.socialId}
                                    >
                                        <m.div
                                            className="flex opacity-80"
                                            whileHover={{ scale: 1.1, opacity: 1, y: -4 }}
                                            whileFocus={{ scale: 1.1, opacity: 1, y: -4 }}
                                            whileTap={{ scale: 0.9, opacity: 1 }}
                                        >
                                            <Icon icon="SiGithub" className="w-6 h-6" />
                                        </m.div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Header;
