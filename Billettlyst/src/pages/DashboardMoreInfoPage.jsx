// TODO: Add a loading spinner while fetching data
// DOING: Add styling to the page
// TODO: Add correct details for the event (see demo)
// TODO: Fix so the 404 page doesn't show under loading.

import "../styles/dashboardMoreInfoStyle.scss";
import "../styles/app.scss"; // Import the global styles for the loading spinner
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { fetchUsersWithCommonEvents } from "../sanity/userServices"; // Import fetch functions
import { fetchEventById } from "../sanity/eventServices"; // Import fetch functions
import PageNotFound from './PageNotFound';
import Loading from "../components/Loading";

export default function DashboardMoreInfoPage({ pageType }) {
    const { id } = useParams(); // Get the event ID from the URL
    const [usersWithCommonEvents, setUsersWithCommonEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading

    const fetchUsersWithCommonEventsHandler = useCallback(async () => {
        try {
            const users = await fetchUsersWithCommonEvents(id);
            setUsersWithCommonEvents(users);
        } catch (error) {
            console.error("Error fetching users with common events:", error);
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            try {
                // Fetch event details
                const event = await fetchEventById(id);
                setCurrentEvent(event);

                // Fetch users with common events
                await fetchUsersWithCommonEventsHandler();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Stop loading after all data is fetched
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, fetchUsersWithCommonEventsHandler]);


    if (loading) {
        return Loading();
    }
    if (!currentEvent) {
        return <PageNotFound />; // Show PageNotFound if event is not found
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
                        {usersWithCommonEvents.length > 0 ? (
                            <ul>
                                {usersWithCommonEvents.map((user) => (
                                    <li key={user._id}>
                                        <img
                                            src={user.photo?.asset?.url || "https://placehold.co/50x50"}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                                        />
                                        <p>{`${user.firstName} ${user.lastName}`}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Ingen venner har lagt til dette arrangementet i ønskelisten sin.</p>
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
                        {usersWithCommonEvents.length > 0 ? (
                            <ul>
                                {usersWithCommonEvents.map((user) => (
                                    <li key={user._id}>
                                        <img
                                            src={user.photo?.asset?.url || "https://placehold.co/50x50"}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                                        />
                                        <p>{`${user.firstName} ${user.lastName}`}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Ingen venner har kjøpt billetter til dette arrangementet.</p>
                        )}
                    </article>
                </section>
            )}
        </div>
    );
}