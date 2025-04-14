import { client } from "./client";

export async function fetchAllGroupMembers() {
    const data = await client.fetch(
        `*[_type == "groupMembers"]{
            _id,
            name,
            email,
            slug,
            photo {
                asset -> {
                    url
                }
            }
        }`
    );
    return data;
}
export async function fetchGroupMemberBySlug(slug) {
    const data = await client.fetch(
        `*[_type == "groupMembers" && slug.current == $slug][0]{
            _id,
            name,
            email,
            slug,
            bio,
            interests,
            photo {
                asset -> {
                    _id,
                    url
                }
            },
            "worklog": *[_type == "worklog" && member._ref == ^._id] | order(createdAt desc) {
                _id,
                entry,
                createdAt,
                timeSpent,
            }
        }`,
        { slug }
    );
    return data;
}
export async function fetchGroupMembersByName(name) {
    const data = await client.fetch(
        `*[_type == "groupMembers" && name == $name][0]{
            _id,
            name,
            slug,
            image {
                asset -> {
                    _id,
                    url
                }
            },
            bio,
            interests
        }`,
        { name }
    );
    return data;
}