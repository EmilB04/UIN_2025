// TODO: Add a loading spinner while fetching data
// DOING: Add a back button to return to the previous page
// TODO: Add styling to the page
// DOING: Differentiate between previous purchased and wishlisted events
// DOING: Display users who have purchased tickets for the event
// TODO: Add correct details for the event (see demo)

import "../styles/dashboardMoreInfoStyle.scss"

export default function DashboardMoreInfoPage({ event, pageType }) {
    if (!event) {
        return <p>Ingen data tilgjengelig for dette arrangementet.</p>;
    }

    return (
        <div id="dashboard-more-info-page">
            <section id="more-info-header">
                <button onClick={() => window.history.back()} className="back-button">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1>Arrangementdetaljer</h1>
            </section>
            {pageType === "wishlist" ? (
                <section id="more-info-wishlist">
                    <h1>Ønskeliste</h1>
                    <p>Arrangementet er lagt til i ønskelisten din.</p>
                    <article className="more-info-event-details">
                        <h2>Arrangementdetaljer</h2>
                        <p><strong>Tittel:</strong> {event.title}</p>
                        <p><strong>Dato:</strong> {event.date}</p>
                        <p><strong>Sted:</strong> {event.location}</p>
                        <p><strong>Beskrivelse:</strong> {event.description}</p>
                    </article>
                    <article className="more-info-event-friends">
                        <h2>Venner som har lagt til dette arrangementet</h2>
                        <ul>
                            {event.friends && event.friends.length > 0 ? (
                                event.friends.map((friend, index) => (
                                    <li key={index}>{friend.name}</li>
                                ))
                            ) : (
                                <li>Ingen venner har lagt til dette arrangementet.</li>
                            )}
                        </ul>
                    </article>
                </section>
            ) : (
                <section id="more-info-purchased">
                    <h1>Tidligere kjøp</h1>
                    <p>Arrangementet er tidligere kjøpt.</p>
                    <article className="more-info-event-details">
                        <h2>Arrangementdetaljer</h2>
                        <p><strong>Tittel:</strong> {event.title}</p>
                        <p><strong>Dato:</strong> {event.date}</p>
                        <p><strong>Sted:</strong> {event.location}</p>
                        <p><strong>Beskrivelse:</strong> {event.description}</p>
                    </article>
                    <article className="more-info-event-friends">
                        <h2>Venner som har kjøpt billetter til dette arrangementet</h2>
                        <ul>
                            {event.friends && event.friends.length > 0 ? (
                                event.friends.map((friend, index) => (
                                    <li key={index}>{friend.name}</li>
                                ))
                            ) : (
                                <li>Ingen venner har kjøpt billetter til dette arrangementet.</li>
                            )}
                        </ul>
                    </article>
                </section>
            )}
        </div>
    );
}