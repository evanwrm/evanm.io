import { AnimatePresence, m } from "framer-motion";
import { NextSeo, NextSeoProps } from "next-seo";
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

    const handleToggleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
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
                    <m.div
                        className="fixed z-10 left-[-50%] top-0 w-[200%] h-screen shadow bg-base-100 backdrop-blur-xl bg-opacity-60 bg-clip-padding"
                        drag="x"
                        dragElastic={0.1}
                        dragMomentum={false}
                        dragConstraints={{
                            left: 0.1,
                            right: 0.1
                        }}
                        onDragEnd={(_event, info) => {
                            const isDraggingRight = info.offset.x > 0;
                            const threshold = 300 * (isDraggingRight ? 2 / 3 : 1 / 2);

                            if (mobileOpen && Math.abs(info.offset.x) > threshold)
                                setMobileOpen(false);
                            else if (!mobileOpen && Math.abs(info.offset.x) < threshold)
                                setMobileOpen(true);
                        }}
                        initial={{ opacity: 0, x: 399 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 399 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                    >
                        <div className="relative flex flex-col items-center justify-center w-full h-screen">
                            <div className="flex items-center justify-start w-1/2 gap-6 p-2">
                                <div
                                    className="btn btn-ghost btn-circle md:hidden"
                                    onClick={e => handleToggleOpen(e)}
                                    tabIndex={0}
                                >
                                    <Icon icon="HiX" className="w-6 h-6" />
                                </div>
                            </div>
                            <RouteNavList
                                routes={routes}
                                tabIndex={0}
                                onElementClick={e => handleToggleOpen(e)}
                                className="flex flex-col items-center justify-center w-1/2 h-screen tracking-widest"
                            />
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!hidden && !mobileOpen && (
                    <m.div
                        className="sticky top-0 z-50 flex items-center justify-center w-full shadow shadow-base-content/10 navbar bg-base-100 bg-opacity-60 backdrop-blur-lg bg-clip-padding"
                        initial={{ opacity: 1, y: -75 }}
                        animate={{ opacity: 1, y: 0.1 }}
                        exit={{ opacity: 1, y: -75 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                    >
                        <div className={"w-full max-w-full"}>
                            <div className="flex items-center justify-start w-1/2">
                                <div
                                    className="btn btn-ghost btn-circle md:hidden"
                                    onClick={e => handleToggleOpen(e)}
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
                                <ThemeSwap className="w-6 h-6 transition opacity-80 hover:-translate-y-1 hover:scale-105 hover:opacity-100 focus:text-primary" />
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
                                            className="w-6 h-6 transition opacity-80 hover:-translate-y-1 hover:scale-110 hover:opacity-100 focus:opacity-100"
                                        />
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
