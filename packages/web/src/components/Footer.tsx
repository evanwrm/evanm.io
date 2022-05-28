import { getYear } from "date-fns";
import React from "react";
import { MdCopyright } from "react-icons/md";
import { Global } from "../interfaces/Global";
import { SocialLink } from "../interfaces/Social";
import Icon from "./Icon";

interface Props {
    global?: Global;
    socials?: SocialLink[];
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

const Footer: React.FC<Props> = ({ global, socials = [] }: Props) => {
    return (
        <footer className="footer p-4 border-t border-base-content/10">
            <div>
                <p>
                    <MdCopyright className="inline-block fill-current w-4 h-4" />{" "}
                    {getYear(Date.now())} {global?.firstName} {global?.lastName}. All Rights
                    Reserved.
                </p>
            </div>
            <div>
                <div className="flex space-x-4 my-4">
                    {routes.map(route => (
                        <a
                            href={`#${route.path}`}
                            className="opacity-80 hover:opacity-100"
                            key={route.path}
                        >
                            {route.label}
                        </a>
                    ))}
                </div>
                <div className="flex space-x-4 my-4">
                    {socials.map(social => (
                        <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={social.socialId}
                        >
                            <Icon
                                icon={social.iconId}
                                className="w-8 h-8 opacity-80 transition hover:-translate-y-2 hover:scale-110 hover:opacity-100 focus:text-primary"
                            ></Icon>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
