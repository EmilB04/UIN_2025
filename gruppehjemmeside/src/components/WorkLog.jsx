import { useEffect, useState } from "react";
import { fetchWorklogs } from "../sanity/worklogServices";
import "../styles/WorkLogStyle.scss";

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
    );
}
