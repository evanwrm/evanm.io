import {
    BookOpenIcon,
    CopyIcon,
    FileTextIcon,
    GlobeIcon,
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
import {
    localeInfo,
    localizedPath,
    setLocale,
    useTranslations,
} from "@/lib/i18n";
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
    const { t } = useTranslations();

    return (
        <Spotlight>
            <SpotlightTrigger
                label={t("spotlight.search")}
                aria-label={t("spotlight.open")}
            />
            <SpotlightList
                title={t("spotlight.title")}
                description={t("spotlight.description")}
            >
                <SpotlightInput placeholder={t("spotlight.placeholder")} />
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
    const { t, name: langName } = useTranslations();
    const { pushPage } = useSpotlight();

    const github = socials?.find((social: any) => social.socialId === "github");
    const cvUrl =
        settings?.cv && !isReference(settings.cv.asset) && settings.cv.asset.url
            ? settings.cv.asset.url
            : false;

    return (
        <CommandList className="scrollbar">
            <CommandEmpty>{t("spotlight.noResults")}</CommandEmpty>
            <SpotlightGroup heading={t("spotlight.general")} page="home">
                <SpotlightItem
                    value="copy"
                    icon={<CopyIcon />}
                    shortcut={["Ctrl + C"]}
                    keywords={["copy", "paste", "url", "website", "domain"]}
                    onSelect={() => navigator.clipboard.writeText(siteUrl)}
                >
                    {t("common.copyUrl")}
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
                    {t("common.viewSource")}
                </SpotlightItem>
            </SpotlightGroup>
            <SpotlightGroup heading={t("spotlight.navigation")} page="home">
                <SpotlightItem
                    value="home"
                    icon={<HomeIcon />}
                    shortcut={["g", "h"]}
                    keywords={["home", "index", "main"]}
                    onSelect={() => {
                        window.location.href = localizedPath("/");
                    }}
                >
                    {t("common.home")}
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
                        window.location.href = localizedPath("/#projects");
                    }}
                >
                    {t("home.projects")}
                </SpotlightItem>
                <SpotlightItem
                    value="publications"
                    icon={<BookOpenIcon />}
                    shortcut={["g", "c"]}
                    keywords={["paper", "academia", "research", "school"]}
                    onSelect={() => {
                        window.location.href = localizedPath("/#publications");
                    }}
                >
                    {t("home.publications")}
                </SpotlightItem>
                <SpotlightItem
                    value="blog"
                    icon={<NewspaperIcon />}
                    shortcut={["g", "b"]}
                    keywords={["article", "writing", "words"]}
                    onSelect={() => {
                        window.location.href = localizedPath("/blog");
                    }}
                >
                    {t("common.blog")}
                </SpotlightItem>
                {cvUrl && (
                    <SpotlightItem
                        value="cv"
                        icon={<FileTextIcon />}
                        shortcut={["g", "r"]}
                        keywords={["resume", "curriculum vitae", "job", "work"]}
                        onSelect={() => open(cvUrl)}
                    >
                        {t("common.resume")}
                    </SpotlightItem>
                )}
            </SpotlightGroup>
            {socials && socials.length > 0 && (
                <SpotlightGroup heading={t("spotlight.socials")} page="home">
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
            <SpotlightGroup heading={t("spotlight.preferences")} page="home">
                <SpotlightItem
                    value="language"
                    icon={<GlobeIcon />}
                    keywords={[
                        "language",
                        "locale",
                        "translation",
                        "i18n",
                        langName,
                    ]}
                    subtitle={langName}
                    onSelect={() => pushPage("language")}
                    closeOnSelect={false}
                >
                    {t("spotlight.changeLanguage")}
                </SpotlightItem>
                <SpotlightItem
                    value="theme"
                    icon={<PaletteIcon />}
                    shortcut={["p", "t"]}
                    keywords={["theme", "color", "dark", "light", "background"]}
                    subtitle={t("theme.chooseTheme")}
                    onSelect={() => pushPage("theme")}
                    closeOnSelect={false}
                >
                    {t("theme.changeTheme")}
                </SpotlightItem>
            </SpotlightGroup>
            <SpotlightGroup heading={t("spotlight.languages")} page="language">
                <SpotlightItem
                    value="language-browser-default"
                    icon={<GlobeIcon />}
                    keywords={[
                        "language",
                        "locale",
                        "browser",
                        "system",
                        "auto",
                    ]}
                    breadcrumb={t("spotlight.changeLanguage")}
                    onSelect={() => setLocale(null)}
                >
                    {t("theme.system")}
                </SpotlightItem>
                {Object.entries(localeInfo).map(([locale, info]) => (
                    <SpotlightItem
                        key={locale}
                        value={`language-${locale}`}
                        icon={<GlobeIcon />}
                        keywords={["language", "locale", locale, info.name]}
                        breadcrumb={t("spotlight.changeLanguage")}
                        subtitle={locale}
                        onSelect={() => setLocale(locale as any)}
                    >
                        {info.name}
                    </SpotlightItem>
                ))}
            </SpotlightGroup>
            <SpotlightGroup heading={t("theme.changeTheme")} page="theme">
                <SpotlightItem
                    value="light"
                    icon={<SunIcon />}
                    keywords={["light", "day", "theme"]}
                    breadcrumb={t("theme.changeTheme")}
                    onSelect={() => setTheme("light")}
                >
                    {t("theme.light")}
                </SpotlightItem>
                <SpotlightItem
                    value="dark"
                    icon={<MoonIcon />}
                    keywords={["dark", "night", "theme"]}
                    breadcrumb={t("theme.changeTheme")}
                    onSelect={() => setTheme("dark")}
                >
                    {t("theme.dark")}
                </SpotlightItem>
                <SpotlightItem
                    value="system"
                    icon={<MonitorIcon />}
                    keywords={["system", "default", "reset", "theme"]}
                    breadcrumb={t("theme.changeTheme")}
                    onSelect={() => setTheme("system")}
                >
                    {t("theme.system")}
                </SpotlightItem>
            </SpotlightGroup>
        </CommandList>
    );
}
