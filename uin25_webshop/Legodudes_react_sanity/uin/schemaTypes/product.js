import { slugifier } from "./helpers";

export const product = {
    name: "product",
    title: "Produkt",
    type: "document",
    fields: [
        {
            name: "producttitle",
            title: "Produktnavn",
            type: "string"
        },
        {
            name: "slug",
            title: "Pen URL",
            type: "slug",
            options: {
                source: "producttile",
                slugify: input => slugifier(input)
            }
        },
        {
            name: "productimage",
            title: "Produktbilde",
            type: "image"
        },
        {
            name: "price",
            title: "Pris",
            type: "number"
        },
        {
            name: "category",
            title: "Kategori",
            type: "reference",
            to: [{ type: "category"}]
        }
    ]
}