/* eslint-disable react/prop-types */
import GameCard from "./GameCard";

export default function Home({ games }) {
    return (
        <main>
            <h1>Forside</h1>
            {games?.map(game => <GameCard key={game.id} game={game} />)}
        </main>
    )
}