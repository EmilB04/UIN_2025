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
            <p>{date}</p>
            <p>{time}</p>
            <p>{country}</p>
            <p>{city}</p>
            <p>{venue}</p>
          </>
        )}

        {type === "venue" && (
          <>
            <p>{country}</p>
            <p>{city}</p>
          </>
        )}
      </div>
    </article>
  );
}