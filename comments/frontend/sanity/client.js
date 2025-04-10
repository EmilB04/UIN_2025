import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "nkgepv81",
  dataset: "production",
  apiVersion: "v2025-03-24",
  useCdn: true,
});

/*

sette opp en for å skrive til klient



*/

export const writeClient = createClient({
  projectId: "nkgepv81",
  dataset: "production",
  apiVersion: "v2025-03-24",
  useCdn: true,
  token:
    "skMRiXGVTVdm8GQdSmXXXGvIYf0qBHJaqxjbtyiI1LluKUvmLeyklpz0lwtteDUZCbQWtWIry5dAD49w2f4ZOKS9QIdR31aAU6MWHMpFszfL7SaucKeXcH7v5O69PUVWjPta0vR2QeSdwNDrj9zKsUJ8EPvGmabPHgfsq5yxhj2sU21tlcUp",
});
