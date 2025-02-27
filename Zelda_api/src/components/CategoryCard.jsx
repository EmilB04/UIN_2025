/* eslint-disable react/prop-types */
import "../assets/styles/gameCard.scss";
import { Link } from "react-router";

export default function CategoryCard({ item }) {
    return (
        <article className="gameCard">
            <h3>{item.name}</h3>
            <Link to={item.id}>Les mer {item.name}</Link>
        </article>
    );
}
