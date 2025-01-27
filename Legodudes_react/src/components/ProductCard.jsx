import PropTypes from "prop-types";

function ProductCard({ product, setCartCount }) {
    const handleClick = () => {
        setCartCount(10);
    }
    return (
        <article className="product-card">
            <img
                src={`website_images/PROD_${product.imagefile}`}
                alt="PRODUKTTITTEL"
            />
            <a href="#KATEGORISIDE">Ninjago</a>
            <h3>{product.title}</h3>
            <p>Kr. {product.price},-</p>
            <button onClick={handleClick}>Legg i handlekurv</button>
        </article>
    );
}
ProductCard.propTypes = {
    setCartCount: PropTypes.func.isRequired,
    product: PropTypes.shape({
        imagefile: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        prodid: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard;
