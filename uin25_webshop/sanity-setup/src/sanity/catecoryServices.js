import { client } from "./client";

// Eksporterer en asynkron funksjon slik at den kan brukes andre steder
export async function fetchAllCategories() {
  const data = await client.fetch(
    `*[_type == 'categories']{_id, categoryname, categoryslug}`
  );
  return data;
}

export async function fetchAllParentCategories() {
  const data = await client.fetch(
    `*[_type == 'parentcategory']{_id, title, "slug": slug.current}`
  );
  return data;
}

export async function fetchCategoryBySlug(slug) {
  const data = await client.fetch(`*[slug.current == $slug]`, { slug });
  return data;
}
export async function fetchCategoryByCurrentSlug(slug) {
  const data = await client.fetch(`*[categoryslug.current == $slug]`, { slug });
  return data;
}
