import { useEffect, useState } from "react";
import { fetchWorklogs } from "../sanity/worklogServices";
import "../styles/WorkLogStyle.scss"; // Assuming you have a CSS file for styles

export default function Arbeidslogg() {
    const [workLogs, setWorkLogs] = useState([]);

    useEffect(() => {
        async function getWorkLogs() {
            const data = await fetchWorklogs();
            setWorkLogs(data);
        }
        getWorkLogs();
    }, []);

    return (
        <section className="worklog-section">
            <h1>Arbeidslogg</h1>
            <div>
                {workLogs.map((log) => (
                    <div key={log._id} className="worklog-entry">
                        <p>{new Date(log.createdAt).toLocaleDateString()}</p>{" "} {/* Bare dato */}
                        <p>{log.member.name}</p>
                        <h2>{log.title}</h2>        {/* Tittel. Fungerer ikke helt */}
                        <p>{log.timeSpent}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
