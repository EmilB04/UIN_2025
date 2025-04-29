import "../styles/eventCardStyle.scss";

export default function EventCard({ name, date, time, country, city, venue, image }) {
    return (
        <article id="EventCard">
            <img src={image} alt={`Bilde av ${name}`}/>
            <h2>{name}</h2>
            <p>{date}</p>
            <p>{time}</p>
            <p>{country}</p>
            <p>{city}</p>
            <p>{venue}</p>
        </article>
    )
}