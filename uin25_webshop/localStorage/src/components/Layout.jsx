import { Link } from "react-router-dom";
import "../styles/layout.scss";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <nav>
          <Link to="/" id="logo">
            Connectis
          </Link>
          <ul>
            <li>
              <Link to="login">Log in</Link>
            </li>
            <li>
              <Link to="signup">Signup</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <footer>Connectis 2025</footer>
    </>
  );
}
