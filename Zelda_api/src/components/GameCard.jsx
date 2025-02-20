/* eslint-disable react/prop-types */
export default function GameCard({ game }) {
    return (
        <article>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <span>{game.released_date}</span>
        </article>
    )
}