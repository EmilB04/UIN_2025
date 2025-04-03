import { Link, useParams } from "react-router";
import { fetchAllParentCategories } from "../sanity/catecoryServices";
import { useEffect, useState } from "react";

export default function Category() {
  const { category } = useParams();
  const [parentCategories, setParentCategories] = useState([]);

  const getAllParentCategories = async () => {
    const data = await fetchAllParentCategories();
    setParentCategories(data);
  }
  useEffect(() => {
    getAllParentCategories();
  },[]);
  return (
    <>
      <h1>Category, {category ? category : null}</h1>

      <section>
        <h2>Hovedkategorier</h2>
        <ul>
          {parentCategories?.map((parentCategory) => (
            <li key={parentCategory._id}><Link></Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
