// Produktkort-komponent som tar inn et produkt som prop
export default function ProductCard({ product, setCartCount }) {
  const handleClick = () => {
    setCartCount(10);
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
