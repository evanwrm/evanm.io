import { defineField, defineType } from "sanity";

const socialSchema = defineType({
    name: "social",
    title: "Social",
    type: "document",
    fields: [
        defineField({
            name: "socialId",
            title: "Social ID",
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "markdown"
        }),
        defineField({
            name: "url",
            title: "URL",
            type: "url",
            validation: Rule =>
                Rule.required().uri({
                    scheme: ["http", "https", "mailto", "tel"]
                })
        }),
        defineField({
            name: "iconId",
            title: "Icon ID",
            type: "string",
            validation: Rule => Rule.required()
        })
    ]
});

export default socialSchema;
