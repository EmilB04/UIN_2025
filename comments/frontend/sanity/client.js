import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "njnptjj2",
  dataset: "production",
  apiVersion: "v2025-03-24",
  useCdn: true,
});

/*

sette opp en for å skrive til klient



*/

export const writeClient = createClient({
  projectId: "njnptjj2",
  dataset: "production",
  apiVersion: "v2025-03-24",
  useCdn: true,
  token:
    "skj3eXAKRZlY8KkZmXJgIPb97XgSS47Re3rSKZGEdXdkCf8MpkNZxZ0U7s0Gd6niJ52v0ZaLR2VXBbtl67N7IXqmFKQh9cmCgpX7LRwjLDWauxDugJUhjEATMBQiElz2NUwqVIVPK1SJwyRXxx1WtEK1Kda2J2JKCeUfWE0vZSBJBoSws5ac",
});
