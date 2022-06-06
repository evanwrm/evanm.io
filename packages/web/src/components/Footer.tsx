import { getYear } from "date-fns";
import React from "react";
import { Global } from "../interfaces/Global";
import { SocialLink } from "../interfaces/Social";
import { getMedia } from "../lib/media";
import Icon from "./Icon";
import RouteNavList from "./RouteNavList";

interface Props {
    global?: Global;
    socials?: SocialLink[];
}

const Footer: React.FC<Props> = ({ global, socials = [] }: Props) => {
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

    return (
        <footer className="footer p-4 border-t border-base-content/10 overflow-clip">
            <div>
                <p>
                    © 2022 - {getYear(Date.now())} {global?.firstName} {global?.lastName}. All
                    Rights Reserved.
                </p>
            </div>
            <div>
                <div className="flex space-x-4 my-4">
                    <RouteNavList routes={routes} tabIndex={0} className="flex flex-row" />
                </div>
                <div className="flex space-x-4 my-4">
                    {socials.map(social => (
                        <a
                            href={social.url}
                            aria-label={social.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={social.socialId}
                        >
                            <Icon
                                icon={social.iconId}
                                className="w-8 h-8 opacity-80 transition hover:-translate-y-1 hover:scale-110 hover:opacity-100 focus:opacity-100"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
