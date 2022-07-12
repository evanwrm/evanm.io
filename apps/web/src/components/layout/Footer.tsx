import { getYear } from "date-fns";
import { getMedia } from "../../lib/media";
import { Global } from "../../validators/Global";
import { SocialLink } from "../../validators/Social";
import ResponsiveButton from "../animations/ResponsiveButton";
import Icon from "../Icon";
import NavLink from "../navigation/NavLink";
import RouteNavList from "../navigation/RouteNavList";

interface Props {
    global?: Global;
    socials?: SocialLink[];
}

const Footer = ({ global, socials = [] }: Props) => {
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
        <footer className="footer border-base-content/10 overflow-clip border-t p-4">
            <div>
                <p>
                    © 2022 - {getYear(Date.now())} {global?.firstName} {global?.lastName}. All
                    Rights Reserved.
                </p>
            </div>
            <div>
                <div className="my-4 flex space-x-4">
                    <RouteNavList routes={routes} tabIndex={0} className="flex flex-row" />
                </div>
                <div className="my-4 flex space-x-4">
                    {socials.map(social => (
                        <NavLink href={social.url} aria-label={social.name} key={social.socialId}>
                            <ResponsiveButton className="flex opacity-80">
                                <Icon icon={social.iconId} className="h-8 w-8" />
                            </ResponsiveButton>
                        </NavLink>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
