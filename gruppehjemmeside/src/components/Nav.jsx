import { Link } from "react-router";

export default function Nav() {
    return (
        <nav>
            <span>
                Gruppe 2
            </span>
            <ul>
                <Link to={"/"}>Hjem</Link>
                <Link to={"/andreas"}>Andreas</Link>
                <Link to={"/emil"}>Emil</Link>
                <Link to={"/sebastian"}>Sebastian</Link>
                <Link to={"/ida"}>Ida</Link>
            </ul>
        </nav>
    );
}
