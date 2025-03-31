import groupMembers from "../scripts/GroupMembers";
import "../styles/GroupMemberStyle.scss";
export default function GroupMembers() {
    return (
        <section>
            <h1>Gruppemedlemmer</h1>
            <div>
                {groupMembers.map((member, index) => (
                    <a href="" key={index}>
                        <img src="https://placehold.co/400x400" alt="" />
                        <h2>{member.name}</h2> {/* Navn */}
                        <h3>{member.email}</h3> {/* Epost */}
                    </a>
                ))}
            </div>
        </section>
    );
}
