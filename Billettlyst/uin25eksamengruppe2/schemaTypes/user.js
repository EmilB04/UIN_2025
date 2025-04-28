import { defineType } from 'sanity'

export default defineType({
    name: 'user',
    title: 'Bruker',
    type: 'document',
    fields: [
        {
            name: 'firstName',
            title: 'Fornavn',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'lastName',
            title: 'Etternavn',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'userId',
            title: 'Brukernavn',
            type: 'slug',
            options: {
                source: async (doc, context) => {
                    try {
                        // Fetch the total count of users
                        const userCount = await context.getClient({ apiVersion: '2023-10-01' }).fetch('count(*[_type == "user"])');
                        
                        // Ensure firstName and lastName are provided
                        if (!doc.firstName || !doc.lastName) {
                            return `user-${userCount}`;
                        }

                        // Generate userId based on firstName, lastName, and user count
                        return `${doc.firstName.toLowerCase()}${doc.lastName.toLowerCase()}-${userCount}`;
                    } catch (error) {
                        context.log.error('Error generating userId:', error);
                        return 'user-unknown';
                    }
                },
                maxLength: 96,
                slugify: (input) => input.toLowerCase().replace(/\s+/g, '-'),
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'photo',
            title: 'Bilde',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'email',
            title: 'E-post',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        },
        {
            name: 'phoneNumber',
            title: 'Telefonnummer',
            type: 'string',
        },
        {
            name: 'gender',
            title: 'Kjønn',
            type: 'string',
            options: {
                list: [
                    { title: 'Mann', value: 'male' },
                    { title: 'Kvinne', value: 'female' },
                    { title: 'Annet', value: 'other' },
                ],
            },
        },
        {
            name: 'otherGender',
            title: 'Spesifiser kjønn',
            type: 'string',
            hidden: ({ parent }) => parent?.gender !== 'other',
        },
        {
            name: 'age',
            title: 'Alder',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(150),
        },
        {
            name: "friends",
            type: "array",
            title: "Friends",
            of: [{ type: "reference", to: [{ type: "user" }] }],
        },
        {
            name: 'previousPurchases',
            title: 'Tidligere kjøp',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'event' }] }],
        },
        {
            name: 'wishlist',
            title: 'Ønskeliste',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'event' }] }],
        },
    ],
    // Add a preview for the document
    preview: {
        select: {
            firstName: 'firstName',
            lastName: 'lastName',
            photo: 'photo',
        },
        prepare(selection) {
            const { firstName, lastName, photo } = selection;
            return {
                title: `${firstName} ${lastName}`,
                media: photo,
            };
        },
    },
});