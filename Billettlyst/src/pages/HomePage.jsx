import { useEffect, useState } from "react";
import { client } from "../sanity/client";
import EventCard from "../components/EventCard";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
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
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <section>
        <h2>Sommerens festivaler!</h2>
        {/**Her kommer festivaler */}
      </section>

      <section>
        <h2>Hva skjer i verdens storbyer!</h2>
        <span>
          <button>Oslo</button>
          <button>Stockholm</button>
          <button>Berlin</button>
          <button>London</button>
          <button>Paris</button>
        </span>
        <div className="event-grid">
          {events.map((event) => (
            <EventCard 
              key={event._id}
              image={event.image}
              name={event.title}
              date={event.date}
              time={event.time}
              country={event.country}
              city={event.city}
              venue={event.venue}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
