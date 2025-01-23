import "./styles/style.css";
import "./assets/legodudes.js"
import { products } from "./assets/legodudes";
import ProductCard from "./components/ProductCard.jsx";
import CategoryHeading from "./components/CategoryHeading.jsx";
import Navigation from "./components/Navigation.jsx";
import Cart from "./components/Cart.jsx";

function App() {
    return (
        <div id="content">
            <Cart />

            <header>
                <a href="index.html" id="logo">
                    <img src="website_images/LD_logo.svg" alt="Legodudes" />
                </a>
                <button id="shoppingcart">
                    <span id="cartcount">99</span>
                    <img src="website_images/legocart.svg" alt="Handlevogn" />
                </button>
                <Navigation />
            </header>
            <main>
                <CategoryHeading category="Ninjago" />
                <div id="productlist">
                    {products.map((product, index) => (
                        <ProductCard product={product} key={index} />
                        ))}
                </div>
            </main>
            <footer>
                <p>2025 &copy; Legodudes</p>
            </footer>
        </div>
    );
}

export default App;
