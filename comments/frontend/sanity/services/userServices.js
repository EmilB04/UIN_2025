import { client } from "../client";

export async function fetchAllUsers() {
  const data = await client.fetch(`*[_type == 'users']
                {_id,
                name,
                "image": image.asset -> url,
                "slug": slug.current
            }`);
  return data;
}

export async function fetchUserBySlug(slug) {
  const data = await client.fetch(
    `*[_type == 'users' && slug.current == $slug]{
                _id,
                name,
                "image": image.asset -> url,
                slug
            }`,
    { slug }
  );
  return data;
}
/*En fetch som henter en bruker basert på id, denne er foreløpelig statisk*/
export async function fetchUserById() {
  const data = await client.fetch(
    `*[_type == "users" && _id == "58db69b2-45e8-4144-b56f-4fd7907d5840"]`
  );
  return data;
}

/*TODO: Skrive en fetch funksjon for å hente alle kommentarerene en bruker har gjort på et produkt */
