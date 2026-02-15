import { getYear } from "date-fns";
import { HoverButton } from "@/components/animation/hover-button";
import { getIcon } from "@/components/icon";
import { Link } from "@/components/navigation/link";
import { MainNav } from "@/components/navigation/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { socialFind } from "@/lib/services/sanity/queries";

interface Props {
    routes: { href: string; label: string }[];
}
export async function Footer({ routes }: Props) {
    const socials = await socialFind({});

    return (
        <footer className="border-border/40 border-t px-4 py-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
                <div className="flex flex-col gap-6 md:items-start">
                    <MainNav
                        links={routes}
                        className="flex flex-wrap justify-center md:justify-start"
                    />
                    <div className="flex items-center justify-center gap-4">
                        {socials.map(social => {
                            const SocialIcon = getIcon(social.iconId);
                            return SocialIcon ? (
                                <Link
                                    href={social.url}
                                    aria-label={social.name}
                                    key={social.socialId}
                                >
                                    <HoverButton>
                                        <SocialIcon className="h-4 w-4" />
                                    </HoverButton>
                                </Link>
                            ) : null;
                        })}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 md:items-end">
                    <ThemeToggle />
                    <span className="text-muted-foreground text-xs">
                        © {getYear(Date.now())}
                    </span>
                </div>
            </div>
        </footer>
    );
}
