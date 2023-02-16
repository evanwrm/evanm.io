import { PinIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { mediaFields } from "../fragments/media";

const experienceSchema = defineType({
    name: "experience",
    title: "Experience",
    type: "document",
    icon: PinIcon,
    fields: [
        defineField({
            name: "role",
            title: "Role",
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "company",
                maxLength: 96
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "employmentType",
            title: "Employment Type",
            type: "string",
            options: {
                list: [
                    "selfemployed",
                    "freelance",
                    "internship",
                    "apprenticeship",
                    "contract-fulltime",
                    "contract-parttime",
                    "permanent-fulltime",
                    "permanent-parttime",
                    "casual-oncall",
                    "seasonal",
                    "coop"
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "locationType",
            title: "Location Type",
            type: "string",
            options: {
                list: ["remote", "onsite", "hybrid"]
            }
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string"
        }),
        defineField({
            name: "siteUrl",
            title: "Site URL",
            type: "url"
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "markdown"
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
        })
    ]
});

export default experienceSchema;
