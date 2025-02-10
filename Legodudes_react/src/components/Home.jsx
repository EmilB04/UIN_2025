import { Link } from "react-router";
import Cart from "./Cart";
import Header from "./Header";
import PageContent from "./PageContent";

export default function Home({toggle, cart, cartCount, setToggle, products, setCartCount, setCart}) {
    return (
        <div id="content">
        {/* Legger til handlevogn-komponenten */}
        <Cart toggle={toggle} cart={cart} />
        {/* Overskrift-seksjon med logo og handlekurvknapp */}
        <Header cartCount={cartCount} setToggle={setToggle} toggle={toggle} />
        <PageContent
            products={products}
            setCartCount={setCartCount}
            cart={cart}
            setCart={setCart}
        />

        {/* Footer-seksjon */}
        <footer>
            <p>2025 &copy; Legodudes / <Link to="/about">Om nettbutikken</Link></p>
        </footer>
        </div>
    )
}