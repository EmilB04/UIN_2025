import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategoryBySlug } from "../sanity/categoryServices";
import { fetchMusicEvents } from "../api/ticketmasterApiServices";
import { fetchSportsEvents } from "../api/ticketmasterApiServices";
import { fetchTheatreEvents } from "../api/ticketmasterApiServices";
import EventCard from "../components/EventCard";
import "../styles/eventCardStyle.scss";
import "../styles/categoryPageStyle.scss";
import PageNotFound from "./PageNotFound";



export default function CategoryPage({ setLoading }) {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

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
                        .then(setEvents); // Sett events basert på kategori
                    setLoading(false);
                } else {
                    return <PageNotFound />;
                }
            })
            .catch((error) => {
                console.error("Feil ved henting av kategori:", error);
                navigate("/page-not-found");
            });
    }, [slug, navigate, setLoading]);

    if (!category) return null;  // Ikke vis noe hvis ikke kategorien er lastet

    return (
        <div id="CategoryPage">
            <h1>{category.categoryname}</h1>
    
            <section>
                <h2>Filtrert søk</h2>
                <form>
                    <label htmlFor="date">Dato:</label>
                    <input type="date" name="dato"/>
    
                    <label htmlFor="land">Land:</label>
                    <select name="land">
                        <option value="">Velg et land</option>
                        <option value="Norge">Norge</option>
                        <option value="Sverige">Sverige</option>
                        <option value="England">England</option>
                        <option value="Tyskland">Tyskland</option>
                        <option value="Frankrike">Frankrike</option>
                    </select>
    
                    <label htmlFor="by">By:</label>
                    <select name="by">
                        <option value="">Velg en by</option>
                        <option value="Oslo">Oslo</option>
                        <option value="Bergen">Bergen</option>
                        <option value="Stockholm">Stockholm</option>
                        <option value="London">London</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Paris">Paris</option>
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
                        {events.map((event) => (
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