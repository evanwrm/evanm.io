import ResponsiveButton from "@/components/animation/ResponsiveButton";
import { getIconAliased } from "@/components/Icon";
import NavLink from "@/components/navigation/NavLink";
import RouteNavList from "@/components/navigation/RouteNavList";
import { headerRoutes } from "@/config/header";
import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import { getYear } from "date-fns";

const Footer = async () => {
    const caller = appRouter.createCaller(await createInnerContext());
    const [settings, socials] = await Promise.all([caller.settings.find(), caller.socials.find()]);

    return (
        <footer className="mt-8 w-full overflow-clip p-4 md:max-w-7xl">
            <div className="border-base-content/10 grid grid-cols-1 border-t p-4 md:grid-cols-2">
                <div className="flex items-end justify-center md:justify-start">
                    <div className="my-4 flex flex-col items-center justify-center md:items-start">
                        <RouteNavList
                            routes={headerRoutes}
                            tabIndex={0}
                            className="flex flex-row"
                        />
                        <div className="mt-4 ml-4 flex space-x-4">
                            {socials.map(social => {
                                const SocialIcon = getIconAliased(social.iconId);

                                return SocialIcon ? (
                                    <NavLink
                                        href={social.url}
                                        aria-label={social.name}
                                        key={social.socialId}
                                    >
                                        <ResponsiveButton className="text-base-content flex opacity-80">
                                            <SocialIcon className="h-8 w-8" />
                                        </ResponsiveButton>
                                    </NavLink>
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
                <div className="my-4 flex items-end justify-center opacity-80 md:justify-end">
                    <p className="prose">
                        © {getYear(Date.now())} {settings?.firstName} {settings?.lastName}. All
                        Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
