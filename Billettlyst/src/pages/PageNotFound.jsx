import { Link } from "react-router-dom";
import "../styles/pageNotFoundStyle.scss";

export default function PageNotFound() {
    return (
        <section id="page-not-found">
            <h1>404 - Page Not Found</h1>
            <p>Beklager, siden du leter etter finnes ikke.</p>
            <Link to="/" className="button-link">
                <button>Gå tilbake</button>
            </Link>
        </section>
    );
}