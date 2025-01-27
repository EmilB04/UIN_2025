import "./styles/style.css";
import "./assets/legodudes.js"
import Header from "./components/Header.jsx";
import Cart from "./components/Cart.jsx";
import MainContent from "./components/MainContent.jsx";
import { products } from "./assets/legodudes.js";
import { useState } from "react";

function App() {
    const [cartCount, setCartCount] = useState(0);
    return (
        <div id="content">
            <Cart />

            <Header cartCount={cartCount} setCartCount={setCartCount} />
            <MainContent products={products} />
            <footer>
                <p>2025 &copy; Legodudes</p>
            </footer>
        </div>
    );
}

export default App;