import { defineField } from "sanity";

export const mediaFields = [
    defineField({
        name: "title",
        title: "Title",
        type: "string"
    }),
    defineField({
        name: "alt",
        title: "Alt",
        type: "string"
    })
];
