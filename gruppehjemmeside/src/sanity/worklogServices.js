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
export async function fetchWorkLogsByMemberId(slug) {
    const data = await client.fetch(
        `*[_type == "worklog" && member->slug.current == $slug][0]{
            _id,
            title,
            entry,
            createdAt,
            timeSpent,
            member -> {
                _id,
                name
            }
        }`,
        { slug }
    );
    return data;
}