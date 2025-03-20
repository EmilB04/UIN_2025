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
                slugify: input => input.toLowerCase().replace("&", "and").replace(/\s+/g, "-").replace(/[^a-z0-9- ]/g, "")
            }
        }
    ]
}