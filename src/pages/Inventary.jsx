import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000/products";

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  const categories = ["Men", "Women", "Kids"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddOrUpdate = async () => {
    if (!name || !category || !size || !color || !price || !quantity) return;

    const product = {
      name,
      category,
      size,
      color,
      price,
      quantity,
      "main-image": image || "",
      colors: [],
      reviews: [],
    };

    try {
      if (editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        setEditId(null);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
      }
      setName("");
      setCategory("");
      setSize("");
      setColor("");
      setPrice("");
      setQuantity("");
      setImage("");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (p) => {
    setName(p.name);
    setCategory(p.category);
    setSize(p.size);
    setColor(p.color);
    setPrice(p.price);
    setQuantity(p.quantity);
    setImage(p["main-image"] || "");
    setEditId(p.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 p-4 sm:p-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-6 border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Clothing Inventory
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your products, stock, and details easily.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            className="input"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            className="input"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            className="input"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            className="input"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="input"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={handleImageUpload}
          />
          {image && (
            <img
              src={image}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg border"
            />
          )}
        </div>

        <button
          onClick={handleAddOrUpdate}
          className={`mt-4 sm:mt-6 px-6 py-3 rounded-xl text-white shadow-md transition ${
            editId
              ? "bg-green-500 hover:bg-green-600"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 sm:p-3">Category</th>
              <th className="p-2 sm:p-3">Name</th>
              <th className="p-2 sm:p-3">Size</th>
              <th className="p-2 sm:p-3">Price</th>
              <th className="p-2 sm:p-3">Qty</th>
              <th className="p-2 sm:p-3">Image</th>
              <th className="p-2 sm:p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-2 sm:p-3">{p.category}</td>
                <td className="p-2 sm:p-3">{p.name}</td>
                <td className="p-2 sm:p-3">{p.size}</td>
                <td className="p-2 sm:p-3">₹{p.price}</td>
                <td className="p-2 sm:p-3">{p.quantity}</td>
                <td className="p-2 sm:p-3">
                  {p["main-image"] && (
                    <img
                      src={p["main-image"]}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover"
                    />
                  )}
                </td>
                <td className="p-2 sm:p-3 flex flex-wrap gap-2">
                  <button
                    className="btn-green"
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    View
                  </button>
                  <button className="btn-yellow" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="btn-red"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reusable Styles */}
      <style jsx>{`
        .input {
          border: 1px solid #d1d5db;
          padding: 10px;
          border-radius: 12px;
          outline: none;
          width: 100%;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
        }
        .btn-green {
          background: #22c55e;
          color: white;
          padding: 5px 10px;
          border-radius: 8px;
        }
        .btn-yellow {
          background: #facc15;
          color: white;
          padding: 5px 10px;
          border-radius: 8px;
        }
        .btn-red {
          background: #ef4444;
          color: white;
          padding: 5px 10px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default Inventory;
