
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from the Express backend
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
        
      } catch {
        setError(
          "Could not load orders. Please check whether the backend is running."
        );
      } finally {
       setLoading(false);
   }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="orders-page">
        <h1>My Orders</h1>
        <p>Loading your orders...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page">
        <h1>My Orders</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-heading">
        <div>
          <span className="orders-tag">FOODELI</span>
          <h1>My Orders</h1>
          <p>View your food orders and delivery details.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">🛍️</div>
          <h2>No orders yet</h2>
          <p>
            Your orders will appear here after you place an order.
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <h2>Order #{order.id}</h2>
                  <p className="order-date">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "Date not available"}
                  </p>
                </div>

                <span className="order-status">
                  {order.status || "Order Placed"}
                </span>
              </div>

              <div className="order-customer-details">
                <h3>Delivery Details</h3>

                <p>
                  <strong>Customer:</strong>{" "}
                  {order.customerName}
                </p>

                <p>
                  <strong>Phone Number:</strong>{" "}
                  {order.customerPhone || "Not provided"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address}
                </p>
              </div>

              <div className="order-items">
                <h3>Items Ordered</h3>

                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div
                      className="order-item"
                      key={`${order.id}-${item.id}-${index}`}
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₹
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No item details available.</p>
                )}
              </div>

              <div className="order-total">
                <span>Total Amount</span>
                <strong>
                  ₹{Number(order.total || 0).toFixed(2)}
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;