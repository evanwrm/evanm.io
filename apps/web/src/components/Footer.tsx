import { getYear } from "date-fns";
import React from "react";
import { getMedia } from "../lib/media";
import { Global } from "../validators/Global";
import { SocialLink } from "../validators/Social";
import IconButton from "./animations/IconButton";
import Icon from "./Icon";
import NavLink from "./NavLink";
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
        <footer className="p-4 border-t footer border-base-content/10 overflow-clip">
            <div>
                <p>
                    © 2022 - {getYear(Date.now())} {global?.firstName} {global?.lastName}. All
                    Rights Reserved.
                </p>
            </div>
            <div>
                <div className="flex my-4 space-x-4">
                    <RouteNavList routes={routes} tabIndex={0} className="flex flex-row" />
                </div>
                <div className="flex my-4 space-x-4">
                    {socials.map(social => (
                        <NavLink href={social.url} aria-label={social.name} key={social.socialId}>
                            <IconButton className="flex opacity-80">
                                <Icon icon={social.iconId} className="w-8 h-8" />
                            </IconButton>
                        </NavLink>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
