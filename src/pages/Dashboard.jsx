import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [employeesCount, setEmployeesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [salesStats, setSalesStats] = useState({
    total: 0,
    average: 0,
    min: 0,
    max: 0,
  });

  const API_EMPLOYEES = "http://localhost:3000/employees";
  const API_PRODUCTS = "http://localhost:3000/products";
  const API_ORDERS = "http://localhost:3000/orders";

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [empRes, prodRes, ordRes] = await Promise.all([
          fetch(API_EMPLOYEES),
          fetch(API_PRODUCTS),
          fetch(API_ORDERS),
        ]);
        const [empData, prodData, ordData] = await Promise.all([
          empRes.json(),
          prodRes.json(),
          ordRes.json(),
        ]);

        setEmployeesCount(empData.length);
        setProductsCount(prodData.length);
        setOrdersCount(ordData.length);

        // Sales Analysis
        if (prodData.length > 0) {
          const prices = prodData.map((p) => Number(p.price) || 0);
          const total = prices.reduce((a, b) => a + b, 0);
          const average = Math.round(total / prices.length);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setSalesStats({ total, average, min, max });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCounts();
  }, []);

  const cards = [
    {
      title: "Employees",
      count: employeesCount,
      bg: "from-pink-400 via-pink-500 to-pink-600",
      onClick: () => navigate("/employees"),
    },
    {
      title: "Products",
      count: productsCount,
      bg: "from-green-400 via-green-500 to-green-600",
      onClick: () => navigate("/inventory"),
    },
    {
      title: "Orders",
      count: ordersCount,
      bg: "from-blue-400 via-blue-500 to-blue-600",
      onClick: () => navigate("/ordertable"),
    },
  ];

  const salesCards = [
    {
      title: "Total Sales",
      value: `₹${salesStats.total}`,
      bg: "from-yellow-400 via-yellow-500 to-yellow-600",
    },
    {
      title: "Average Price",
      value: `₹${salesStats.average}`,
      bg: "from-purple-400 via-purple-500 to-purple-600",
    },
    {
      title: "Minimum Price",
      value: `₹${salesStats.min}`,
      bg: "from-red-400 via-red-500 to-red-600",
    },
    {
      title: "Maximum Price",
      value: `₹${salesStats.max}`,
      bg: "from-teal-400 via-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/70 via-gray-100/70 to-white/70 flex justify-center p-4 pt-24">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold mb-8 text-gray-700 text-center">
          Dashboard
        </h1>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={card.onClick}
              className={`cursor-pointer bg-gradient-to-r ${card.bg} text-white p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105`}
            >
              <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
              <p className="text-3xl font-bold">{card.count}</p>
            </div>
          ))}
        </div>

        {/* Sales Analysis Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Sales Analysis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {salesCards.map((card) => (
            <div
              key={card.title}
              className={`bg-gradient-to-r ${card.bg} text-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center`}
            >
              <p className="font-medium text-lg mb-2">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
