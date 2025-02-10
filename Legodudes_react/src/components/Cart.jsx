import CartProduct from "./CartProduct";

export default function Cart({ toggle, cart }) {
  return (
    <section id="cart" className={toggle ? "visible" : null}>
      <h3>Din handlevogn</h3>
      <div id="cart-products">
        {cart.map((product) => (
          <CartProduct product={product} key={product.prodid} />
        ))}
      </div>
      <p>
        Totalt: Kr. <span id="cart-total">99999</span>,-
      </p>
    </section>
  );
}
