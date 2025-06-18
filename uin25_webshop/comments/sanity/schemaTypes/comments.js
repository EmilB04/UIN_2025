export const comments = {
  name: 'comments',
  title: 'Kommentarer',
  type: 'object',
  fields: [
    {
      name: 'user',
      title: 'Bruker',
      type: 'reference',
      to: [{type: 'users'}],
    },
    {
      name: 'comment',
      title: 'Kommentar',
      type: 'text',
    },
  ],
}
