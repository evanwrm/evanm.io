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
        <footer className=" mt-8 w-full overflow-clip p-4 md:max-w-7xl">
            <div className="border-base-content/10 grid grid-cols-1 border-t p-4 md:grid-cols-2">
                <div className="order-last my-4 flex items-end justify-center md:order-first md:justify-start">
                    <p className="prose">
                        © {getYear(Date.now())} {global?.firstName} {global?.lastName}. All Rights
                        Reserved.
                    </p>
                </div>
                <div className="flex items-end justify-center md:justify-end">
                    <div className="my-4 flex flex-col items-center justify-center md:items-start">
                        <RouteNavList routes={routes} tabIndex={0} className="flex flex-row" />
                        <div className="mt-4 ml-4 flex space-x-4">
                            {socials.map(social => (
                                <NavLink
                                    href={social.url}
                                    aria-label={social.name}
                                    key={social.socialId}
                                >
                                    <ResponsiveButton className="flex opacity-80">
                                        <Icon icon={social.iconId} className="h-8 w-8" />
                                    </ResponsiveButton>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
