import { Link } from "react-router";
import "../styles/NavStyle.scss";
import { fetchAllGroupMembers } from "../sanity/memberServices";
import { useEffect, useState } from "react";

export default function NavSection() {

    const [groupMembers, setGroupMembers] = useState([]);

    useEffect(() => {
        async function getGroupMembers() {
            const data = await fetchAllGroupMembers();
            setGroupMembers(data);
        }
        getGroupMembers();
    }, []);

    const renderGroupMembers = () => {
        return groupMembers.map((member) => (
            <li key={member._id}>
                <Link to={`/members/${member.slug.current}`}>
                {member.name.split(" ")[0]}
                </Link>
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
