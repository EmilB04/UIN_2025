import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/eventCardStyle.scss";

/*
    EventCard component displays event/venue/attraction info visually.
    It includes wishlist functionality via heart icon toggle.
*/
export default function EventCard({
    id,
    name,
    date,
    time,
    country,
    city,
    venue,
    image,
    showWishlist = false,
    isWishlisted = false,
    onWishlistToggle = () => { },
}) {
    let formattedDate = date;
    let formattedTime = time;
    let formattedLocation = "";

    // Format date and time to Norwegian locale (f.eks. "12. mai 2025, 14:00")
    if (date && time) {
        formattedDate = new Date(date).toLocaleDateString("no-NO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        formattedTime = new Date(`${date}T${time}`).toLocaleTimeString("no-NO", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    // Capitalize city and country names
    if (city && country) {
        city = city.charAt(0).toUpperCase() + city.slice(1);
        country = country.charAt(0).toUpperCase() + country.slice(1);
        formattedLocation = `${city}, ${country}`;
    }

    return (
        <article id="eventCard">
            <img
                src={image || "https://placehold.co/250x140?text=Ingen+bilde"}
                alt={`Bilde av ${name}`}
                onError={(e) => {
                    // Fallback if image fails to load
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/250x140?text=Ingen+bilde";
                }}
            />

            <div className="eventCard-header">
                <h2>{name}</h2>

                {/* Wishlist toggle button, shown only if showWishlist=true */}
                {showWishlist && (
                    <button onClick={() => onWishlistToggle(id)} className="wishlist-btn">
                        {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                )}
            </div>

            <p>{formattedDate}</p>
            <p>{formattedTime}</p>
            <p>{formattedLocation}</p>
            <p>{venue}</p>
        </article>
    );
}