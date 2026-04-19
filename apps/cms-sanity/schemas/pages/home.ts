import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const homePageSchema = defineType({
    name: "home",
    title: "Home",
    type: "document",
    icon: HomeIcon,
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
        }),
        defineField({
            name: "logline",
            title: "Logline",
            type: "text",
        }),
        defineField({
            name: "intro",
            title: "Intro",
            type: "markdown",
        }),
        defineField({
            name: "includeIntro",
            title: "Include Intro",
            description: "Include the intro section on the home page",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "includeBlog",
            title: "Include Blog",
            description: "Include the blog section on the home page",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "includeContact",
            title: "Include Contact",
            description: "Include the contact section on the home page",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "includeEducation",
            title: "Include Education",
            description: "Include the education section on the home page",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "includeExperience",
            title: "Include Experience",
            description: "Include the experience section on the home page",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "includeProjects",
            title: "Include Projects",
            description: "Include the projects section on the home page",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "includePublications",
            title: "Include Publications",
            description: "Include the publications section on the home page",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "includeSkills",
            title: "Include Skills",
            description: "Include the skills section on the home page",
            type: "boolean",
            initialValue: true,
        }),
    ],
});

export default homePageSchema;
