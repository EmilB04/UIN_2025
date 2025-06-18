/* eslint-disable react/prop-types */
import { useParams } from "react-router";
import ProductCard from "./ProductCard";


export default function CategoryPage({ products, cart, setCart, setCartCount }) {

    const { slug } = useParams();
    const categoryProducts = products.filter((product) => product.categorySlug === slug);

    console.log(categoryProducts);

    return (
        <main>
            <div id="productlist">
                {categoryProducts.map((product, index) => (
                    <ProductCard
                        product={product}
                        key={`FCT_${index}`}
                        setCartCount={setCartCount}
                        cart={cart}
                        setCart={setCart}
                    />
                ))}
            </div>
        </main>
    );
}