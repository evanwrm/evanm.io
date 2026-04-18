import {
    BookOpenIcon,
    GraduationCapIcon,
    LightbulbIcon,
    WrenchIcon,
} from "lucide-react";
import { TocNav, TocNavItem } from "@/components/toc";
import { useTranslations } from "@/lib/i18n";

export default function SectionToc() {
    const { t } = useTranslations();

    return (
        <TocNav>
            <TocNavItem id="experience">
                <WrenchIcon /> {t("home.experience")}
            </TocNavItem>
            <TocNavItem id="education">
                <GraduationCapIcon /> {t("home.education")}
            </TocNavItem>
            <TocNavItem id="projects">
                <LightbulbIcon /> {t("home.projects")}
            </TocNavItem>
            <TocNavItem id="publications">
                <BookOpenIcon /> {t("home.publications")}
            </TocNavItem>
        </TocNav>
    );
}
