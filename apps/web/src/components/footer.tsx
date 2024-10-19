import { HoverButton } from "@/components/animation/hover-button";
import { getIcon } from "@/components/icon";
import { ThemeToggle } from "@/components/input/theme-toggle";
import { Link } from "@/components/navigation/link";
import { MainNav } from "@/components/navigation/main-nav";
import { socialFind } from "@/lib/services/sanity/queries";
import { getYear } from "date-fns";

interface Props {
    routes: { href: string; label: string }[];
}

export const Footer = async ({ routes }: Props) => {
    const socials = await socialFind({});

    return (
        <footer className="border-t p-4">
            <div className="mx-auto flex max-w-screen-2xl flex-col-reverse items-center gap-4 md:flex-row md:items-end">
                <div className="flex flex-col gap-2 md:items-start">
                    <MainNav routes={routes} tabIndex={0} />
                    <div className="flex h-8 items-end justify-center gap-4">
                        {socials.map(social => {
                            const SocialIcon = getIcon(social.iconId);
                            return SocialIcon ? (
                                <Link
                                    href={social.url}
                                    aria-label={social.name}
                                    key={social.socialId}
                                >
                                    <HoverButton>
                                        <SocialIcon className="h-6 w-6" />
                                    </HoverButton>
                                </Link>
                            ) : null;
                        })}
                    </div>
                </div>
                <div className="flex w-full flex-1 items-center justify-between gap-2 md:flex-col md:items-end">
                    <span className="text-muted-foreground text-xs">© {getYear(Date.now())}</span>
                    <ThemeToggle />
                </div>
            </div>
        </footer>
    );
};
