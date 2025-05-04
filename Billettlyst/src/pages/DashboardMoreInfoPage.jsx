
// TODO: Add correct details for the event (see demo)

/*
DOING: (Må hente fra Ticketmaster API)
        Vis en opplisting av events fra både ønskelisten og tidligere kjøp, hentet fra brukerens tilknyttede data i Sanity.
        Hver event skal vises som et kort, med informasjon hentet fra Ticketmaster API:
        Navn på eventet
        Dato
        Bilde
*/

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
            <section className="more-info-details">
                <article>
                    <p><strong>ID:</strong> {currentEvent._id}</p>
                    <p><strong>Tittel:</strong> {currentEvent.title}</p>
                    <p><strong>Dato:</strong> {currentEvent.date}</p>
                    <p><strong>Klokkeslett:</strong> {currentEvent.time}</p>
                    <p><strong>Sted:</strong> {currentEvent.venue} - {currentEvent.city}, {currentEvent.country}</p>
                    <p><strong>Sjanger:</strong> {currentEvent.genre || "Ikke oppgitt"}</p>
                </article>
                <aside>
                    <img src={currentEvent.image || "https://placehold.co/200x200"} alt={currentEvent.title} />
                </aside>
            </section>
            <article className="more-info-friends">
                <h2>
                    {pageType === "wishlist"
                        ? "Personer som har lagt til dette arrangementet i ønskelisten"
                        : "Personer som har kjøpt billetter til dette arrangementet"}
                </h2>
                {usersWithCommonEvents.length > 0 ? (
                    <ul>
                        {usersWithCommonEvents.map((user) => (
                            <li key={user._id}>
                                <img
                                    src={user.photo?.asset?.url || "https://placehold.co/50x50"}
                                    alt={`${user.firstName} ${user.lastName}`}
                                />
                                <p>{`${user.firstName} ${user.lastName}`}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>
                        {pageType === "wishlist"
                            ? "Ingen personer har lagt til dette arrangementet i ønskelisten sin."
                            : "Ingen personer har kjøpt billetter til dette arrangementet."}
                    </p>
                )}
            </article>
        </div>
    );
}