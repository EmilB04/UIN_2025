import CartProduct from "./CartProduct";

export default function Cart() {
  return (
    <section id="cart">
      <h3>Din handlevogn</h3>
      <div id="cart-products">
        <CartProduct />
        {/*
         <article className="cart-product">
          <span className="title">Dragon Zane</span>
          <span className="price">89,-</span>
          <span className="quantity">
            x<span className="quantity-number">1</span>
          </span>
          <button className="delete">x</button>
        </article>
        <article className="cart-product">
          <span className="title">
            Master Wu MMM MMMMM MMMMMM mMm MMMMMMM MMMMMMM
          </span>
          <span className="price">999,-</span>
          <span className="quantity">
            x<span className="quantity-number">9</span>
          </span>
          <button className="delete">x</button>
        </article>
        <article className="cart-product">
          <span className="title">Vengestone Warrior</span>
          <span className="price">89,-</span>
          <span className="quantity">
            x<span className="quantity-number">3</span>
          </span>
          <button className="delete">x</button>
        </article>
        */}
      </div>
      <p>
        Totalt: Kr. <span id="cart-total">99999</span>,-
      </p>
    </section>
  );
}
