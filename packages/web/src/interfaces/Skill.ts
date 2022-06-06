import { StrapiTimestamp } from "../lib/api";
import { Project } from "./Project";

export interface Skill extends StrapiTimestamp {
    skillId: string;
    name: string;
    iconId: string;
    description?: string;
    url?: string;
    projects: Project[];
}
