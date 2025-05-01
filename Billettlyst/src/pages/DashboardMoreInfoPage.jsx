// TODO: Add a loading spinner while fetching data
// DOING: Add styling to the page
// DOING: Display users who have purchased tickets for the event
// TODO: Add correct details for the event (see demo)

import "../styles/dashboardMoreInfoStyle.scss";
import { useState, useEffect } from "react";
import { fetchUsersWithCommonEvents } from "../sanity/userServices"; // Import the function

export default function DashboardMoreInfoPage({ event, pageType }) {
    const [usersWithCommonEvents, setUsersWithCommonEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPageType, setCurrentPageType] = useState(
        pageType || localStorage.getItem("pageType")
    ); // Use localStorage to persist pageType

    if (!event) {
        return <p>Ingen data tilgjengelig for dette arrangementet.</p>;
    }

    const getCurrentPageType = () => {
        const storedPageType = localStorage.getItem("pageType");
        if (storedPageType) {
            setCurrentPageType(storedPageType);
        } else {
            setCurrentPageType(pageType);
        }
    };

    const fetchUsersWithCommonEventsHandler = async () => {
        setLoading(true);
        try {
            const users = await fetchUsersWithCommonEvents(event._id); // Fetch users with the event
            setUsersWithCommonEvents(users); // Update state with fetched users
        } catch (error) {
            console.error("Error fetching users with common events:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        // Save the pageType to localStorage
        if (currentPageType) {
            localStorage.setItem("pageType", currentPageType);
        }

        fetchUsersWithCommonEventsHandler(); // Fetch users when the component mounts
    }, [currentPageType]);

    return (
        <div id="dashboard-more-info-page">
            <section id="more-info-header">
                <button onClick={() => window.history.back()} className="back-button">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1>Arrangementdetaljer</h1>
            </section>
            {currentPageType === "wishlist" ? (
                <section id="more-info-wishlist">
                    <article className="more-info-event-details">
                        <p>
                            <strong>Tittel:</strong> {event.title}
                        </p>
                        <p>
                            <strong>Dato:</strong> {event.date}
                        </p>
                        <p>
                            <strong>Sted:</strong> {event.location}
                        </p>
                        <p>
                            <strong>Beskrivelse:</strong> {event.description}
                        </p>
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
                                                src={
                                                    user.photo?.asset?.url || "https://placehold.co/50x50"
                                                }
                                                alt={`${user.firstName} ${user.lastName}`}
                                                style={{
                                                    borderRadius: "50%",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <p>{`${user.firstName} ${user.lastName}`}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        Ingen venner har lagt til dette arrangementet i ønskelisten
                                        sin.
                                    </li>
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
                        <p>
                            <strong>Tittel:</strong> {event.title}
                        </p>
                        <p>
                            <strong>Dato:</strong> {event.date}
                        </p>
                        <p>
                            <strong>Sted:</strong> {event.location}
                        </p>
                        <p>
                            <strong>Beskrivelse:</strong> {event.description}
                        </p>
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
                                                src={
                                                    user.photo?.asset?.url || "https://placehold.co/50x50"
                                                }
                                                alt={`${user.firstName} ${user.lastName}`}
                                                style={{
                                                    borderRadius: "50%",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <p>{`${user.firstName} ${user.lastName}`}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        Ingen venner har kjøpt billetter til dette arrangementet.
                                    </li>
                                )}
                            </ul>
                        )}
                    </article>
                </section>
            )}
        </div>
    );
}
