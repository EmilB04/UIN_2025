import { Link, useParams } from "react-router-dom";
import { fetchAllParentCategories } from "../sanity/catecoryServices";
import { useEffect, useState } from "react";
import { fetchProductsByParentCategory } from "../sanity/productsServices";

export default function Category() {
  const { category } = useParams();
  const [parentCategories, setParentCategories] = useState([]);

  const getAllParentCategories = async () => {
    const data = await fetchAllParentCategories();
    setParentCategories(data);
  };
  console.log(parentCategories);

  const getProductByParentC = async () => {
    const data = await fetchProductsByParentCategory();
    console.log(data);
  };

  useEffect(() => {
    getAllParentCategories();
  }, []);

  useEffect(() => {
    getProductByParentC();
  }, [category]);

  return (
    <>
      <h1>Category, {category ? category : null}</h1>
      {category == null ? (
        <section>
          <h2>Hovedkategorier</h2>
          <ul>
            {parentCategories?.map((parenc) => (
              <li key={parenc._id}>
                <Link to={parenc.slug}>{parenc.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <h2>Underkategorier: {category}</h2>
        </section>
      )}
    </>
  );
}
