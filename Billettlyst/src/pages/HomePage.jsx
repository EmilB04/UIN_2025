import { useEffect, useState } from "react";
import { fetchSanityEvents } from "../sanity/eventServices";
import { Link } from "react-router-dom";
import { fetchCityEvents, getSpecificFestival } from "../api/ticketmasterApiServices";
import EventCard from "../components/EventCard";
import "../styles/homePageStyle.scss"

export default function HomePage() {
  const [findings, setFindings] = useState(null);
  const [neon, setNeon] = useState(null);
  const [skeikampen, setSkeikampen] = useState(null);
  const [tonsOfRock, setTonsOfRock] = useState(null);
  const [sanityEvents ,setSanityEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Oslo");
  const [apiEvents, setApiEvents] = useState([]);

  useEffect(() => {
    const fetchFestivals = async () => {
      setFindings(await getSpecificFestival("Findings"));
      setNeon(await getSpecificFestival("Neon"));
      setSkeikampen(await getSpecificFestival("Skeikampen"));
      setTonsOfRock(await getSpecificFestival("Tons of Rock"));
    };
    fetchFestivals();
  }, []);

  useEffect(() => {
    const getSanityEvents = async () => {
      const data = await fetchSanityEvents();
      setSanityEvents(data);
    };
    getSanityEvents();
  }, []);

  // Fetch events for the selected city when it changes
  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchCityEvents(selectedCity);
      setApiEvents(events);
    };
    if (selectedCity) {
      getEvents();
    }
  }, [selectedCity]);

  return (
    <div id="HomePage">
      <section id="Festivaler">
        <h2>Sommerens festivaler!</h2>
        <ul className="festival-cards-container">
          {[findings, neon, skeikampen, tonsOfRock].map((festival) =>
          festival && (
            <li key={festival.id} className="festival-card">
              <img src={festival.images?.[0]?.url} alt={festival.name} />
              <h3>{festival.name}</h3>
              <Link to={`/event/${festival.id}`}>
                <button>Les mer om {festival.name}</button>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="Storbyer">
        <h2>Hva skjer i verdens storbyer!</h2>
        <span>
          {["Oslo", "Stockholm", "Berlin", "London", "Paris"].map((city) => (
            <button key={city} onClick={() => setSelectedCity(city)}>
              {city}
            </button>
          ))}
        </span>

        <h2>Hva skjer i {selectedCity}</h2>

        <div id="EventsHomePage">
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
        </div>
      </section>
    </div>
  );
}
