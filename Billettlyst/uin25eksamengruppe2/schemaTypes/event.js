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
    {
      name: 'date',
      title: 'Dato',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY', // EU format
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'time',
      title: 'Tid',
      type: 'string',
      description: 'Angi tid i formatet HH:mm (24-timers format)',
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
          name: 'time',
          invert: false,
        }).error('Tid må være i formatet HH:mm'),
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