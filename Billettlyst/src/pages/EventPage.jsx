import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById, getFestivalPassesByKeyword } from "../api/ticketmasterApiServices";
import FestivalPassCard from "../components/FestivalPassCard";


export default function EventPage() {
    const { id } = useParams();
    const [festival, setFestival] = useState(null);
    const [festivalPasses, setFestivalPasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const festival = await getEventById(id);
            setFestival(festival);

            const baseName = festival.name.split(" - ")[0]; // Alt før første " - " 
            const passes = await getFestivalPassesByKeyword(baseName);
            setFestivalPasses(passes);
        };
        fetchData();
    }, [id]);

    if (!festival) return <p>Laster festival ...</p>

    return (
        <div id="eventPage">
            <h1>{festival.name}</h1>

            <h2>Sjannger:</h2>
            <span>Musik Festival</span>
            
            <h2>Festivalpass:</h2>
            <section id="festivalPass">
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
        </div>
    );
}
