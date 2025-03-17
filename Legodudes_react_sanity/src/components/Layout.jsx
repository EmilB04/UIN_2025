/* eslint-disable react/prop-types */

import { Link } from "react-router";
import Cart from "./Cart";
import Header from "./Header";


export default function Layout({ toggle, cart, cartCount, setToggle, children }) {
    return (
        <div id="content">
            {/* Legger til handlevogn-komponenten */}
            <Cart toggle={toggle} cart={cart} />
            {/* Overskrift-seksjon med logo og handlekurvknapp */}
            <Header cartCount={cartCount} setToggle={setToggle} toggle={toggle} />

            {children}

            {/* Footer-seksjon */}
            <footer>
                <p>2025 &copy; Legodudes /<Link to="/about">Om nettbutikken</Link></p>
            </footer>
        </div>
    );
}
