import { useEffect, useState } from "react";
import { client } from "../sanity/client";
import { fetchCityEvents } from "../api/ticketmasterApiServices";
import EventCard from "../components/EventCard";
import "../styles/homePageStyle.scss"

export default function HomePage() {
  const [sanityEvents, setSanityEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Oslo");
  const [apiEvents, setApiEvents] = useState([]);


  useEffect(() => {
    const fetchSanityEvents = async () => {
      const query = `*[_type == "event"]{
        _id,
        apiId,
        title,
        date,
        time,
        country,
        city,
        venue,
        "image": image.asset->url
      }`;
      const data = await client.fetch(query);
      setSanityEvents(data);
    };

    fetchSanityEvents();
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
        {/**Her kommer festivaler */}
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
