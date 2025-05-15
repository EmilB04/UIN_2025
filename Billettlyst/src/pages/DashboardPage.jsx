import { useState, useEffect } from "react";
import "../styles/dashboardStyle.scss";
import { fetchAllUsers, fetchUserById } from "../sanity/userServices";
import { getEventById } from "../api/ticketmasterApiServices";
import { getApiIdBySanityId } from "../sanity/eventServices";


import DummyPerson from "../assets/person-dummy.jpg";
import { useNavigate } from "react-router";




export default function DashboardPage({ setLoading, setPageType, setEvent }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const [wishlistEvents, setWishlistEvents] = useState([]);
    const [purchaseEvents, setPurchaseEvents] = useState([]);
    // Fectches the logged in user from sanity by checking the local storage for the logged in user id
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            setLoading(true);
            const userId = localStorage.getItem("loggedInUserId");
            if (userId && isLoggedIn) {
                try {
                    const user = await fetchUserById(userId);
                    setLoggedInUser(user);
                } catch (error) {
                    console.error("Error fetching logged-in user:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (isLoggedIn) {
            fetchLoggedInUser();
        }
    }, [isLoggedIn, setLoading]);

    // Fetches the wishlist and previous purchases events from Ticketmaster API by checking the logged in user
    // and fetching the events from the API by their IDs
    // The IDs are fetched from the logged in user object, which contains the wishlist and previous purchases IDs
    useEffect(() => {
        const fetchUserEvents = async () => {
            if (!loggedInUser) return;

            setLoading(true);
            try {
                const wishlistSanityIds = loggedInUser.wishlist.map(e => e._id);
                const purchasesSanityIds = loggedInUser.previousPurchases.map(e => e._id);

                const wishlistApiIds = await Promise.all(wishlistSanityIds.map(id => getApiIdBySanityId(id)));
                const purchasesApiIds = await Promise.all(purchasesSanityIds.map(id => getApiIdBySanityId(id)));

                const wishlistFetched = await Promise.all(wishlistApiIds.map(id => getEventById(id)));
                const purchasesFetched = await Promise.all(purchasesApiIds.map(id => getEventById(id)));

                setWishlistEvents(wishlistFetched);
                setPurchaseEvents(purchasesFetched);

            } catch (error) {
                console.error("Error fetching wishlist or previous purchases details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserEvents();
    }, [loggedInUser , setLoading]);








    // Method to handle login. Checks if the user exists in Sanity and if the email and password match.
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const allUsers = await fetchAllUsers(); // From Sanity
            const user = allUsers.find((user) => user.email === email);

            if (user) {
                if (password === user.password) {
                    setTimeout(() => { // Simulate delay
                        setIsLoggedIn(true);
                        setLoggedInUser(user);
                        localStorage.setItem("isLoggedIn", "true");
                        localStorage.setItem("loggedInUserId", user._id);
                        window.location.reload(); // Reload the page to reflect changes
                        setError("");
                    }, 1000);
                }
                else {
                    setError("Feil passord. Prøv igjen.");
                }
            }
            else {
                setError("Bruker ikke funnet. Sjekk e-postadressen.");
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            setError("Noe gikk galt. Prøv igjen senere.");
        }
        finally {
            setLoading(false); // Stop loading
        }

    };

    // Method to handle logout. Sets the logged in user to null and reloads the page to reflect changes.
    const handleLogout = () => {
        setLoading(true); // Start loading
        setEmail(); // Clear email field
        setPassword(); // Clear password field
        setTimeout(() => { // Simulate delay
            setIsLoggedIn(false);
            setLoggedInUser(null);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("loggedInUserId");
            window.location.reload(); // Reload the page to reflect changes
            setLoading(false); // Stop loading
        }, 500);
    };

    // Method to navigate to the event details page. Sets the page type and event data.
    // PageType can be either "wishlist" or "previousPurchases"
    // Event is the event data to be passed to the details page. Later used to fetch the event details from the API.
    const navigateToEvent = (event, type) => {
        setPageType(type);
        setEvent(event);
        navigate(`/dashboard/${event.id}`); // Navigate to the details page
    };

    // Method to find common wishlist items between the logged-in user and friends.
    const findCommonWishlistItems = (friendWishlist) => {
        if (!loggedInUser || !friendWishlist) return []; // Return empty array if no user or wishlist
        const loggedInUserWishlist = loggedInUser.wishlist || []
        return loggedInUserWishlist.filter((item) =>
            friendWishlist.some((friendItem) => friendItem._id === item._id)
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const formattedDate = date.toLocaleDateString("no-NO", options);
        return formattedDate;
    };

    // If the user is not logged in, show the login form, otherwise show the dashboard.
    return (
        <div id="dashboard-page">{!isLoggedIn ? (
            <section id="login-section">
                <span><i className="fas fa-sign-in-alt"></i></span>
                <h1>Velkommen tilbake!👋 </h1>
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
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Passord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            id="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <i className="fa-regular fa-eye"></i>
                            ) : (
                                <i className="fa-regular fa-eye-slash"></i>
                            )}
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button id="login" type="submit">Logg inn</button>
                </form>
            </section>
        ) : (
            <section id="dashboard-section">
                <section id="dashboard-header">
                    <h1>Min side</h1>
                    <button id="logout" onClick={handleLogout} aria-label="Logg ut" title="Logg ut">
                        <i className="fas fa-sign-out-alt"></i>Logg ut
                    </button>
                </section>

                <section id="user-info-section">
                    {loggedInUser && (
                        <article id="user-details">
                            <img
                                src={loggedInUser.photo?.asset?.url || "https://placehold.co/400x400?text=Ingen+bilde"}
                                alt={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                            />
                            <aside>
                                <h3>{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</h3>
                                <p>E-post: {loggedInUser.email}</p>
                                <p>Alder: {loggedInUser.age}</p>
                            </aside>
                        </article>
                    )}
                </section>

                <section id="user-content-section">
                    <section id="user-friends-section">
                        <h2>Venner av deg</h2>
                        {loggedInUser?.friends?.length > 0 ? (
                            <ul id="friends-list">
                                {loggedInUser.friends.map((friend) => {
                                    const commonWishlistItems = findCommonWishlistItems(friend.wishlist);
                                    return (
                                        <li key={friend._id} className="friend-card">
                                            <img
                                                src={friend.photo?.asset?.url || DummyPerson}
                                                alt={`${friend.firstName} ${friend.lastName}`}
                                            />
                                            <h3>{`${friend.firstName} ${friend.lastName}`}</h3>
                                            {commonWishlistItems.length > 0 ? (
                                                <section className="user-friends-interest">
                                                    <p>Du og {friend.firstName} ønsker å dra på samme event. Hva med å dra sammen?</p>
                                                    <ul>
                                                        {commonWishlistItems.slice(0, 3).map((item) => (
                                                            <li key={item._id}>
                                                                <p>{item.title}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            ) : (
                                                <p>Ingen felles interesser funnet i ønskelisten.</p>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p>Du har ikke lagt til noen venner.</p>
                        )}
                    </section>
                    <section id="user-purchases-section">
                        <h2>Tidligere kjøp</h2>
                        {loggedInUser && loggedInUser.previousPurchases?.length > 0 ? (
                            <ul id="previous-purchases-list">
                                <li id="previous-purchases-header">
                                    <p>Dato</p>
                                    <p>Tittel</p>
                                    <p>Land</p>
                                </li>
                                {purchaseEvents.map((event) => (
                                    <li key={event._id} id="previous-purchase-card">
                                        <p>{formatDate(event.dates?.start?.localDate)}</p>
                                        <p>{event.name}</p>
                                        <p>
                                            {event._embedded?.venues?.[0]?.country?.name ?? "Ukjent land"},{" "}
                                            {event._embedded?.venues?.[0]?.city?.name ?? "Ukjent by"}
                                        </p>
                                        <button onClick={() => navigateToEvent(event, "previousPurchases")}>Les mer</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Du har ingen tidligere kjøp.</p>
                        )}
                    </section>
                    <section id="user-wishlist-section">
                        <h2>Ønskeliste</h2>
                        {loggedInUser && loggedInUser.wishlist?.length > 0 ? (
                            <ul id="wishlist-list">
                                <li id="wishlist-header">
                                    <p>Dato</p>
                                    <p>Tittel</p>
                                    <p>Sted</p>
                                </li>
                                {wishlistEvents.map((event) => (
                                    <li key={event._id} id="wishlist-card">
                                        <p>{formatDate(event.dates?.start?.localDate)}</p>
                                        <p>{event.name}</p>
                                        <p>
                                            {event._embedded?.venues?.[0]?.name ?? "Ukjent sted"},{" "}
                                            {event._embedded?.venues?.[0]?.city?.name ?? "Ukjent by"}
                                        </p>
                                        <button onClick={() => navigateToEvent(event, "wishlist")}>Les mer</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Du har ikke lagt til noe i ønskelisten.</p>
                        )}
                    </section>
                </section>
            </section>
        )}
        </div>
    );
}