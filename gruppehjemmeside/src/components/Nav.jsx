import { Link } from "react-router";
import "../styles/NavStyle.scss";
import groupMembers from "../scripts/GroupMembers";

export default function Nav() {
    const renderGroupMembers = () => {
        return groupMembers.map((member) => (
            <li key={member.slug}>
                <Link to={`/${member.slug}`}>{member.name.split(" ")[0]}</Link>
            </li>
        ));
    };

    return (
        <nav>
            <span>Gruppe 2</span>
            <ul>
                <li>
                    <Link to={"/"}>Hjem</Link>
                </li>
                {renderGroupMembers()}
            </ul>
        </nav>
    );
}
