import {
    BookOpenIcon,
    GraduationCapIcon,
    LightbulbIcon,
    WrenchIcon,
} from "lucide-react";
import { TocNav, TocNavItem } from "@/components/toc";

export default function SectionToc() {
    return (
        <TocNav>
            <TocNavItem id="experience">
                <WrenchIcon /> Experience
            </TocNavItem>
            <TocNavItem id="education">
                <GraduationCapIcon /> Education
            </TocNavItem>
            <TocNavItem id="projects">
                <LightbulbIcon /> Projects
            </TocNavItem>
            <TocNavItem id="publications">
                <BookOpenIcon /> Publications
            </TocNavItem>
        </TocNav>
    );
}
