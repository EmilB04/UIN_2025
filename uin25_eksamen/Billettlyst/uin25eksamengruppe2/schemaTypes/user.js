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
            name: 'password',
            title: 'Passord',
            type: 'string',
            validation: (Rule) => Rule.required().min(8).error('Passordet må være minst 8 tegn langt'),
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
            of: [{ type: "reference", to: [{ type: "user" }] }], // Reference to other users
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