import { SunIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { mediaFields } from "../fragments/media";

const educationSchema = defineType({
    name: "education",
    title: "Education",
    type: "document",
    icon: SunIcon,
    fields: [
        defineField({
            name: "educationLevel",
            title: "Education Level",
            type: "string",
            options: {
                list: ["primary", "highschool", "undergraduate", "graduate", "postgraduate"]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "school",
            title: "School",
            type: "string",
            validation: Rule => Rule.required()
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
            name: "gpa",
            title: "GPA",
            type: "string"
        }),
        defineField({
            name: "courses",
            title: "Courses",
            type: "array",
            of: [
                defineField({
                    name: "course",
                    title: "Course",
                    type: "object",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Name",
                            type: "string"
                        }),
                        defineField({
                            name: "instructor",
                            title: "Instructor",
                            type: "string"
                        })
                    ]
                })
            ]
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

export default educationSchema;
