import { defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'apiId',
      title: 'API ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
    },
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  // Added a preview for better sanity studio experience
  preview: {
    select: {
      media: 'image',
      title: 'title',
      city: 'city'
    },
    prepare({ title, city, media }) {
      return {
        title,
        subtitle: city,
        media
      }
    }
  }
})