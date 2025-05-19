import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchCategoryPageData,
  fetchSuggestions,
  fetchSearchEvents,
  mapCategoryToApiValue,
} from "../api/ticketmasterApiServices";
import { fetchCategoryBySlug } from "../sanity/categoryServices";
import EventCard from "../components/EventCard";
import PageNotFound from "./PageNotFound";
import "../styles/categoryPageStyle.scss";

export default function CategoryPage({ setLoading }) {
  const { slug } = useParams(); // get the slug from the URL
  const navigate = useNavigate();

  // Component state
  const [category, setCategory] = useState(null);
  const [events, setEvents] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [venues, setVenues] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState({
    dato: "",
    land: "",
    by: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showingSearch, setShowingSearch] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Retrieve userId from localStorage
  const [userId] = useState(() => localStorage.getItem("loggedInUserId"));

  // Update filter state when dropdowns or inputs change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters to fetch category data (events, venues, attractions)
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowingSearch(false);

    const kategori = mapCategoryToApiValue(category.categoryname);
    const { events, attractions, venues } = await fetchCategoryPageData({
      kategori,
      dato: filter.dato,
      land: filter.land,
      by: filter.by,
      keyword: "",
    });

    setEvents(events);
    setAttractions(attractions);
    setVenues(venues);
    setLoading(false);
  };

  // Search by keyword in current category
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowingSearch(true);

    const kategori = mapCategoryToApiValue(category.categoryname);

    const results = await fetchSearchEvents({
      keyword: searchTerm,
      kategori,
    });
    setSearchResults(results);

    const { attractions, venues } = await fetchCategoryPageData({
      kategori,
      keyword: searchTerm,
    });

    setAttractions(attractions);
    setVenues(venues);
    setLoading(false);
  };

  /*
    Wishlist management logic

    Originally, I implemented wishlist functionality using useState only, which worked well
    as long as the user only changed category pages. However, refreshing the page would reset the state
    and all saved items were lost.

    To solve this, I updated the implementation to also store the wishlist in localStorage.
    This made it persistent across reloads, but introduced a new problem: when one user
    hearted an item, it remained saved even after logging out and switching to another user.

    To fix this, I used ChatGPT to help me implement per-user storage. Now, the wishlist is
    saved in localStorage using a key based on the logged-in user's ID (e.g. "wishlist_user123").
    If no user is logged in, it falls back to a "wishlist_guest" key.

    This ensures each user has their own separate and persistent wishlist.
  */
  
  // Add/remove an item from the wishlist, and store it in localStorage
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      const key = userId ? `wishlist_${userId}` : "wishlist_guest";
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  // Check if a card is in the wishlist
  const isWishlisted = (id) => wishlist.includes(id);

  // Load wishlist from localStorage on mount or when userId changes
  useEffect(() => {
    const key = userId ? `wishlist_${userId}` : "wishlist_guest";
    const stored = localStorage.getItem(key);
    setWishlist(stored ? JSON.parse(stored) : []);
  }, [userId]);

    // Fetch category from slug, fallback to PageNotFound if not valid
  useEffect(() => {
    setLoading(true);

    fetchCategoryBySlug(slug)
      .then((data) => {
        if (data.length === 0) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const categoryData = data[0];
        setCategory(categoryData);
        setShowingSearch(false);
        setSearchTerm("");
        setSearchResults([]);

        // Fetch default content suggestions for category
        fetchSuggestions(categoryData.categoryname).then((suggested) => {
          setEvents(suggested.events || []);
          setAttractions(suggested.attractions || []);
          setVenues(suggested.venues || []);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Feil ved henting av kategori:", error);
        navigate("/page-not-found");
        setLoading(false);
      });
  }, [slug, navigate, setLoading]);

  // Render fallback page if category not found
  if (notFound) return <PageNotFound />;
  if (!category) return null;

  return (
    <div id="CategoryPage">
      <h1>{category.categoryname}</h1>

      {/* Filter form */}
      <section id="filterSearch">
        <h2>Filtrert søk</h2>
        <form onSubmit={handleFilterSubmit}>
          <label htmlFor="dato">Dato:</label>
          <input
            type="date"
            id="dato"
            name="dato"
            value={filter.dato}
            onChange={handleFilterChange}
          />

          <label htmlFor="land">Land:</label>
          <select
            id="land"
            name="land"
            value={filter.land}
            onChange={handleFilterChange}
          >
            <option value="">Velg et land</option>
            <option value="NO">Norge</option>
            <option value="SE">Sverige</option>
            <option value="DK">Danmark</option>
          </select>

          <label htmlFor="by">By:</label>
          <select
            id="by"
            name="by"
            value={filter.by}
            onChange={handleFilterChange}
          >
            <option value="">Velg en by</option>
            <option value="Oslo">Oslo</option>
            <option value="Stockholm">Stockholm</option>
            <option value="København">København</option>
          </select>

          <button type="submit">Filtrer</button>
        </form>
      </section>

      {/* Keyword search */}
      <section id="keywordSearch">
        <h2>Søk</h2>
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor="search">Søk etter event, attraksjon eller spillested</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="ex: findings"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Søk</button>
        </form>
      </section>

      {/* Attractions */}
      <section>
        <h2 className="card-type-headline">Attraksjoner</h2>
        <div className="event-card-grid">
          {attractions.length > 0 ? (
            attractions.map((attr) => (
              <EventCard
                key={attr.id}
                id={attr.id}
                name={attr.name}
                image={attr.images?.[0]?.url}
                type="attraction"
                showWishlist={true}
                isWishlisted={isWishlisted(attr.id)}
                onWishlistToggle={() => toggleWishlist(attr.id)}
              />
            ))
          ) : (
            <p>Ingen attraksjoner funnet.</p>
          )}
        </div>
      </section>

      {/* Events */}
      <section>
        <h2 className="card-type-headline">Arrangementer</h2>
        <div className="event-card-grid">
          {(showingSearch ? searchResults : events).length > 0 ? (
            (showingSearch ? searchResults : events).map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                date={event.dates?.start?.localDate}
                time={event.dates?.start?.localTime}
                country={event._embedded?.venues?.[0]?.country?.name}
                city={event._embedded?.venues?.[0]?.city?.name}
                venue={event._embedded?.venues?.[0]?.name}
                image={event.images?.[0]?.url}
                type="event"
                showWishlist={true}
                isWishlisted={isWishlisted(event.id)}
                onWishlistToggle={() => toggleWishlist(event.id)}
              />
            ))
          ) : (
            <p>Ingen arrangementer funnet.</p>
          )}
        </div>
      </section>

      {/* Venues */}
      <section>
        <h2 className="card-type-headline">Spillesteder</h2>
        <div className="event-card-grid">
          {venues.length > 0 ? (
            venues.map((venue) => (
              <EventCard
                key={venue.id}
                id={venue.id}
                name={venue.name}
                image={venue.images?.[0]?.url}
                type="venue"
                country={venue.country?.name}
                city={venue.city?.name}
                showWishlist={true}
                isWishlisted={isWishlisted(venue.id)}
                onWishlistToggle={() => toggleWishlist(venue.id)}
              />
            ))
          ) : (
            <p>Ingen spillesteder funnet.</p>
          )}
        </div>
      </section>
    </div>
  );
}