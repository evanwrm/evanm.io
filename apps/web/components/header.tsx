"use client";

import { useHideOnScroll, useScrollY } from "hooks/use-scroll";
import {
    BookOpenIcon,
    CopyIcon,
    FileTextIcon,
    HomeIcon,
    LightbulbIcon,
    MonitorIcon,
    MoonIcon,
    NewspaperIcon,
    PaletteIcon,
    SunIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { getIcon, Icon } from "@/components/icon";
import { Link } from "@/components/navigation/link";
import { MainNav } from "@/components/navigation/main-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import {
    Spotlight,
    SpotlightGroup,
    SpotlightInput,
    SpotlightItem,
    SpotlightList,
    SpotlightTrigger,
    useSpotlight,
} from "@/components/navigation/spotlight";
import { CommandEmpty, CommandList } from "@/components/ui/command";
import { env } from "@/lib/env/client.mjs";
import { isReference } from "@/lib/services/sanity/utils";
import { cn } from "@/lib/utils";
import type { Seo } from "@/lib/validators/seo";
import type { Settings } from "@/lib/validators/settings";
import type { SocialLink } from "@/lib/validators/social";

interface Props {
    routes: { href: string; label: string }[];
    socials: SocialLink[];
    seo: Seo;
    settings: Settings;
}

export const Header = ({ routes, socials, seo, settings }: Props) => {
    const yPos = useScrollY();
    const { hidden } = useHideOnScroll({ threshold: 80, showThreshold: 60 });

    return (
        <nav
            className={cn(
                "sticky top-0 z-40 flex h-16 items-center justify-center p-4 transition-all",
                yPos > 196
                    ? "border-border/60 border-b bg-background/60 bg-clip-padding backdrop-blur backdrop-saturate-200"
                    : "border-transparent bg-transparent",
                hidden
                    ? "pointer-events-none scale-[102%] select-none opacity-0"
                    : "",
            )}
        >
            <div className="flex w-1/2 items-center justify-start">
                <MobileNav routes={routes} />
                <Link
                    href="/"
                    aria-label="evanm.io"
                    className="ml-2 text-foreground/80 transition-all hover:text-foreground"
                >
                    <div className="inline font-bold">
                        <span>evanm</span>
                        <span className="text-red-600">.io</span>
                    </div>
                </Link>
                <div className="ml-8 hidden md:flex">
                    <MainNav
                        routes={routes}
                        tabIndex={0}
                        className="flex flex-row"
                    />
                </div>
            </div>
            <div className="mr-2 flex w-1/2 items-center justify-end gap-6">
                <Spotlight>
                    <SpotlightTrigger />
                    <SpotlightList>
                        <SpotlightInput />
                        <SpotlightCommands
                            socials={socials}
                            seo={seo}
                            settings={settings}
                        />
                    </SpotlightList>
                </Spotlight>
            </div>
        </nav>
    );
};

interface SpotlightCommandsProps {
    socials: SocialLink[];
    seo: Seo;
    settings: Settings;
}
function SpotlightCommands({ socials, seo, settings }: SpotlightCommandsProps) {
    const router = useRouter();
    const { setTheme } = useTheme();
    const { pushPage } = useSpotlight();

    const github = socials?.find(social => social.socialId === "github");
    const cvUrl =
        !isReference(settings?.cv?.asset) && settings?.cv?.asset.url
            ? settings.cv.asset.url
            : false;

    return (
        <CommandList className="scrollbar">
            <CommandEmpty>No results found.</CommandEmpty>
            <SpotlightGroup heading="General" page="home">
                <SpotlightItem
                    value="copy"
                    icon={<CopyIcon />}
                    shortcut={["Ctrl + C"]}
                    keywords={["copy", "paste", "url", "website", "domain"]}
                    onSelect={() =>
                        navigator.clipboard.writeText(env.NEXT_PUBLIC_SITE_URL)
                    }
                >
                    Copy URL
                </SpotlightItem>
                <SpotlightItem
                    value="source"
                    icon={<Icon.Github />}
                    shortcut={["Ctrl + U"]}
                    keywords={["code", "github", "source"]}
                    onSelect={() =>
                        open(`${github?.url}/${seo?.openGraph?.siteName ?? ""}`)
                    }
                >
                    View Source
                </SpotlightItem>
            </SpotlightGroup>
            <SpotlightGroup heading="Navigation" page="home">
                <SpotlightItem
                    value="home"
                    icon={<HomeIcon />}
                    shortcut={["g", "h"]}
                    keywords={["home", "index", "main"]}
                    onSelect={() => router.push("/")}
                >
                    Home
                </SpotlightItem>
                <SpotlightItem
                    value="projects"
                    icon={<LightbulbIcon />}
                    shortcut={["g", "p"]}
                    keywords={[
                        "project",
                        "side project",
                        "applications",
                        "hobby",
                    ]}
                    onSelect={() => router.push("/#projects")}
                >
                    Projects
                </SpotlightItem>
                <SpotlightItem
                    value="publications"
                    icon={<BookOpenIcon />}
                    shortcut={["g", "c"]}
                    keywords={["paper", "academia", "research", "school"]}
                    onSelect={() => router.push("/#publications")}
                >
                    Publications
                </SpotlightItem>
                <SpotlightItem
                    value="blog"
                    icon={<NewspaperIcon />}
                    shortcut={["g", "b"]}
                    keywords={["article", "writing", "words"]}
                    onSelect={() => router.push("/blog")}
                >
                    Blog
                </SpotlightItem>
                {cvUrl && (
                    <SpotlightItem
                        value="cv"
                        icon={<FileTextIcon />}
                        shortcut={["g", "r"]}
                        keywords={["resume", "curriculum vitae", "job", "work"]}
                        onSelect={() => open(cvUrl)}
                    >
                        Resume
                    </SpotlightItem>
                )}
            </SpotlightGroup>
            {socials && socials.length > 0 && (
                <SpotlightGroup heading="Socials" page="home">
                    {socials.map(social => {
                        const SocialIcon = getIcon(social.iconId);
                        return (
                            <SpotlightItem
                                key={social.socialId}
                                value={social.socialId}
                                icon={SocialIcon ? <SocialIcon /> : undefined}
                                keywords={[
                                    "socials",
                                    social.socialId,
                                    social.name,
                                ]}
                                subtitle={social.description ?? undefined}
                                onSelect={() => open(social.url)}
                            >
                                {social.name}
                            </SpotlightItem>
                        );
                    })}
                </SpotlightGroup>
            )}
            <SpotlightGroup heading="Preferences" page="home">
                <SpotlightItem
                    value="theme"
                    icon={<PaletteIcon />}
                    shortcut={["p", "t"]}
                    keywords={["theme", "color", "dark", "light", "background"]}
                    subtitle="Choose the application theme"
                    onSelect={() => pushPage("theme")}
                    closeOnSelect={false}
                >
                    Change Theme
                </SpotlightItem>
            </SpotlightGroup>
            <SpotlightGroup heading="Theme" page="theme">
                <SpotlightItem
                    value="light"
                    icon={<SunIcon />}
                    keywords={["light", "day", "theme"]}
                    breadcrumb="Theme"
                    onSelect={() => setTheme("light")}
                >
                    Light
                </SpotlightItem>
                <SpotlightItem
                    value="dark"
                    icon={<MoonIcon />}
                    keywords={["dark", "night", "theme"]}
                    breadcrumb="Theme"
                    onSelect={() => setTheme("dark")}
                >
                    Dark
                </SpotlightItem>
                <SpotlightItem
                    value="system"
                    icon={<MonitorIcon />}
                    keywords={["system", "default", "reset", "theme"]}
                    breadcrumb="Theme"
                    onSelect={() => setTheme("system")}
                >
                    System
                </SpotlightItem>
            </SpotlightGroup>
        </CommandList>
    );
}
