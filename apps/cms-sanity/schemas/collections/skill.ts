import { BulbOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const skillSchema = defineType({
    name: "skill",
    title: "Skill",
    type: "document",
    icon: BulbOutlineIcon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96
            },
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
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "iconId",
            title: "Icon ID",
            type: "string",
            validation: Rule => Rule.required()
        })
    ]
});

export default skillSchema;
