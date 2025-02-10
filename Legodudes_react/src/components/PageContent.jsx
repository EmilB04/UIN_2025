/* eslint-disable react/prop-types */

import { useState } from "react";
import CategoryHeading from "./CategoryHeading";
import ProductCard from "./ProductCard";
export default function PageContent({ products, setCartCount, cart, setCart }) {
  const [title, setTitle] = useState("Ninjago");

  return (
    <main>
      {/* Viser overskrift for kategorien */}
      <CategoryHeading title={title} />

      {/* Produktliste-seksjon */}
      <div id="productlist">
        {/* Mapper gjennom produktlisten og genererer en ProductCard-komponent for hvert produkt */}
        {products.map((product, index) => (
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
