import Navigation from "./Navigation";
function Header({ cartCount }) {

    return (
        <header>
            <a href="index.html" id="logo">
                <img src="website_images/LD_logo.svg" alt="Legodudes" />
            </a>
            <button id="shoppingcart">
                <span id="cartcount">{cartCount}</span>
                <img src="website_images/legocart.svg" alt="Handlevogn" />
            </button>
            <Navigation />
        </header>
    );
}

export default Header