import { client } from "./client";

export async function fetchAllGroupMembers() {
    const data = await client.fetch(
        `*[_type == "groupMembers"]{
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
        }`
    );
    return data;
}
export async function fetchGroupMemberBySlug(slug) {
    const data = await client.fetch(
        `*[_type == "groupMembers" && slug.current == $slug][0]{
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