import { useLocation } from "react-router-dom";

// TODO: Add a loading spinner while fetching data
// TODO: Look into the possibility of using props instead of location.state
// TODO: Add a back button to return to the previous page
// TODO: Add styling to the page
// TODO: Differentiate between previous purchased and wishlisted events
// TODO: Display users who have purchased tickets for the event
// TODO: Add correct details for the event (see demo)

export default function DashboardMoreInfoPage() {
    const location = useLocation();
    const event = location.state?.event; // Retrieve the passed event data

    if (!event) {
        return <p>Ingen data tilgjengelig for dette arrangementet.</p>;
    }

    return (
        <div className="dashboard-more-info-page">
            <section id="more-info-details">
                <h1>{event.title}</h1>
                <p><strong>Dato:</strong> {event.date}</p>
                <p><strong>Land:</strong> {event.country}</p>
                <p><strong>By:</strong> {event.city}</p>
                <p><strong>Sted:</strong> {event.venue}</p>
                {event.image ? (
                    <img src={event.image} alt={event.title || "Event image"} />
                ) : (
                    <p><strong>Bilde:</strong> Ingen bilde tilgjengelig.</p>
                )}
                <p><strong>Beskrivelse:</strong> {event.description || "Ingen beskrivelse tilgjengelig."}</p>
            </section>
            <section id="more-info-users">
                <h2>
                    Brukere som har kjøpt billett til dette arrangementet
                </h2>
                {/* Map through here */}
            </section>
        </div>
    );
}