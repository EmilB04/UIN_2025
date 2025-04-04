export const schemaTypes = [
    {
        name: 'GroupMember',
        title: 'Group Members',
        type: 'document',
        fields: [
            {
                name: 'name',
                title: 'Name',
                type: 'string',
            },
            {
                name: 'email',
                title: 'Email',
                type: 'string',
            },
            {
                name: 'slug',
                title: 'Slug',
                type: 'slug',
                options: {
                    source: (doc) => doc.name.split(' ')[0].toLowerCase(),
                    maxLength: 96,
                },
            },
            {
                name: 'photo',
                title: 'Photo',
                type: 'image',
                options: {
                    hotspot: true,
                },
            },
            {
                name: 'bio',
                title: 'Bio',
                type: 'text',
                options: {
                    maxLength: 200,
                },
            },
            {
                name: 'interests',
                title: 'Interests',
                type: 'array',
                of: [{ type: 'string' }],
            },
            {
                name: 'worklog',
                title: 'Work Log',
                type: 'array',
                of: [
                    {
                        type: 'reference',
                        to: [{ type: 'WorklogEntry' }],
                    },
                ],
            }
        ],
    },
];
