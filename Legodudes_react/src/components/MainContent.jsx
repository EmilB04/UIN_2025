import { useState } from "react";
import CategoryHeading from "./CategoryHeading"
import ProductCard from "./ProductCard"
import PropTypes from 'prop-types';

function MainContent({ products, setCartCount}) {
    const [title, setTitle] = useState("Ninjago");

    return (
        <main>
            <CategoryHeading title={title} />
            <div id="productlist">
                {products.map((product, index) => (
                    <ProductCard product={product} key={`FCT_${index}`} setCartCount={setCartCount} />
                ))}
            </div>
        </main>
    )
}


MainContent.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCartCount: PropTypes.func.isRequired,
};

export default MainContent;