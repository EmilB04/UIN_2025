import { useEffect, useState } from "react";
import { fetchAllProducts } from "../sanity/services/productServices";
import { Link } from "react-router-dom";
import "../src/styles/productcard.scss";

export default function Products({ product }) {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
    console.log(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="products">
      <h1>Produkter</h1>
      {products?.map((product) => (
        <article key={product._id} className="productcard">
          <h3>
            <Link to={product.slug}>{product.name}</Link>
          </h3>
        </article>
      ))}
    </section>
  );
}
