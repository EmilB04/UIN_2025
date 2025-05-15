import "../styles/eventCardStyle.scss";

export default function EventCard({ name, date, time, country, city, venue, image }) {
    let formattedDate = date;
    let formattedTime = time;
    let formattedLocation = "";

    if (date && time) {
        formattedDate = new Date(date).toLocaleDateString('no-NO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        formattedTime = new Date(`${date}T${time}`).toLocaleTimeString('no-NO', {
            hour: '2-digit',
            minute: '2-digit'
        });
    if (city && country) {
        city = city.charAt(0).toUpperCase() + city.slice(1);
        country = country.charAt(0).toUpperCase() + country.slice(1);
        formattedLocation = `${city}, ${country}`;
    }
    }

    return (
        <article id="eventCard">
            <img src={image} alt={`Bilde av ${name}`} />
            <h2>{name}</h2>
            <p>{formattedDate}</p>
            <p>{formattedTime}</p>
            <p>{formattedLocation}</p>
            <p>{venue}</p>
        </article>
    );
}