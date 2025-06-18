export const parentCategory = {
    name: 'parentCategory',
    title: 'Parent Category',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Parent Category Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Parent Category Slug',
            type: 'slug',
            options : {
                source : 'title',
                maxLength : 96,
                slugify: (input) => {
                    const slug = input
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace('æ', 'ae')
                        .replace('ø', 'o')
                        .replace('å', 'aa')
                        .slice(0, 96);
                    return slug;
                },
            }
        },
    ],
}