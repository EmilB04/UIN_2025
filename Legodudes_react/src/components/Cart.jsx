/* eslint-disable react/prop-types */
import CartProduct from "./CartProduct";

export default function Cart({ toggle, cart }) {
  // Regn ut cart-total
  let total = 0;
  cart.forEach((product) => {
    total += (product.price * product.quantity);
  });
  return (
    <section id="cart" className={toggle ? "visible" : null}>
      <h3>Din handlevogn</h3>
      <div id="cart-products">
        {cart.map((product) => (
          <CartProduct product={product} key={product.prodid} />
        ))}
      </div>
      <p>
        Totalt: Kr. <span id="cart-total">{total}</span>,-
      </p>
    </section>
  );
}
