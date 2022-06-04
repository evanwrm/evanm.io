import { AnimatePresence, m } from "framer-motion";
import { NextSeo } from "next-seo";
import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { useHideOnScroll } from "../hooks/useHideOnScroll";
import { Seo } from "../interfaces/Seo";
import ThemeSwap from "./ThemeSwap";

interface Props {
    title?: string;
    seo?: Seo;
}

const routes = [
    {
        path: "/",
        label: "Home",
        exact: true
    },
    {
        path: "/publications",
        label: "Publications"
    },
    {
        path: "/projects",
        label: "Projects"
    },
    {
        path: "/cv",
        label: "CV"
    }
];

const Header: React.FC<Props> = ({ title, seo }: Props) => {
    const pageSeo: Partial<Seo> = {
        ...seo,
        ...(title && { title }),
        openGraph: { ...seo?.openGraph, ...(title && { title }) }
    };
    const { hidden } = useHideOnScroll(15);

    return (
        <React.Fragment>
            <NextSeo {...pageSeo} />
            <AnimatePresence>
                {!hidden && (
                    <m.div
                        className="navbar sticky top-0 z-50 flex justify-center shadow bg-base-100 backdrop-blur-xl bg-opacity-80 bg-clip-padding"
                        initial={{ opacity: 0, y: -75 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -25 }}
                    >
                        <div className="w-full md:max-w-3xl sm:max-w-full">
                            <div className="w-1/2 flex justify-start items-center">
                                <div className="dropdown w-6 h-6">
                                    <label
                                        tabIndex={0}
                                        className="btn btn-ghost btn-circle lg:hidden"
                                    >
                                        <HiMenuAlt2 className="w-6 h-6" />
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                                    >
                                        {routes.map(route => (
                                            <li key={route.path}>
                                                <a
                                                    href={`#${route.path}`}
                                                    className="opacity-80 hover:opacity-100"
                                                >
                                                    {route.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="hidden lg:flex">
                                    <ul tabIndex={0} className="menu menu-horizontal">
                                        {routes.map(route => (
                                            <li key={route.path}>
                                                <a
                                                    href={`#${route.path}`}
                                                    className="opacity-80 hover:opacity-100"
                                                >
                                                    {route.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="w-1/2 flex justify-end items-center">
                                <ThemeSwap className="w-6 h-6" />
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Header;
