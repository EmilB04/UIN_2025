import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Nav from "./NavSection";
import "../styles/MemberStyle.scss";
import { fetchWorklogs } from "../sanity/worklogServices";
import { fetchGroupMemberBySlug } from "../sanity/memberServices";

export default function MemberPage() {
    const { slug } = useParams(); // Extract slug from URL params
    const [member, setMember] = useState(null);
    const [workLogs, setWorkLogs] = useState([]);

    useEffect(() => {
        async function getMemberData() {
            try {
                // Fetch member details by slug
                const memberData = await fetchGroupMemberBySlug(slug);
                setMember(memberData);

                // Fetch work logs for the member
                const logs = await fetchWorklogs(slug); // Må fikses slik at den henter logs for den spesifikke medlemmen
                setWorkLogs(logs);
            } catch (error) {
                console.error("Error fetching member or work logs:", error);
            }
        }

        getMemberData();
    }, [slug]);

    if (!member) {
        return <p>Laster inn medlem...</p>; // Loading state
    }

    return (
        <div>
            <Nav />
            <section className="om-meg">
                <img
                    src={member.photo?.asset?.url ? member.photo.asset.url : "https://placehold.co/400x400"}
                    alt={`Bilde av ${member.name}`}
                />
                <section className="biografi">
                    <article>
                        <h1>{member.name}</h1>
                        <p>{member.email || "E-post ikke tilgjengelig"}</p>
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
            <section className="arbeidslogg">
                <h2>Arbeidslogg</h2>
                {workLogs.length > 0 ? (
                    workLogs.map((log) => (
                        <article key={log._id}>
                            <h3>{log.title}</h3>
                            <p>{log.entry}</p>
                            <time>
                                {new Date(log.createdAt).toLocaleDateString("no-NO", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </time>
                            <p>Tid brukt: {log.timeSpent || "Ikke oppgitt"}</p>
                        </article>
                    ))
                ) : (
                    <p>Ingen arbeidslogg funnet.</p>
                )}
            </section>
        </div>
    );
}