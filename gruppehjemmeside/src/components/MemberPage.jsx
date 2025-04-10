import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/MembePageStyle.scss";
import WorkLog from "./WorkLog";
import { fetchGroupMemberBySlug } from "../sanity/memberServices";

export default function MemberPage() {
    const { slug } = useParams();
    const [member, setMember] = useState(null);

    useEffect(() => {
        async function getMemberData() {
            try {
                const memberData = await fetchGroupMemberBySlug(slug);
                setMember(memberData);
            } catch (error) {
                console.error("Error fetching member:", error);
            }
        }

        getMemberData();
    }, [slug]);

    if (!member) {
        return <p>Laster inn medlem...</p>;
    }

    return (
        <div className="member-page">
            <section className="about-me">
                <img
                    src={member.photo?.asset?.url || "https://placehold.co/400x400"}
                    alt={`Bilde av ${member.name}`}
                />
                <section className="biography">
                    <article>
                        <h1>{member.name}</h1>
                        <p>{member.bio || "Beskrivelse ikke tilgjengelig"}</p>
                    </article>
                    <article>
                        <h2>Interesser</h2>
                        <ul>
                            {member.interests?.length > 0 ? (
                                member.interests.map((interest, index) => (
                                    <li key={index}>{interest}</li>
                                ))
                            ) : (
                                <li>Ingen interesser oppgitt.</li>
                            )}
                        </ul>
                    </article>
                </section>
            </section>
            <WorkLog memberId={member._id} />
        </div>
    );
}
