import SanityClientConstructor from "@sanity/client";

export const client = SanityClientConstructor({
  projectId: "1esit5sw",
  dataset: "production",
  apiVersion: "v2025-03-24",
  useCdn: false,
});
