export default function CartProduct() {
  return (
    <article className="cart-product">
      <span className="title">Dragon Zane</span>
      <span className="price">89,-</span>
      <span className="quantity">
        x<span className="quantity-number">1</span>
      </span>
      <button className="delete">x</button>
    </article>
  );
}
