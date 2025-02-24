/* eslint-disable react/prop-types */
export default function CategoryCard({ item }) {
    return (
        <article key={item.id}>
            <h3>{item.name}</h3>
        </article>
    )
}