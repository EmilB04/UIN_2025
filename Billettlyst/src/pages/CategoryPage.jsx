import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategoryBySlug } from "../sanity/categoryServices";
import { fetchMusicEvents, fetchSportsEvents, fetchTheatreEvents } from "../api/ticketmasterApiServices";
import EventCard from "../components/EventCard";
import "../styles/eventCardStyle.scss";
import "../styles/categoryPageStyle.scss";
import PageNotFound from "./PageNotFound";

export default function CategoryPage({ setLoading }) {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filter, setFilter] = useState({
        dato: "",
        land: "",
        by: ""
    });

    const fetchEventsForCategory = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case "musikk":
                return fetchMusicEvents();
            case "sport":
                return fetchSportsEvents();
            case "teater/show":
                return fetchTheatreEvents();
            default:
                return [];
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCategoryBySlug(slug)
            .then((data) => {
                if (data.length > 0) {
                    setCategory(data[0]);
                    fetchEventsForCategory(data[0].categoryname)
                        .then((fetchedEvents) => {
                            setEvents(fetchedEvents); // Sett events basert på kategori
                            setFilteredEvents(fetchedEvents); // setter events basert på filtrering
                            setLoading(false);
                        })
                } else {
                    return <PageNotFound />;
                }
            })
            .catch((error) => {
                console.error("Feil ved henting av kategori:", error);
                navigate("/page-not-found");
            });
    }, [slug, navigate, setLoading]);

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = (e) => {
        console.log("Aktivt filter:", filter);
        e.preventDefault();

        const newFiltered = events.filter((event) => {
            const venue = event._embedded?.venues?.[0];
            const eventDate = event.dates?.start?.localDate || "";
            const eventCountry = venue?.country?.countryCode || "";
            const eventCity = venue?.city?.name || "";

            return(
                (!filter.dato || eventDate === filter.dato) &&
                (!filter.land || eventCountry === filter.land) &&
                (!filter.by || eventCity === filter.by)
            );
        });
        setFilteredEvents(newFiltered);
        console.log("Events etter filtrering:", newFiltered);
    };

    if (!category) return null;  // Ikke vis noe hvis ikke kategorien er lastet

    return (
        <div id="CategoryPage">
            <h1>{category.categoryname}</h1>
    
            <section>
                <h2>Filtrert søk</h2>
                <form onSubmit={handleFilterSubmit}>
                    <label htmlFor="date">Dato:</label>
                    <input type="date" name="dato" value={filter.dato} onChange={handleFilterChange}/>
    
                    <label htmlFor="land">Land:</label>
                    <select name="land" value={filter.land} onChange={handleFilterChange}>
                        <option value="">Velg et land</option>
                        <option value="NO">Norge</option>
                        <option value="SE">Sverige</option>
                        <option value="DK">Danmark</option>
                    </select>

                    <label htmlFor="by">By:</label>
                    <select name="by" value={filter.by} onChange={handleFilterChange}>
                        <option value="">Velg en by</option>
                        <option value="Oslo">Oslo</option>
                        <option value="Stockholm">Stockholm</option>
                        <option value="København">København</option>
                    </select>
                    <button type="submit">Filtrer</button>
                </form>
            </section>
    
            <section>
                <h2>Søk</h2>
                <form>
                    <label htmlFor="search">Søk etter event, attraksjon eller spillested</label>
                    <input type="text" name="search" placeholder="ex: findings" />
                    <button type="submit">Søk</button>
                </form>
            </section>
    
            <section>
                <h2>Attraksjoner</h2>
                {events.length > 0 ? (
                    <div className="event-card-grid">
                        {filteredEvents.slice(0, 8).map((event) => (
                            <EventCard
                                key={event.id}
                                image={event.images?.[0]?.url}
                                name={event.name}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Ingen events funnet for denne kategorien.</p>
                )}
            </section>
        </div>
    );
}    