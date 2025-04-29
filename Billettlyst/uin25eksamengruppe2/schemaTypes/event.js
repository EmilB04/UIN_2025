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
    },
    {
      name: 'date',
      title: 'Dato',
      type: 'date',
    },
    {
      name: 'time',
      title: 'Tid',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Land',
      type: 'string',
    },
    {
      name: 'city',
      title: 'By',
      type: 'string',
    },
    {
      name: 'venue',
      title: 'Arena',
      type: 'string',
    }
  ],
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