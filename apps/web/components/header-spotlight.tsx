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
import { getIcon, Icon } from "@/components/icon";
import {
    Spotlight,
    SpotlightGroup,
    SpotlightInput,
    SpotlightItem,
    SpotlightList,
    SpotlightTrigger,
    useSpotlight,
} from "@/components/spotlight";
import { CommandEmpty, CommandList } from "@/components/ui/command";
import { isReference } from "@/lib/sanity/utils";
import { setTheme } from "@/lib/theme";
import type { Settings } from "@/lib/validators/settings";
import type { SocialLink } from "@/lib/validators/social";

interface SpotlightHeaderProps {
    socials: SocialLink[];
    settings: Settings;
    siteUrl: string;
}
export function HeaderSpotlight({
    socials,
    settings,
    siteUrl,
}: SpotlightHeaderProps) {
    return (
        <Spotlight>
            <SpotlightTrigger />
            <SpotlightList>
                <SpotlightInput />
                <SpotlightCommands
                    socials={socials}
                    settings={settings}
                    siteUrl={siteUrl}
                />
            </SpotlightList>
        </Spotlight>
    );
}

interface SpotlightCommandsProps {
    socials: SocialLink[];
    settings: Settings;
    siteUrl: string;
}
function SpotlightCommands({
    socials,
    settings,
    siteUrl,
}: SpotlightCommandsProps) {
    const { pushPage } = useSpotlight();

    const github = socials?.find((social: any) => social.socialId === "github");
    const cvUrl =
        settings?.cv && !isReference(settings.cv.asset) && settings.cv.asset.url
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
                    onSelect={() => navigator.clipboard.writeText(siteUrl)}
                >
                    Copy URL
                </SpotlightItem>
                <SpotlightItem
                    value="source"
                    icon={<Icon.Github />}
                    shortcut={["Ctrl + U"]}
                    keywords={["code", "github", "source"]}
                    onSelect={() =>
                        open(`${github?.url}/${new URL(siteUrl).hostname}`)
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
                    onSelect={() => {
                        window.location.href = "/";
                    }}
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
                    onSelect={() => {
                        window.location.href = "/#projects";
                    }}
                >
                    Projects
                </SpotlightItem>
                <SpotlightItem
                    value="publications"
                    icon={<BookOpenIcon />}
                    shortcut={["g", "c"]}
                    keywords={["paper", "academia", "research", "school"]}
                    onSelect={() => {
                        window.location.href = "/#publications";
                    }}
                >
                    Publications
                </SpotlightItem>
                <SpotlightItem
                    value="blog"
                    icon={<NewspaperIcon />}
                    shortcut={["g", "b"]}
                    keywords={["article", "writing", "words"]}
                    onSelect={() => {
                        window.location.href = "/blog";
                    }}
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
                    {socials.map((social: any) => {
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
