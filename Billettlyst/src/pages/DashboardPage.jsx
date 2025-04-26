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
    
    🔄 DOING: Karakter: A
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

        Venner-funksjonalitet:
        Oppdater brukerens Sanity-modell ved å legge til et nytt felt: friends
        Dette skal være en referanse til én eller flere andre brukere i systemet.
        I grensesnittet skal du hente ut og vise vennelisten til den innloggede brukeren.
        
        Felles arrangementer:
        Under hver venn i visningen, skal det kontrolleres om brukeren og vennen har felles events i ønskelisten.
        Dersom det finnes et eller flere felles arrangementer, skal det vises en melding som for eksempel:
        "Du og [Navn] har samme event i ønskelisten – hva med å dra sammen på [Eventnavn]?"
    
    
*/

import React, { useState, useEffect } from "react";
import "../styles/dashboardStyle.scss";
import { fetchAllUsers, fetchUserById } from "../sanity/userServices"; // Import fetch functions

export default function DashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Fetch all users and find the user with the matching email (from input)
            const allUsers = await fetchAllUsers();
            const user = allUsers.find((u) => u.email === email);

            if (user) {
                if (password === user.password) {
                    setIsLoggedIn(true);
                    setLoggedInUser(user);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("loggedInUserId", user._id); // Save user ID to localStorage
                    setError(""); // Clear any previous error
                } else {
                    setError("Feil passord. Prøv igjen.");
                }
            } else {
                setError("Bruker ikke funnet. Sjekk e-postadressen.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("Noe gikk galt. Prøv igjen senere.");
        }
    };
    // Handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUserId");
    };
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            const userId = localStorage.getItem("loggedInUserId");
            if (userId) {
                try {
                    const user = await fetchUserById(userId);
                    setLoggedInUser(user);
                } catch (error) {
                    console.error("Error fetching logged-in user:", error);
                }
            }
        };

        if (isLoggedIn) {
            fetchLoggedInUser();
        }
    }, [isLoggedIn]);

    return (
        <div id="dashboard-page">
            {!isLoggedIn ? (
                <section id="login-section">
                    <h1>Velkommen tilbake!</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-wrapper">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                placeholder="E-post"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                placeholder="Passord"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Logg inn</button>
                    </form>
                </section>
            ) : (
                <section id="dashboard-section">
                    <section id="dashboard-header">
                        <h1>Min side</h1>
                        <button id="logout" onClick={handleLogout}>Logg ut</button> 
                    </section>

                    {/* User Information */}
                    <section id="user-info-section">
                        <h2>Brukerinformasjon</h2>
                        {loggedInUser && (
                            <article id="user-info">
                                <img
                                    src={loggedInUser.photo?.asset?.url}
                                    alt={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                                />
                                <h3>{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</h3>
                                <p>E-post: {loggedInUser.email}</p>
                                <p>Alder: {loggedInUser.age}</p>
                            </article>
                        )}
                        {loggedInUser && (
                            <article id="wishlist">
                                <h2>Ønskeliste</h2>
                                <ul id="wishlist-list">
                                    {loggedInUser.wishlist?.map((event) => (
                                        <li key={event._id}>
                                            
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        )}
                        {loggedInUser && (
                            <article id="previous-purchases">
                                <h2>Tidligere kjøp</h2>
                                <ul id="previous-purchases-list">
                                    {loggedInUser.previousPurchases?.map((event) => (
                                        <li key={event._id}>
                                            
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        )}
                    </section>

                    {/* Friends Overview */}
                    <section id="friends-section">
                        <h2>Venner av deg</h2>
                        <ul id="friends-list">
                        </ul>
                    </section>
                </section>
            )}
        </div>
    );
}