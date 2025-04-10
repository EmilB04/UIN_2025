import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  fetchAllProducts,
  fetchProductByCategories,
} from "./sanity/productsServices";
import { fetchAllCategories } from "./sanity/catecoryServices";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Product from "./components/Product";
import Category from "./components/Category";
import Home from "./components/Home";
import SubCategory from "./components/SubCategory";

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
  };


  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                categories={categories}
                getProductsByCategory={getProductsByCategory}
              />
            }
          />
          <Route path="product/:product" element={<Product />} />
          <Route path="category/:category" element={<Category />} />
          <Route path="category/:category/:subcategory" element={<SubCategory getProductsByCategory={getProductsByCategory} products={products} />} />
          <Route path="category/" element={<Category />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
