import { Link } from "react-router";
import "../styles/GroupMemberStyle.scss";

export default function GroupMembers({ groupMembers }) {
    // TODO: Load info from Sanity.
    return (
        <section>
            <h1>Gruppemedlemmer</h1>
            <div>
                {groupMembers.map((member, index) => (
                    <Link to={`/members/${member.slug}`} key={index}>
                        <img src="https://placehold.co/400x400" alt="" />
                        <h2>{member.name}</h2> {/* Navn */}
                        <h3>{member.email}</h3> {/* Epost */}
                    </Link>
                ))}
            </div>
        </section>
    );
}
