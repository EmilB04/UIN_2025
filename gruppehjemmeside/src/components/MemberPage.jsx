import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Nav from "./NavSection";
import "../styles/MemberStyle.scss";
import { fetchWorklogs, fetchWorkLogsByMemberId } from "../sanity/worklogServices";
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
                const logs = await fetchWorkLogsByMemberId(slug);
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
            <section className="om-meg">
                <img src={member.photo?.asset?.url || "https://placehold.co/400x400"} alt={`Bilde av ${member.name}`} />
                <section className="biografi">
                    <article>
                        <h1>{member.name}</h1>
                        <p>{member.email || "E-post ikke tilgjengelig"}</p>
                    </article>
                    <article>
                        <h2>Interesser</h2>
                        <ul>
                            {member.interests?.length > 0 ? (
                                member.interests.map((interest, index) => <li key={index}>{interest}</li>)
                            ) : (
                                <li>Ingen interesser oppgitt.</li>
                            )}
                        </ul>
                    </article>
                </section>
            </section>
            <section className="worklog-section">
                <h1>Arbeidslogg</h1>
                <div>
                    {workLogs.map((log) => (
                        <div key={log._id} className="worklog-entry">
                            <p>
                                {new Date(log.createdAt).toLocaleDateString("no-NO", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </p>
                            <p>{log.member.name}</p>
                            <p>{log.title}</p>
                            <p>{log.timeSpent}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}