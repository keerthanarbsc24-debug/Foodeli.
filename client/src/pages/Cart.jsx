
import { useState } from "react";

function Cart({ cart, setCart }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  async function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setPlacingOrder(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName,
            customerPhone,
            address,
            items: cart,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to place order.");
      }

      setMessage(
        `Order placed successfully! Your order ID is ${data.order.id}.`
      );

      setCart([]);
      setCustomerName("");
      setAddress("");
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setPlacingOrder(false);
    }
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <p className="eyebrow">ALMOST THERE!</p>
        <h1>Your Cart</h1>
        <p>Review your favourites before placing your order.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Explore our menu and add something delicious.</p>
          <a href="/menu" className="primary-button">
            Explore Menu →
          </a>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} each</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  <strong>₹{item.price * item.quantity}</strong>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="checkout-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items ({cart.length})</span>
              <span>₹{total}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <form onSubmit={placeOrder} className="checkout-form">
              <label htmlFor="customerName">Your Name</label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
                placeholder="Enter your name"
                required
              />

              <label htmlFor="customerPhone">Phone Number</label>
              <input
                id="customerPhone"
                type="tel"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />

              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                placeholder="Enter your delivery address"
                rows="3"
                required
              />

              <button
                type="submit"
                className="primary-button checkout-button"
                disabled={placingOrder}
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </aside>
        </div>
      )}

      {message && (
        <p className="cart-message" role="status">
          {message}
        </p>
      )}
    </main>
  );
}

export default Cart;