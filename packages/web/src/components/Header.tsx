import { AnimatePresence, m } from "framer-motion";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { useHideOnScroll } from "../hooks/useHideOnScroll";
import { Global } from "../interfaces/Global";
import { Seo } from "../interfaces/Seo";
import { SocialLink } from "../interfaces/Social";
import { getMedia } from "../lib/media";
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

const Header: React.FC<Props> = ({ title, global, seo, socials }: Props) => {
    const pageSeo: Partial<Seo> = {
        ...seo,
        ...(title && { title }),
        openGraph: { ...seo?.openGraph, ...(title && { title }) }
    };
    const { hidden } = useHideOnScroll(80);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggleOpen = () => {
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

            {mobileOpen && (
                <AnimatePresence>
                    <m.div
                        className="fixed z-10 left-[-50%] top-0 w-[200%] h-screen shadow bg-base-100/15 backdrop-blur-xl bg-opacity-80 bg-clip-padding"
                        initial={{ opacity: 0, x: 399 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 399 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                    >
                        <div className="relative w-full h-screen flex flex-col justify-center items-center">
                            <div className="w-1/2 flex justify-start items-center p-2 gap-6">
                                <div
                                    className="btn btn-ghost btn-circle md:hidden"
                                    onClick={handleToggleOpen}
                                    tabIndex={0}
                                >
                                    <Icon icon="HiX" className="w-6 h-6" />
                                </div>
                            </div>
                            <RouteNavList
                                routes={routes}
                                tabIndex={0}
                                onElementClick={handleToggleOpen}
                                className="w-1/2 h-screen flex flex-col justify-center items-center tracking-widest"
                            />
                        </div>
                    </m.div>
                </AnimatePresence>
            )}
            {!hidden && !mobileOpen && (
                <AnimatePresence>
                    <m.div
                        className="sticky z-50 top-0 w-full navbar flex justify-center items-center shadow bg-base-200/15 backdrop-blur-xl bg-opacity-80 bg-clip-padding"
                        initial={{ opacity: 0, y: -75 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -25 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                    >
                        <div className={"w-full max-w-full"}>
                            <div className="w-1/2 flex justify-start items-center">
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
                                    <div className="inline text-base-content font-bold">
                                        <span className="hover:text-base-content">evanm</span>
                                        <span className="text-secondary">.io</span>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="hidden md:flex">
                                <RouteNavList
                                    routes={routes}
                                    tabIndex={0}
                                    className="flex flex-row"
                                />
                            </div>
                            <div className="w-1/2 flex justify-end items-center gap-6 mr-4">
                                <ThemeSwap className="w-6 h-6 opacity-80 transition hover:-translate-y-1 hover:scale-105 hover:opacity-100 focus:text-primary" />
                                {github && (
                                    <a
                                        href={`${github.url}/${seo?.openGraph?.site_name ?? ""}`}
                                        aria-label={github.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={github.socialId}
                                    >
                                        <Icon
                                            icon="SiGithub"
                                            className="w-6 h-6 opacity-80 transition hover:-translate-y-1 hover:scale-110 hover:opacity-100 focus:opacity-100"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    </m.div>
                </AnimatePresence>
            )}
        </React.Fragment>
    );
};

export default Header;
