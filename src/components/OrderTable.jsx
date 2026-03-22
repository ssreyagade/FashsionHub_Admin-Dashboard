import { useEffect, useState } from "react";

function OrdersTable() {
  const [orders, setOrders] = useState([]);

  const API_ORDERS = "http://localhost:3000/orders";

  // Fetch confirmed orders only
  const fetchConfirmedOrders = async () => {
    const res = await fetch(API_ORDERS);
    const data = await res.json();
    const confirmedOrders = data.filter((o) => o.confirmed === true);
    setOrders(confirmedOrders);
  };

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Confirmed Orders</h2>

      {orders.length === 0 ? (
        <p>No confirmed orders yet.</p>
      ) : (
        <table className="border w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Image</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border p-2">
                  {order["main-image"] && (
                    <img
                      src={order["main-image"]}
                      alt={order.productName}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                </td>
                <td className="border p-2">{order.productName}</td>
                <td className="border p-2">{order.category}</td>
                <td className="border p-2">${order.price}</td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2">${order.price * order.quantity}</td>
                <td className="border p-2 text-green-600 font-bold">
                  Confirmed
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersTable;
