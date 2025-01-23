

function ProductCard({ product }) {
    return (
        <article className="product-card">
            <img src={`website_images/PROD_${product.imagefile}`} alt="PRODUKTTITTEL" />
            <a href="#KATEGORISIDE">Ninjago</a>
            <h3>{product.title}</h3>
            <p>Kr. {product.price},-</p>
            <button onClick="addProductToCart(${product.prodid})">Legg i handlekurv</button>
        </article>
    );
}

export default ProductCard;