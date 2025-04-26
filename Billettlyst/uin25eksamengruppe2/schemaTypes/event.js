import { defineType } from 'sanity'

export default defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Tittel',
            type: 'string',
        },
        {
            name: 'apiId',
            title: 'API ID',
            type: 'string',
        },
    ],
})