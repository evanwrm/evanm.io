import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const tagSchema = defineType({
    name: "tag",
    title: "Tag",
    type: "document",
    icon: TagIcon,
    fields: [
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
            name: "iconId",
            title: "Icon ID",
            type: "string"
        })
    ]
});

export default tagSchema;
