export const products = {
  name: 'products',
  title: 'Produkter',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Produktnavn',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
    },
    {
      name: 'comments',
      title: 'Kommentarer',
      type: 'array',
      of: [{type: 'comments'}],
    },
    {
      name: 'slug',
      title: 'Url',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace('æ', 'ae')
            .replace('å', 'aa')
            .replace('ø', 'o'),
      },
    },
  ],
}
