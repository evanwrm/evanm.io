import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { ReadingTimeInput } from "../../components/ReadingTimeInput";
import { mediaFields } from "../fragments/media";

const articleSchema = defineType({
    name: "article",
    title: "Article",
    type: "document",
    icon: CommentIcon,
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
                ),
                defineField({
                    name: "views",
                    title: "Views",
                    type: "number",
                    description:
                        "Number of views this article has received. This is a read-only field.",
                    initialValue: 0,
                    readOnly: true
                })
            ]
        })
    ]
});

export default articleSchema;
