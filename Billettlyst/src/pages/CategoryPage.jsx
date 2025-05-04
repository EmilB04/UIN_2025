import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategoryBySlug } from "../sanity/categoryServices";
import { fetchMusicEvents } from "../api/ticketmasterApiServices";
import { fetchSportsEvents } from "../api/ticketmasterApiServices";
import { fetchTheatreEvents } from "../api/ticketmasterApiServices";
import EventCard from "../components/EventCard";
import "../styles/eventCardStyle.scss";
import "../styles/categoryPageStyle.scss";



export default function CategoryPage() {
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
        fetchCategoryBySlug(slug)
        .then((data) => {
            if (data.length > 0) {
              setCategory(data[0]);
              fetchEventsForCategory(data[0].categoryname)
                .then(setEvents); // Sett events basert på kategori
            } else {
              navigate("/page-not-found");
            }
          })
          .catch((error) => {
            console.error("Feil ved henting av kategori:", error);
            navigate("/page-not-found");
          });
      }, [slug, navigate]);

      if (!category) return null;  // Ikke vis noe hvis ikke kategorien er lastet

    return (
        <div id="CategoryPage">
            <h1>{category.categoryname}</h1>
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
        </div>
    );
}