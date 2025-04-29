import { client } from "./client";

export async function fetchAllSanityEvents() {
    try {
        const query = `*[_type == "event"]{
            _id,
            apiId,
            title,
            date,
            time,
            country,
            city,
            venue,
            "image": image.asset->url
        }`;
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error("Error fetching Sanity events:", error);
        throw error;
    }
}
