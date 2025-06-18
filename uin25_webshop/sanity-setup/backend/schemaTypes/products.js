export const products = {
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'productname',
            type: 'string',
        },
        {
            name: 'price',
            type: 'number',
        },
        {
            name: 'image',
            type: 'image',
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of : [{
                type: 'reference',
                to: [{ type: 'categories' }]
            }]
        }
    ],
}
