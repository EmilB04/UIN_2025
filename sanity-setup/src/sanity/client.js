import SanityClientConstructor from "@sanity/client";

export const client = SanityClientConstructor({
  projectId: "1esit5sw", // Dette er Ann-Charlott sin.
  dataset: "production",
  apiVersion: "v2025-03-24",
  useCdn: false,
});
