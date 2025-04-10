import { Link } from "react-router-dom";
import "../src/styles/usercard.scss";
export default function UserCard({ user }) {
  return (
    <article className="userCard">
      <img src={user.image} />

      <h3>
        <Link to={user.slug}>{user.name} </Link>
      </h3>
    </article>
  );
}
