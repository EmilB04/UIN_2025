import { useEffect, useState } from "react";
import "./App.css";
import { fetchAllProducts } from "./sanity/productsServices";
import { fetchAllCategories } from "./sanity/catecoryServices";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  const getAllCategories = async () => {
    const data = await fetchAllCategories();
    setCategories(data);
  };

  const getProductsByCategory = async (cat) => {
    const data = await fetchProductByCategories(cat);
    setProducts(data);
  }

  console.log(products);

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <main>
      <h1>Min nettbutikk</h1>
      <button key={category._id} onClick={()=> getProductsByCategory(category.categoryname)}>{category.categoryname}</button>
      {products?.map((product) => (
        <article key={product._id}>
          <h3>{product.productname}</h3>
          <img src={product.image.asset.url} alt={product.productname} />
        </article>
      ))}
    </main>
  );
}

export default App;
