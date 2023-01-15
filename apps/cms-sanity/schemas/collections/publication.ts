import { defineField, defineType } from "sanity";

const publicationSchema = defineType({
    name: "publication",
    title: "Publication",
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
            name: "abstract",
            title: "Abstract",
            type: "markdown",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "authors",
            title: "Authors",
            type: "array",
            of: [{ type: "string" }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "booktitle",
            title: "Booktitle",
            type: "string"
        }),
        defineField({
            name: "journal",
            title: "Journal",
            type: "string"
        }),
        defineField({
            name: "pages",
            title: "Pages",
            type: "string"
        }),
        defineField({
            name: "year",
            title: "Year",
            type: "date",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "organization",
            title: "Organization",
            type: "string"
        }),
        defineField({
            name: "url",
            title: "URL",
            type: "url",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "pdf",
            title: "PDF",
            type: "string"
        }),
        defineField({
            name: "award",
            title: "Award",
            type: "string"
        }),
        defineField({
            name: "project",
            title: "Project",
            type: "reference",
            to: [{ type: "project" }]
        })
    ]
});

export default publicationSchema;
