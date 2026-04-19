import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const resumeRequestSchema = defineType({
    name: "resumeRequest",
    title: "Resume Request",
    type: "document",
    icon: DocumentIcon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "workEmail",
            title: "Work Email",
            type: "string",
            validation: Rule => Rule.required().email(),
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "siteUrl",
            title: "Website",
            type: "url",
        }),
        defineField({
            name: "note",
            title: "Note",
            type: "text",
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            initialValue: "pending",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Approved", value: "approved" },
                    { title: "Denied", value: "denied" },
                ],
                layout: "radio",
            },
            validation: Rule => Rule.required(),
        }),
    ],
    preview: {
        select: {
            name: "name",
            company: "company",
            status: "status",
        },
        prepare({ name, company, status }) {
            return {
                title: name
                    ? `${name}${company ? ` — ${company}` : ""}`
                    : "Resume Request",
                subtitle: status ?? "pending",
            };
        },
    },
});

export default resumeRequestSchema;
