import { useEffect, useState } from "react";
import { fetchSanityEvents } from "../sanity/eventServices";
import { Link } from "react-router-dom";
import { fetchCityEvents, getSpecificFestival } from "../api/ticketmasterApiServices";
import EventCard from "../components/EventCard";
import "../styles/homePageStyle.scss";

export default function HomePage({ setLoading }) {
  const [findings, setFindings] = useState(null);
  const [neon, setNeon] = useState(null);
  const [skeikampen, setSkeikampen] = useState(null);
  const [tonsOfRock, setTonsOfRock] = useState(null);
  const [sanityEvents, setSanityEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Oslo");
  const [apiEvents, setApiEvents] = useState([]);

  // Hent spesifikke festivaler én gang ved oppstart
  useEffect(() => {
    getSpecificFestival("Findings", setFindings);
    getSpecificFestival("Neon", setNeon);
    getSpecificFestival("Skeikampen", setSkeikampen);
    getSpecificFestival("Tons of Rock", setTonsOfRock);
  }, []);

  // Hent sanity-events én gang
  useEffect(() => {
    const getSanityEvents = async () => {
      const data = await fetchSanityEvents();
      setSanityEvents(data);
    };
    getSanityEvents();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true); // Start loading
      try {
        const events = await fetchCityEvents(selectedCity);
        setApiEvents(events);
      } catch (error) {
        console.error("Error fetching city events:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (selectedCity) {
      getEvents();
    }
  }, [selectedCity, setLoading]);

  return (
    <div id="homePage">
      <section id="main-festivals">
        <h1>Sommerens festivaler!</h1>
        <ul id="festival-cards-container">
          {[findings, neon, skeikampen, tonsOfRock].map(
            (festival) =>
              festival && (
                <li key={festival.id} className="festival-card">
                  <img src={festival.images?.[0]?.url} alt={festival.name} />
                  <h3>{festival.name}</h3>
                  <Link to={`/event/${festival.id}`}>
                    <button>Les mer om {festival.name}</button>
                  </Link>
                </li>
              )
          )}
        </ul>
      </section>

      <section id="city-events">
        <header id="city-events-header">
          <h2>Hva skjer i verdens storbyer!</h2>
          <span>
            {["Oslo", "Stockholm", "Berlin", "London", "Paris"].map((city) => (
              <button key={city} onClick={() => setSelectedCity(city)}>
                {city}
              </button>
            ))}
          </span>
        </header>

        <section id="city-events-list">
          <h2>Hva skjer i {selectedCity}</h2>
          <ul className="event-cards-container">
            {apiEvents.length > 0 ? (
              apiEvents.map((event) => (
                <EventCard
                  key={event.id}
                  image={event.images?.[0]?.url}
                  name={event.name}
                  date={event.dates?.start?.localDate}
                  time={event.dates?.start?.localTime}
                  country={event._embedded?.venues?.[0]?.country?.name}
                  city={event._embedded?.venues?.[0]?.city?.name}
                  venue={event._embedded?.venues?.[0]?.name}
                />
              ))
            ) : (
              <p>No events found for this city.</p>
            )}
          </ul>
        </section>
      </section>
    </div>
  );
}
