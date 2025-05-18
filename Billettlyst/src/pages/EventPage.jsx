import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById, getFestivalPassesByKeyword } from "../api/ticketmasterApiServices";
import FestivalPassCard from "../components/FestivalPassCard";
import "../styles/eventPage.scss";
import "../styles/artistCardStyle.scss";
import ArtistCard from "../components/ArtistCard";

export default function EventPage() {
    const { id } = useParams(); // The event ID from the API
    const [festival, setFestival] = useState(null); // Holds detailed data about the selected festival/event
    const [festivalPasses, setFestivalPasses] = useState([]); // Holds related festival pass options for the selected festival
    const [cleanName, setCleanName] = useState(""); // To store the cleaned festival name 

    useEffect(() => {
        const fetchData = async () => {
            //Fetch the full event (festival) by ID from the Ticketmaster API
            const festival = await getEventById(id);
            setFestival(festival);

            // Clean the festival name by removing extra text (e.g., after "-" or "|")
            const baseName = festival.name;
            const clean = baseName.split(/[-|]/)[0].trim(); 
            setCleanName(clean);

            // Fetch related festival passes using the cleaned name as a keyword
            const passes = await getFestivalPassesByKeyword(clean);
            setFestivalPasses(passes);
        };
        fetchData();
    }, [id]);

    if (!festival) return <p>Laster festival ...</p>

    return (
        <div id="eventPage">
            <h1>{cleanName}</h1>

            <h2>Sjanger:</h2>
            <span>{festival.classifications?.[0]?.genre?.name || "Ukjent sjanger"}</span>
                
            {/* Section listing available festival passes for the event */}
            <h2>Festivalpass:</h2>
            <section id="festivalPassSection">
                {festivalPasses.map((pass) => (
                    <FestivalPassCard
                    key={pass.id}
                    image={pass.images[0]?.url}
                    name={pass.name}
                    date={pass.dates.start.localDate}
                    venue={pass._embedded.venues[0].name}
                    onWishListClick={() => console.log(`Added ${pass.name} to wishlist`)} 
                    />
                ))}
            </section>

            {/* Section listing the artists performing at the event */}
            <section id="artist-section">
                <h2>Artister</h2>
                <div className="artist-cards-container">
                    {festival._embedded?.attractions?.map((artist) => (
                        <ArtistCard
                            key={artist.id}
                            name={artist.name}
                            image={artist.images?.[0]?.url}
                        />
                    ))}
                </div>
            </section>
            </div>
    );
}