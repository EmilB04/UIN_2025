import { client } from "./client";

export const fetchSanityEvents = async () => {
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

export async function fetchEventById(id) {
    try {
        const query = `*[_type == "event" && _id == $_id][0]{
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
        const data = await client.fetch(query, { _id: id });
        return data;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
}