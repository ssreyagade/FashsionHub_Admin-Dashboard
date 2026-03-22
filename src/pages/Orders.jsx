import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  const API_ORDERS = "http://localhost:3000/orders";

  // Fetch orders
  const fetchOrders = async () => {
    const res = await fetch(API_ORDERS);
    const data = await res.json();

    // ensure confirmed field exists
    const updated = data.map((o) => ({
      ...o,
      confirmed: o.confirmed || false,
    }));

    setOrders(updated);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Confirm order (update in DB)
  const confirmOrder = async (order) => {
    const updatedOrder = { ...order, confirmed: true };

    await fetch(`${API_ORDERS}/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrder),
    });

    fetchOrders(); // refresh
    alert("Order Confirmed ✅");
  };

  return (
    <div className="pt-20 px-4 md:px-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 heading-font text-gray-800">
        Orders
      </h1>

      {/* TABLE (Desktop) */}
      <div className="hidden md:block bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  {order["main-image"] && (
                    <img
                      src={order["main-image"]}
                      alt={order.productName}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                </td>

                <td className="p-3">{order.productName}</td>
                <td className="p-3">{order.category}</td>
                <td className="p-3">${order.price}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3 font-semibold">
                  ${order.price * order.quantity}
                </td>

                <td className="p-3">
                  {order.confirmed ? (
                    <span className="text-green-600 font-bold">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => confirmOrder(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white/90 backdrop-blur-md rounded-xl shadow p-4"
          >
            <div className="flex gap-4 items-center">
              {order["main-image"] && (
                <img
                  src={order["main-image"]}
                  alt={order.productName}
                  className="w-20 h-20 object-contain"
                />
              )}

              <div>
                <h2 className="font-semibold">{order.productName}</h2>
                <p className="text-sm text-gray-500">{order.category}</p>
                <p className="text-sm">
                  ₹{order.price} × {order.quantity}
                </p>
                <p className="font-bold">
                  Total: ₹{order.price * order.quantity}
                </p>
              </div>
            </div>

            <div className="mt-3">
              {order.confirmed ? (
                <span className="text-green-600 font-bold">Confirmed</span>
              ) : (
                <button
                  onClick={() => confirmOrder(order)}
                  className="w-full bg-blue-500 text-white py-2 rounded mt-2"
                >
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No orders available</p>
      )}
    </div>
  );
}

export default Orders;
