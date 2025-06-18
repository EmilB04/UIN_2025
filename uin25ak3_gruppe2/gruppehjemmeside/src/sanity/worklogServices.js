import { client } from "./client";

export async function fetchWorklogs() {
    const data = await client.fetch(
        `*[_type == "worklog"] | order(createdAt desc){
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

export async function fetchWorkLogsByMemberId(memberId) {
    const query = `*[_type == "worklog" && member._ref == $memberId]{
        _id,
        title,
        timeSpent,
        createdAt,
        member->{
            name
        }
    }`;

    const params = { memberId };
    const result = await client.fetch(query, params);
    return result;
}