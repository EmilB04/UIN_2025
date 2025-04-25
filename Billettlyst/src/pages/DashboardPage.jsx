{/*
FIXME:
TODO: 
    Karakter: E
        - Skal inneholde et innloggingsskjema (uten krav til reell funksjonalitet).

    Karakter: D
        - Ikke relevant

    Karakter: C
        - Innloggingsskjema (ikke funksjonalitet - backend)
        - Når brukeren fyller ut skjemaet og "logger inn", skal:
                Innloggingsskjemaet skjules
                En ny visning vises med overskriften "Min side"
        - Påloggingsstatusen kan håndteres ved hjelp av en state-variabel (f.eks. isLoggedIn), som endres fra false til true når brukeren sender inn skjemaet.

    Karakter: B
        - På Dashboard-siden skal følgende vises:
            En oversikt over alle events lagret i Sanity
            En oversikt over alle brukere
            For hver bruker skal det vises:
            Navn og profilbilde
            En opptelling av events brukeren har i ønskelisten og tidligere kjøp
            En liste over disse eventene
    
    Karakter: A
        - På Dashboard-siden skal innholdet være delt opp i to tydelige seksjoner:

        1. Brukerinformasjon
        Viser kun informasjon om den innloggede brukeren (f.eks. navn, e-post, bilde, alder)
        
        2. Brukerens innhold
        Ønskeliste og tidligere kjøp
        
        Vis en opplisting av events fra både ønskelisten og tidligere kjøp, hentet fra brukerens tilknyttede data i Sanity.
        Hver event skal vises som et kort, med informasjon hentet fra Ticketmaster API:
        Navn på eventet
        Dato
        Bilde
        Venner-funksjonalitet
        
        Oppdater brukerens Sanity-modell ved å legge til et nytt felt: friends
        Dette skal være en referanse til én eller flere andre brukere i systemet.
        I grensesnittet skal du hente ut og vise vennelisten til den innloggede brukeren.
        Felles arrangementer
        
        Under hver venn i visningen, skal det kontrolleres om brukeren og vennen har felles events i ønskelisten.
        Dersom det finnes et eller flere felles arrangementer, skal det vises en melding som for eksempel:
        "Du og [Navn] har samme event i ønskelisten – hva med å dra sammen på [Eventnavn]?"
    
    
*/}





import React, { useState, useEffect } from "react";
import "../styles/dashboardStyle.scss";

export default function DashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    // Dummy data for events
    const [events, setEvents] = useState([
        {
            id: 1,
            name: "Concert A",
            date: "2025-05-01",
            image: "https://placehold.co/400",
        },
        {
            id: 2,
            name: "Concert B",
            date: "2025-06-15",
            image: "https://placehold.co/400",
        },
        {
            id: 3,
            name: "Concert C",
            date: "2025-07-20",
            image: "https://placehold.co/400",
        },
    ]);

    // Dummy data for users
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "User One",
            image: "https://placehold.co/400",
            wishlist: [
                {
                    id: 1,
                    name: "Concert A",
                    date: "2025-05-01",
                    image: "https://placehold.co/200",
                },
            ],
            purchases: [
                {
                    id: 2,
                    name: "Concert B",
                    date: "2025-06-15",
                    image: "https://placehold.co/200",
                },
            ],
        },
        {
            id: 2,
            name: "User Two",
            image: "https://placehold.co/400",
            wishlist: [
                {
                    id: 3,
                    name: "Concert C",
                    date: "2025-07-20",
                    image: "https://placehold.co/200",
                },
            ],
            purchases: [],
        },
    ]);

    // Handle login
    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Save login state to localStorage
    };

    // Handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn"); // Clear login state from localStorage
    };

    return (
        <div id="dashboard-page">
            {!isLoggedIn ? (
                <section id="login-section">
                    <h1>Velkommen tilbake</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-wrapper">
                            <i className="fas fa-envelope"></i>
                            <input type="email" id="email" placeholder="E-post" required />
                        </div>
                        <div className="input-wrapper">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                placeholder="Passord"
                                required
                            />
                        </div>
                        <button type="submit">Logg inn</button>
                    </form>
                </section>
            ) : (
                <section id="dashboard-section">
                    <h1>Min side</h1>
                    <button onClick={handleLogout}>Logg ut</button>

                    {/* Events Overview */}
                    <section id="events-section">
                        <h2>Alle eventer</h2>
                        <div id="events-list">
                            {events.map((event) => (
                                <div key={event.id} className="event-card">
                                    <img src={event.image} alt={event.name} />
                                    <h3>{event.name}</h3>
                                    <p>{event.date}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Users Overview */}
                    <section id="users-section">
                        <h2>Alle brukere</h2>
                        <div id="users-list">
                            {users.map((user) => (
                                <div key={user.id} className="user-card">
                                    <img src={user.image} alt={user.name} />
                                    <h3>{user.name}</h3>
                                    <p>Ønskeliste: {user.wishlist.length} eventer</p>
                                    <p>Tidligere kjøp: {user.purchases.length} eventer</p>
                                    <div className="user-events">
                                        <h4>Ønskeliste:</h4>
                                        {user.wishlist.map((event) => (
                                            <div key={event.id} className="event-card">
                                                <img src={event.image} alt={event.name} />
                                                <p>{event.name}</p>
                                            </div>
                                        ))}
                                        <h4>Tidligere kjøp:</h4>
                                        {user.purchases.map((event) => (
                                            <div key={event.id} className="event-card">
                                                <img src={event.image} alt={event.name} />
                                                <p>{event.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>
            )}
        </div>
    );
}