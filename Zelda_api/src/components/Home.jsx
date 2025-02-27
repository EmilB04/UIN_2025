/* eslint-disable react/prop-types */
import GameCard from "./GameCard";
import "../assets/styles/layout.scss";
import { useState } from "react";
import SearchForm from "./SearchForm";

export default function Home({ games, setGames }) {
    const [search, setSearch] = useState("");

    const handleClick = async () => {
        try {
            console.log(`Searching for: ${search}`);
            const response = await fetch(`https://zelda.fanapis.com/api/games?name=${search}`);
            const data = await response.json();
            console.log("API response data:", data);
            setGames(data.data);
        } catch (error) {
            console.error("Noe feil skjedde ved henting av data fra API", error);
        }
    };

    return (
        <main>
            <h1>Forside</h1>
            <SearchForm setSearch={setSearch} handleClick={handleClick} />
            <section className="flex-section">
                {games?.map(game => <GameCard key={game.id} game={game} />)}
            </section>
        </main>
    );
}