import { client } from "./client";

export async function fetchWorklogs() {
    const data = await client.fetch(
        `*[_type == "worklog"]{
            _id,
            title,
            entry,
            createdAt,
            timeSpent,
            member -> {
                _id,
                name
            }
        }`
    );
    return data;
}