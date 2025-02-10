// Produktkort-komponent som tar inn et produkt som prop
export default function ProductCard({ product, setCartCount, cart, setCart }) {
  const handleClick = () => {
    const exist = cart.find((item) => item.prodid === product.prodid);
    setCart((prev) =>
      exist
        ? prev.map((item) =>
            item.prodid === product.prodid
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }]
    );

    console.log("Denne sjekken skjer i ProductCar:", exist);
  };

  return (
    <article className="product-card">
      {/* Viser produktbilde basert på filnavnet fra produktobjektet */}
      <img
        src={`website_images/PROD_${product.imagefile}`}
        alt={product.title}
      />
      {/* Lenke til produktkategori */}
      <a href="#KATEGORISIDE">{product.category}</a>

      {/* Viser produktets tittel */}
      <h3>{product.title}</h3>

      {/* Viser produktets pris */}
      <p>Kr. {product.price},-</p>

      {/* Knapp for å legge produktet i handlekurven */}
      <button onClick={handleClick}>Legg i handlekurv</button>
    </article>
  );
}
