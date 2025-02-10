export default function CartProduct({ product }) {
  return (
    <article className="cart-product">
      <span className="title">{product.title}</span>
      <span className="price">{product.price},-</span>
      <span className="quantity">
        x<span className="quantity-number">{product.quantity}</span>
      </span>
      <button className="delete">x</button>
    </article>
  );
}
