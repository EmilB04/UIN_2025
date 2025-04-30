export const category = {
    name: 'categories',
    title: 'Categories',
    type: 'document',
    fields: [
      {
        name: 'categoryname',
        title: 'Category Name',
        type: 'string',
      },
      {
        name: 'categoryslug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'categoryname',
          maxLength: 200, // will be ignored if slugify is set
          slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
        },
      },
    ],
  }