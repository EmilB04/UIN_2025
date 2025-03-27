import { Link } from "react-router";
import "../styles/NavStyle.scss";

export default function Nav() {
    return (
        <nav>
            <span>
                Gruppe 2
            </span>
            <ul>
                <li><Link to={"/"}>Hjem</Link></li>
                <li><Link to={"/andreas"}>Andreas</Link></li>
                <li><Link to={"/emil"}>Emil</Link></li>
                <li><Link to={"/sebastian"}>Sebastian</Link></li>
                <li><Link to={"/ida"}>Ida</Link></li>
            </ul>
        </nav>
    );
}
