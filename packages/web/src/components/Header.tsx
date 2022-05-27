import { NextSeo } from "next-seo";
import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import ThemeSwap from "./ThemeSwap";

interface Props {
    title?: string;
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

const Header: React.FC<Props> = ({ title }: Props) => {
    return (
        <React.Fragment>
            <NextSeo title={title} />
            <div className="navbar flex justify-center shadow-lg bg-base-200 backdrop-blur-xl bg-opacity-80 bg-clip-padding">
                <div className="w-full md:max-w-3xl sm:max-w-full">
                    <div className="w-1/2 flex justify-start items-center">
                        <div className="dropdown w-6 h-6">
                            <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
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
            </div>
        </React.Fragment>
    );
};

export default Header;
