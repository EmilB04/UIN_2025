/*
TODO: 
⬜ 
🔄 DOING:
✅ DONE:
    ✅ DONE: Karakter: E
        - Skal inneholde et innloggingsskjema (uten krav til reell funksjonalitet). 

    ✅ DONE: Karakter: D
        - Ikke relevant

    ✅ DONE: Karakter: C
        - Innloggingsskjema (ikke funksjonalitet - backend)
        - Når brukeren fyller ut skjemaet og "logger inn", skal:
                Innloggingsskjemaet skjules
                En ny visning vises med overskriften "Min side"
        - Påloggingsstatusen kan håndteres ved hjelp av en state-variabel (f.eks. isLoggedIn), som endres fra false til true når brukeren sender inn skjemaet.

    🔄 DOING: Karakter: B
        - På Dashboard-siden skal følgende vises:
            En oversikt over alle events lagret i Sanity
            En oversikt over alle brukere
            For hver bruker skal det vises:
            Navn og profilbilde
            En opptelling av events brukeren har i ønskelisten og tidligere kjøp
            En liste over disse eventene
    
    ⬜ Karakter: A
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
    
    
*/





import React, { useState, useEffect } from "react";
import "../styles/dashboardStyle.scss";
import { fetchAllUsers } from "../sanity/userServices"; // Importer funksjonen for å hente alle brukere fra Sanity

export default function DashboardPage() {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
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

    // Fetch events and users from Sanity
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await fetchAllUsers();
                setUsers(allUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);


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
                        <ul id="events-list">  {/* Fetch content from sanity */}

                        </ul>
                    </section>

                    {/* Users Overview */}
                    <section id="users-section">
                        <h2>Alle brukere</h2>
                        <ul id="users-list">
                            {users.map((user) => (
                                <li key={user._id} className="user-card">
                                    <img src={user.photo?.asset?.url} alt={`${user.firstName} ${user.lastName}`} />
                                    <h3>{`${user.firstName} ${user.lastName}`}</h3>
                                    <p>E-post: {user.email}</p>
                                    <p>Alder: {user.age}</p>
                                    <p>Ønskeliste: {user.wishlist?.length || 0} eventer</p>
                                    <p>Tidligere kjøp: {user.previousPurchases?.length || 0} eventer</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
            )}
        </div>
    );
}