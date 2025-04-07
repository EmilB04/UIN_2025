import { Link } from "react-router";
import "../styles/GroupMemberStyle.scss";

export default function GroupMembers({ groupMembers }) {
    return (
        <section>
            <h1>Gruppemedlemmer</h1>
            <div>
                {groupMembers.map((member) => (
                    <Link to={`/members/${member.slug.current}`} key={member._id}>
                        <img src={member.photo?.asset?.url} alt={`Bilde av ${member.name}`}/>
                        <h2>{member.name}</h2>
                        <h3>{member.email}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
