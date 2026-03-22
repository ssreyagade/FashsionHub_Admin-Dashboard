import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const API_ORDERS = "http://localhost:3000/orders";

  const fetchConfirmedOrders = async () => {
    try {
      const res = await fetch(API_ORDERS);
      const data = await res.json();

      const confirmedOrders = data.filter((o) => o.confirmed === true);
      setOrders(confirmedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 p-4 sm:p-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Confirmed Orders
        </h2>
        <p className="text-gray-600 mt-1">
          View all successfully confirmed orders.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No confirmed orders yet.</p>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">Image</th>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {order["main-image"] && (
                      <img
                        src={order["main-image"]}
                        alt={order.productName}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                  </td>

                  <td className="p-3 font-medium text-gray-800">
                    {order.productName}
                  </td>

                  <td className="p-3 text-gray-600">{order.category}</td>

                  <td className="p-3">₹{order.price}</td>

                  <td className="p-3">{order.quantity}</td>

                  <td className="p-3 font-semibold">
                    ₹{order.price * order.quantity}
                  </td>

                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Confirmed
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/product/${order.productId}`)}
                      className="bg-indigo-500 text-white px-4 py-1 rounded-lg hover:bg-indigo-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrderTable;
