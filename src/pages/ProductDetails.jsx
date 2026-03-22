import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDollarSign, FaBoxes, FaRuler, FaPalette } from "react-icons/fa";

const API_URL = "http://localhost:3000/products";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/400";
    if (img.startsWith("/images")) return `${window.location.origin}${img}`;
    return img;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        if (!data.colors || data.colors.length === 0) {
          data.colors = [
            {
              name: data.color || "Default",
              images: data["main-image"] ? [data["main-image"]] : [""],
            },
          ];
        }
        setProduct(data);
        setSelectedColor(data.colors[0]);
        setCurrentImage(0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % selectedColor.images.length);
  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? selectedColor.images.length - 1 : prev - 1,
    );

  const handleAddReview = async () => {
    if (!reviewText.trim()) return;
    const updatedProduct = {
      ...product,
      reviews: [...(product.reviews || []), reviewText],
    };
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    setProduct(updatedProduct);
    setReviewText("");
  };

  if (!product || !selectedColor) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          {product.name}
        </h1>
        <p className="text-gray-500 mb-4">
          Category: {product.category || "Unspecified"}
        </p>

        {/* Responsive layout */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Images */}
          <div className="flex-1">
            <div className="relative bg-gray-100 rounded-xl h-64 md:h-72 flex items-center justify-center overflow-hidden">
              <img
                src={getImageUrl(selectedColor.images[currentImage])}
                className="max-h-full max-w-full object-contain"
              />
              {selectedColor.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 bg-black/50 text-white px-2 py-1 rounded"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 bg-black/50 text-white px-2 py-1 rounded"
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {selectedColor.images.map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  onClick={() => setCurrentImage(i)}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border ${i === currentImage ? "border-indigo-500" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1">
            {/* Color selection */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedColor(c);
                    setCurrentImage(0);
                  }}
                  className={`px-3 py-1 rounded-full border text-sm ${selectedColor.name === c.name ? "bg-indigo-500 text-white" : "bg-white text-gray-700"}`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-2 text-gray-700 mb-4 sm:mb-6">
              <p className="flex items-center gap-1">
                <FaDollarSign /> ₹{product.price}
              </p>
              <p className="flex items-center gap-1">
                <FaBoxes /> {product.quantity} items
              </p>
              <p className="flex items-center gap-1">
                <FaRuler /> Size: {product.size}
              </p>
              <p className="flex items-center gap-1">
                <FaPalette /> {selectedColor.name}
              </p>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold mb-2">
                Customer Reviews
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write a review..."
                  className="flex-1 border rounded-xl p-2 sm:p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <button
                  onClick={handleAddReview}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition"
                >
                  Submit
                </button>
              </div>
              <div className="space-y-2">
                {(product.reviews || []).length > 0 ? (
                  product.reviews.map((r, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 p-2 sm:p-3 rounded-lg text-gray-700"
                    >
                      {r}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
