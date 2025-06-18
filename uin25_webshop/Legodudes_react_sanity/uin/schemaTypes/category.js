import { slugifier } from "./helpers";

export const category = {
    type: "document",
    name: "category",
    title: "Kategori",
    fields: [
        {
            name: "categoryname",
            title: "Kategorinavn",
            type: "string"
        },
        {
            name: "categoryslug",
            title: "Pen URL",
            type: "slug",
            options: {
                source: "categoryname",
                slugify: input => slugifier(input)
            }
        }
    ]
}