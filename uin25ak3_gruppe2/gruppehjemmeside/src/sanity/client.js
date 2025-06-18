import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "t7exo8z2",
  dataset: "production",
  useCdn: false,
});
