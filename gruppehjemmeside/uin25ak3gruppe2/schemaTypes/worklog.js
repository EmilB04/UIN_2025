export const worklog = {
    name: 'worklog',
    title: 'Work Log',
    type: 'document',
    fields: [
        {
            name:'entry',
            title: 'Entry',
            type: 'text',
        },
        {
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            readOnly: true,
            initialValue: () => new Date().toISOString(),
        },
    ],
};