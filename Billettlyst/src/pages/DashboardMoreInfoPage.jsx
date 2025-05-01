// TODO: Add a loading spinner while fetching data
// DOING: Add styling to the page
// DOING: Display users who have purchased tickets for the event
// TODO: Add correct details for the event (see demo)

import "../styles/dashboardMoreInfoStyle.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { fetchUsersWithCommonEvents } from "../sanity/userServices"; // Import fetch functions
import { fetchEventById } from "../sanity/eventServices"; // Import fetch functions
import PageNotFound from './PageNotFound';

export default function DashboardMoreInfoPage({ pageType }) {
    const { id } = useParams(); // Get the event ID from the URL
    const [usersWithCommonEvents, setUsersWithCommonEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const event = await fetchEventById(id); // Fetch the event by ID
                setCurrentEvent(event);
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEvent(); // Fetch the event when the component mounts
            fetchUsersWithCommonEventsHandler(); // Fetch users with the event
        }
    }, [id]);

    const fetchUsersWithCommonEventsHandler = async () => {
        setLoading(true);
        try {
            const users = await fetchUsersWithCommonEvents(id); // Fetch users with the event
            setUsersWithCommonEvents(users); // Update state with fetched users
        } catch (error) {
            console.error("Error fetching users with common events:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    if (!currentEvent) {
        return <PageNotFound />;
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
                <section id="more-info-wishlist" className="more-info-layout">
                    <article className="more-info-event-details">
                        <p><strong>Tittel:</strong> {currentEvent.title}</p>
                        <p><strong>Dato:</strong> {currentEvent.date}</p>
                        <p><strong>Sted:</strong> {currentEvent.location}</p>
                        <p><strong>Beskrivelse:</strong> {currentEvent.description}</p>
                    </article>
                    <article className="more-info-event-friends">
                        <h2>Venner som har lagt til dette arrangementet i ønskelisten</h2>
                        {loading ? (
                            <p>Laster inn...</p>
                        ) : (
                            <ul>
                                {usersWithCommonEvents.length > 0 ? (
                                    usersWithCommonEvents.map((user) => (
                                        <li key={user._id}>
                                            <img
                                                src={user.photo?.asset?.url || "https://placehold.co/50x50"}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                                            />
                                            <p>{`${user.firstName} ${user.lastName}`}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>Ingen venner har lagt til dette arrangementet i ønskelisten sin.</li>
                                )}
                            </ul>
                        )}
                    </article>
                </section>
            ) : (
                <section id="more-info-purchased">
                    <h1>Tidligere kjøp</h1>
                    <p>Arrangementet er tidligere kjøpt.</p>
                    <article className="more-info-event-details">
                        <h2>Arrangementdetaljer</h2>
                        <p><strong>Tittel:</strong> {currentEvent.title}</p>
                        <p><strong>Dato:</strong> {currentEvent.date}</p>
                        <p><strong>Sted:</strong> {currentEvent.location}</p>
                        <p><strong>Beskrivelse:</strong> {currentEvent.description}</p>
                    </article>
                    <article className="more-info-event-friends">
                        <h2>Venner som har kjøpt billetter til dette arrangementet</h2>
                        {loading ? (
                            <p>Laster inn...</p>
                        ) : (
                            <ul>
                                {usersWithCommonEvents.length > 0 ? (
                                    usersWithCommonEvents.map((user) => (
                                        <li key={user._id}>
                                            <img
                                                src={user.photo?.asset?.url || "https://placehold.co/50x50"}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                                            />
                                            <p>{`${user.firstName} ${user.lastName}`}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>Ingen venner har kjøpt billetter til dette arrangementet.</li>
                                )}
                            </ul>
                        )}
                    </article>
                </section>
            )}
        </div>
    );
}