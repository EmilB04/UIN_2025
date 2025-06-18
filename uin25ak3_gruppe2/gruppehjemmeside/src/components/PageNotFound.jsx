import { Link } from "react-router-dom";
import "../styles/PageNotFoundStyle.scss";

export default function PageNotFound() {
    return (
        <section className="page-not-found">
            <h1>404 - Page Not Found</h1>
            <p>Beklager, siden du leter etter finnes ikke.</p>
            <button>
                <Link to="/">Gå tilbake</Link>
            </button>
        </section>
    );
}