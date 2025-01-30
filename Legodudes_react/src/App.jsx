import { useState } from "react";
import { products } from "./assets/legodudes";

import Cart from "./components/Cart";
import Header from "./components/Header";
import PageContent from "./components/PageContent";

import "./styles/style.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [cart, setCart] = useState([]);
  return (
    <div id="content">
      <Cart toggle={toggle} cart={cart} />
      <Header cartCount={cartCount} setToggle={setToggle} toggle={toggle}/>
      <PageContent products={products} setCartCount={setCartCount} cart={cart} setCart={setCart} />

      <footer>
        <p>2025 &copy; Legodudes</p>
      </footer>
    </div>
  );
}

export default App;
