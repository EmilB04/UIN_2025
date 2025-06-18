import { client } from "./client";

export async function fetchAllCategories() {
    const data = await client.fetch(
      `*[_type == 'categories']{_id, categoryname, categoryslug}`
    );
    return data;
  }

  export async function fetchCategoryBySlug(slug) {
    const data = await client.fetch(
      `*[_type == "categories" && categoryslug.current == $slug]`,
      { slug }
    );
    return data;
  }
  