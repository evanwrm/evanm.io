import { StrapiTimestamp } from "../lib/api";
import { Project } from "./Project";

export interface Publication extends StrapiTimestamp {
    title: string;
    author: string;
    booktitle?: string;
    journal?: string;
    pages?: string;
    year: string;
    organization?: string;
    pdf?: string;
    url?: string;
    award?: string;
    project?: Project;
}
