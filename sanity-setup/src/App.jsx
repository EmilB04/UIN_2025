import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import Category from "./components/Category";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product/:product" element={<Products />} />
        <Route path="category/:category" element={<Category />} />
      </Routes>
    </Layout>
  );
}

export default App;

{/* 
  {/*
    <main>
      <h1>Min nettbutikk</h1>
      {categories?.map((category) => (
        <button
          key={category._id}
          onClick={() => getProductsByCategory(category.categoryname)}
        >
          {category.categoryname}
        </button>
      ))}
      {products?.map((product) => (
        <article key={product._id}>
          <h3>{product.productname}</h3>
          <img src={product.image.asset.url} alt={product.productname} />
        </article>
      ))}
    </main>
    */}