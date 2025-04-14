import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { fetchWorklogs, fetchWorkLogsByMemberId } from "../sanity/worklogServices";
import "../styles/WorkLogStyle.scss";

export default function WorkLog({ memberId }) {
    const [workLogs, setWorkLogs] = useState([]);
    const location = useLocation(); // Get the current URL

    useEffect(() => {
        async function getWorkLogs() {
            const data = memberId
                ? await fetchWorkLogsByMemberId(memberId) // Fetch logs for a specific member
                : await fetchWorklogs(); // Fetch all logs

            // Sort logs by date (newest first)
            const sortedData = data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setWorkLogs(sortedData);
        }
        getWorkLogs();
    }, [memberId]);

    // Determine if the current page is a members page
    const isMembersPage = location.pathname.startsWith("/members");

    return (
        <section className="worklog-section">
            <h1 className={isMembersPage ? "align-left" : "align-center"}>Arbeidslogg</h1>
            <div className="worklog-grid">
                {workLogs.length > 0 ? (
                    workLogs.map((log) => (
                        <div key={log._id} className="worklog-entry">
                            <p className="date">
                                {new Date(log.createdAt).toLocaleDateString("no-NO", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </p>
                            <p className="member">{log.member?.name || "Ukjent medlem"}</p>
                            <p className="title">{log.title || "Tittel ikke oppgitt"}</p>
                            <p className="time">{log.timeSpent || "Tid ikke oppgitt"}</p>
                        </div>
                    ))
                ) : (
                    <p>Ingen arbeidslogg funnet.</p>
                )}
            </div>
        </section>
    );
}