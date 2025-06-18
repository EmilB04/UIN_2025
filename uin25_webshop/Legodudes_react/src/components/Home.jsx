/* eslint-disable react/prop-types */
import PageContent from "./PageContent";

export default function Home({cart, products, setCartCount, setCart}) {
    return (
        <PageContent
            products={products}
            setCartCount={setCartCount}
            cart={cart}
            setCart={setCart}
        />
    )
}