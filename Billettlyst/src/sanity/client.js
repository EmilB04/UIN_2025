import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "zfrfh6h7",
    dataset: "production",
    useCdn: false,
});
