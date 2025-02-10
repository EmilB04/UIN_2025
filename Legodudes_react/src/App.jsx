import { useState } from "react";
// Importerer produkter fra en ekstern fil
import { products } from "./assets/legodudes";

// Importerer stilfilen for appen
import "./styles/style.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import About from "./components/About";
import Layout from "./components/Layout";
import CategoryPage from "./components/Category";

// Definerer hovedkomponenten App
function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [cart, setCart] = useState([]);
  return (
    <Layout toggle={toggle} cart={cart} cartCount={cartCount} setToggle={setToggle}>
      <Routes>
        <Route path="/" element={<Home toggle={toggle} setToggle={setToggle} cart={cart} setCart={setCart} cartCount={cartCount} setCartCount={setCartCount} products={products} />}></Route>
        <Route path="/about" element={<About />}></Route>
        {/* : indicates dynamic link*/ }
        <Route path="/category/:slug" element={<CategoryPage products={products} cart={cart} setCart={setCart} setCartCount={setCartCount} />} ></Route>
      </Routes>
    </Layout>
  );
}

// Eksporterer App-komponenten for bruk i applikasjonen
export default App;
