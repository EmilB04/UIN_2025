export const categories = {
    name: "categories",
    title: "Categories",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Category Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Category Slug",
            type: "slug",
            options : {
                source: "title",
                maxLength: 96,
                slugify: (input) => {
                    const slug = input
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace("æ", "ae")
                        .replace("ø", "o")
                        .replace("å", "aa")
                        .slice(0, 96);
                    return slug;
                },
            },
        },
        {
            name : 'parentCategories',
            title : 'Parent Category',
            type : 'array',
            of : [
                {
                    type : 'reference',
                    to : [{type : 'parentCategory'}]
                }
            ]
        }
    ],
}