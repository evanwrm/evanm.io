import { defineField, defineType } from "sanity";

const openGraphMediaSchema = defineField({
    name: "openGraphMedia",
    title: "OpenGraph Media",
    type: "object",
    fields: [
        defineField({
            name: "url",
            title: "URL",
            type: "string"
        }),
        defineField({
            name: "width",
            title: "Width",
            type: "number",
            validation: Rule => Rule.integer()
        }),
        defineField({
            name: "height",
            title: "Height",
            type: "number",
            validation: Rule => Rule.integer()
        }),
        defineField({
            name: "alt",
            title: "Alt",
            type: "string"
        }),
        defineField({
            name: "type",
            title: "Type",
            type: "string"
        }),
        defineField({
            name: "secureUrl",
            title: "Secure URL",
            type: "string"
        })
    ]
});
const openGraphProfileSchema = defineField({
    name: "openGraphProfile",
    title: "OpenGraph Profile",
    type: "object",
    fields: [
        defineField({
            name: "firstName",
            title: "First Name",
            type: "string"
        }),
        defineField({
            name: "lastName",
            title: "Last Name",
            type: "string"
        }),
        defineField({
            name: "username",
            title: "Username",
            type: "string"
        }),
        defineField({
            name: "gender",
            title: "Gender",
            type: "string"
        })
    ]
});
const openGraphSchema = defineField({
    name: "openGraph",
    title: "OpenGraph",
    type: "object",
    fields: [
        defineField({
            name: "url",
            title: "URL",
            type: "string"
        }),
        defineField({
            name: "type",
            title: "Type",
            type: "string"
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string"
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text"
        }),
        defineField({
            name: "siteName",
            title: "Site Name",
            type: "string"
        }),
        defineField({
            name: "locale",
            title: "Locale",
            type: "string"
        }),
        defineField({
            name: "images",
            title: "Images",
            type: "array",
            of: [openGraphMediaSchema]
        }),
        openGraphProfileSchema
    ]
});

const twitterSchema = defineField({
    name: "twitter",
    title: "Twitter",
    type: "object",
    fields: [
        defineField({
            name: "handle",
            title: "Handle",
            type: "string"
        }),
        defineField({
            name: "site",
            title: "Site",
            type: "string"
        }),
        defineField({
            name: "cardType",
            title: "Card Type",
            type: "string"
        })
    ]
});

const seoSchema = defineType({
    name: "seo",
    title: "SEO",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string"
        }),
        defineField({
            name: "titleTemplate",
            title: "Title Template",
            type: "string"
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text"
        }),
        defineField({
            name: "canonical",
            title: "Canonical",
            type: "string"
        }),
        openGraphSchema,
        twitterSchema
    ]
});

export default seoSchema;
