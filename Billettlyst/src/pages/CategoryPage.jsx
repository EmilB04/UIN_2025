import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchEventsByCategory,
  fetchSuggestions,
  fetchFilteredEvents,
  fetchSearchEvents,
  fetchFilteredAttractions,
  fetchFilteredVenues
} from "../api/ticketmasterApiServices";
import { fetchCategoryBySlug } from "../sanity/categoryServices";
import CategoryCard from "../components/CategoryCard";
import PageNotFound from "./PageNotFound";

export default function CategoryPage({ setLoading }) {
  const { slug } = useParams();
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

  const navigate = useNavigate();

  // Function to remove duplicates from an array
  const removeDuplicatesByKey = (arr, key) => {
    const uniqueMap = new Map();
    arr.forEach((item) => {
      const value = item?.[key];
      if (value && !uniqueMap.has(value)) {
        uniqueMap.set(value, item);
      }
    });
    return Array.from(uniqueMap.values());
  };

  // Handle changes in filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Map category names to API values
  const mapCategoryToApiValue = (name) => {
    switch (name.toLowerCase()) {
      case "musikk":
        return "Music";
      case "sport":
        return "Sports";
      case "teater/show":
        return "Theatre";
      default:
        return "";
    }
  };

  // Handle the submission of filters
const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowingSearch(false);
  
    // Hent filtrerte arrangementer
    const filtered = await fetchFilteredEvents({
      land: filter.land,
      by: filter.by,
      dato: filter.dato,
      kategori: mapCategoryToApiValue(category.categoryname),
    });
  
    let filteredEvents = filtered.filter((event) => {
      if (filter.dato) {
        return event.dates?.start?.localDate === filter.dato;
      }
      return true;
    });
    
    // Ekstra filtrering for København
    if (filter.by === "København") {
      // Filtrer arrangementer som har en venue i en bydel i København
      filteredEvents = filteredEvents.filter((event) =>
        event._embedded?.venues?.some((venue) => {
          const cityName = venue.city?.name?.toLowerCase();
          // Sjekk om cityName inneholder en av de ønskede bydelene
          return (
            cityName?.includes("københavn s") ||
            cityName?.includes("københavn n") ||
            cityName?.includes("københavn k") ||
            cityName?.includes("københavn v")
          );
        })
      );
    }
  
    setEvents(filteredEvents);
  
    // Oppdater attraksjoner og spillesteder etter filtrering
    const filteredAttractions = await fetchFilteredAttractions({
      dato: filter.dato,
      land: filter.land,
      by: filter.by,
      keyword: "",
    });
    setAttractions(removeDuplicatesByKey(filteredAttractions, "name").slice(0, 12));
  
    const filteredVenues = await fetchFilteredVenues({
      land: filter.land,
      by: filter.by,
      keyword: "",
    });
    setVenues(removeDuplicatesByKey(filteredVenues, "id").slice(0, 12));
  
    setLoading(false);
  };
  

  // Handle the submission of search
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowingSearch(true);

    const results = await fetchSearchEvents({
      keyword: searchTerm,
      kategori: mapCategoryToApiValue(category.categoryname),
    });

    setSearchResults(results);

    const filteredAttractions = await fetchFilteredAttractions({
      dato: "",
      land: filter.land,
      by: filter.by,
      keyword: searchTerm,
    });
    setAttractions(removeDuplicatesByKey(filteredAttractions, "name").slice(0, 12));

    const filteredVenues = await fetchFilteredVenues({
      land: filter.land,
      by: filter.by,
      keyword: searchTerm,
    });
    setVenues(removeDuplicatesByKey(filteredVenues, "id").slice(0, 12));

    setLoading(false);
  };

  // Toggle event wishlist status
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Check if an event is wishlisted
  const isWishlisted = (id) => wishlist.includes(id);

  // Fetch category data and related events when the component mounts
  useEffect(() => {
    setLoading(true);
    fetchCategoryBySlug(slug)
      .then((data) => {
        if (data.length === 0) {
          setNotFound(true);
          return;
        }

        const categoryData = data[0];
        setCategory(categoryData);

        // Fetch events for the category
        fetchEventsByCategory(categoryData.categoryname).then((fetchedEvents) => {
          const uniqueEvents = removeDuplicatesByKey(fetchedEvents, "name").slice(0, 12);
          setEvents(uniqueEvents);

          // Fetch suggestions for attractions and venues
          fetchSuggestions(categoryData.categoryname).then((suggested) => {
            const suggestedAttractions = suggested.attractions || [];
            const suggestedVenues = suggested.venues || [];
            setAttractions(removeDuplicatesByKey(suggestedAttractions, "name").slice(0, 12));
            setVenues(removeDuplicatesByKey(suggestedVenues, "id").slice(0, 12));
          });
        });
      })
      .catch((error) => {
        console.error("Feil ved henting av kategori:", error);
        navigate("/page-not-found");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, navigate, setLoading]);

  // If category is not found, show PageNotFound component
  if (notFound) return <PageNotFound />;
  if (!category) return null;

  return (
    <div id="CategoryPage">
      <h1>{category.categoryname}</h1>

      {/* Filter and Search Section */}
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

      {/* Search Section */}
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

      {/* Attractions Section */}
      <section>
        <h2>Attraksjoner</h2>
        <div className="event-card-grid">
          {attractions?.map((attr) => (
            <CategoryCard
              key={attr.id}
              id={attr.id}
              name={attr.name}
              image={attr.images?.[0]?.url}
              type="attraction"
              isWishlisted={isWishlisted(attr.id)}
              onWishlistToggle={() => toggleWishlist(attr.id)}
            />
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section>
        <h2>Arrangementer</h2>
        <div className="event-card-grid">
          {(showingSearch ? searchResults : events).map((event) => (
            <CategoryCard
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
              isWishlisted={isWishlisted(event.id)}
              onWishlistToggle={() => toggleWishlist(event.id)}
            />
          ))}
        </div>
      </section>

      {/* Venues Section */}
      <section>
        <h2>Spillesteder</h2>
        <div className="event-card-grid">
          {venues?.map((venue) => (
            <CategoryCard
              key={venue.id}
              id={venue.id}
              name={venue.name}
              image={venue.images?.[0]?.url}
              type="venue"
              isWishlisted={isWishlisted(venue.id)}
              onWishlistToggle={() => toggleWishlist(venue.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
