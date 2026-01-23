import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { mediaFields } from "../fragments/media";

const settingsSchema = defineType({
    name: "settings",
    title: "Settings",
    type: "document",
    icon: CogIcon,
    fields: [
        defineField({
            name: "firstName",
            title: "First Name",
            type: "string",
        }),
        defineField({
            name: "lastName",
            title: "Last Name",
            type: "string",
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
        }),
        defineField({
            name: "avatar",
            title: "Avatar",
            type: "image",
            fields: [...mediaFields],
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "cv",
            title: "CV",
            type: "file",
            fields: [...mediaFields],
            options: { accept: ".pdf" },
        }),
        defineField({
            name: "resume",
            title: "Resume",
            type: "file",
            fields: [...mediaFields],
            options: { accept: ".pdf" },
        }),
    ],
});

export default settingsSchema;
