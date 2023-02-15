import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const landingPageSchema = defineType({
    name: "landing",
    title: "Landing",
    type: "document",
    icon: HomeIcon,
    fields: [
        defineField({
            name: "logline",
            title: "Logline",
            type: "text"
        }),
        defineField({
            name: "intro",
            title: "Intro",
            type: "markdown"
        })
    ]
});

export default landingPageSchema;
