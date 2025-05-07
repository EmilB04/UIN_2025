import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/categoryCardStyle.scss";

export default function CategoryCard({
    id,
    name,
    image,
    date,
    time,
    country,
    city,
    venue,
    type,
    isWishlisted,
    onWishlistToggle,
}) {

    let formattedDate = date;
    let formattedTime = time;
    let formattedLocation = "";

    if (date && time) {
        formattedDate = new Date(date).toLocaleDateString('no-NO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        formattedTime = new Date(`${date}T${time}`).toLocaleTimeString('no-NO', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    if (city && country) {
        city = city.charAt(0).toUpperCase() + city.slice(1);
        country = country.charAt(0).toUpperCase() + country.slice(1);
        formattedLocation = `${city}, ${country}`;
    }

    return (
        <article className="category-card">
            <div className="image-wrapper">
                <img
                    src={image || "https://placehold.co/250x140?text=Ingen+bilde"}
                    alt={`Bilde av ${name}`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/250x140?text=Ingen+bilde";
                    }}
                />
            </div>

            <div className="content-wrapper">
                <div className="wishlist-container">
                    <h2>{name}</h2>
                    <button onClick={() => onWishlistToggle(id)} className="wishlist-btn">
                        {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                </div>

                {type === "event" && (
                    <>
                        <p>{formattedDate}</p>
                        <p>{formattedTime}</p>
                        <p>{formattedLocation}</p>
                        <p>{venue}</p>
                    </>
                )}

                {type === "venue" && (
                    <>
                        <p>{formattedLocation}</p>
                    </>
                )}
            </div>
        </article>
    );
}