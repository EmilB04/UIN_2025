import { Link } from "react-router-dom";
import "../styles/layout.scss";

export default function Layout({ children, signedIn, setSignedIn }) {
  const handleLogout = () => {
    setSignedIn(false);
  };
  return (
    <>
      <header>
        <nav>
          <Link to="/" id="logo">
            Connectis
          </Link>
          <ul>
            {signedIn ? (
              <>
                <li>username</li>
                <li>
                  <button onClick={handleLogout}>Logg ut</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="login">Log in</Link>
                </li>
                <li>
                  <Link to="signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      {children}
      <footer>Connectis 2025</footer>
    </>
  );
}
