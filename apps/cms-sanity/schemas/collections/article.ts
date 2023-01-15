import { defineField, defineType } from "sanity";
import { ReadingTimeInput } from "../../components/ReadingTimeInput";
import { mediaFields } from "../fragments/media";

const articleSchema = defineType({
    name: "article",
    title: "Article",
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
            name: "content",
            title: "Content",
            type: "markdown"
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "tag" }]
                }
            ]
        }),
        defineField({
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
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
            name: "stats",
            title: "Stats",
            type: "object",
            fields: [
                defineField(
                    {
                        name: "time",
                        title: "Time to Read",
                        type: "number",
                        components: {
                            input: ReadingTimeInput
                        },
                        options: {
                            source: "content"
                        }
                    },
                    { strict: false }
                ),
                defineField(
                    {
                        name: "words",
                        title: "Word Count",
                        type: "number",
                        components: {
                            input: ReadingTimeInput
                        },
                        options: {
                            source: "content",
                            statType: "words"
                        }
                    },
                    { strict: false }
                )
            ]
        })
    ]
});

export default articleSchema;
