import { defineField, defineType } from "sanity";
import { mediaFields } from "../fragments/media";

const projectSchema = defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "logline",
            title: "Logline",
            type: "text"
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "markdown"
        }),
        defineField({
            name: "siteUrl",
            title: "Live Site URL",
            type: "url"
        }),
        defineField({
            name: "repositoryUrl",
            title: "Repository URL",
            type: "url"
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "datetime"
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            type: "datetime"
        }),
        defineField({
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
            fields: [...mediaFields],
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: "media",
            title: "Media",
            type: "array",
            of: [
                {
                    type: "image",
                    fields: [...mediaFields]
                },
                {
                    type: "file",
                    fields: [...mediaFields],
                    options: { accept: "audio/*,video/*,.pdf,.doc,.docx" }
                }
            ]
        }),
        defineField({
            name: "skills",
            title: "Skills",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "skill" }]
                }
            ]
        })
    ]
});

export default projectSchema;
