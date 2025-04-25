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