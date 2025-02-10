import { useState } from "react";
// Importerer produkter fra en ekstern fil
import { products } from "./assets/legodudes";

// Importerer komponenter som brukes i appen
import Cart from "./components/Cart";

import Header from "./components/Header";

import PageContent from "./components/PageContent";

// Importerer stilfilen for appen
import "./styles/style.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import About from "./components/About";

// Definerer hovedkomponenten App
function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [cart, setCart] = useState([]);
  return (
    <Routes>
      <Route path="/" element={<Home toggle={toggle} setToggle={setToggle} cart={cart} setCart={setCart} cartCount={cartCount} setCartCount={setCartCount} products={products} />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  );
}

// Eksporterer App-komponenten for bruk i applikasjonen
export default App;
