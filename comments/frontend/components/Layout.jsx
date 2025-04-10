import { Link } from "react-router-dom";
import "../src/styles/default.scss";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <ul className="navigation">
          <li>
            <Link to="products/">Produkter</Link>
          </li>
          <li>
            <Link to="users/">Brukere</Link>
          </li>
        </ul>
      </header>
      <main>{children}</main>
    </>
  );
}
