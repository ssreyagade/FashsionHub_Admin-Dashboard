import { useEffect, useState } from "react";

const API_ORDERS = "http://localhost:3000/orders";

function Invoice() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_ORDERS);
        const data = await res.json();
        // Only confirmed orders
        const confirmedOrders = data.filter((o) => o.confirmed === true);
        setOrders(confirmedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleSendInvoice = (order) => {
    // For now, we just simulate sending
    alert(`Invoice sent to customer for order: ${order.id}`);
    // Later: integrate email API or backend call here
  };

  const totalPrice = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Invoices</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No confirmed orders yet.</p>
        ) : (
          <>
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Qty</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 border">{order.id}</td>
                    <td className="p-3 border">{order.productName}</td>
                    <td className="p-3 border">{order.category}</td>
                    <td className="p-3 border">₹{order.price}</td>
                    <td className="p-3 border">{order.quantity}</td>
                    <td className="p-3 border">
                      ₹{order.price * order.quantity}
                    </td>
                    <td className="p-3 border">
                      <button
                        onClick={() => handleSendInvoice(order)}
                        className="bg-indigo-500 text-white px-3 py-1 rounded shadow hover:bg-indigo-600 transition"
                      >
                        Send Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right text-xl font-bold text-gray-700">
              Total Price: ₹{totalPrice}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Invoice;
