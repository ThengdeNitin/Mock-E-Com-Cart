import React, { useState } from "react";
import { checkout } from "../api/api";
import { CheckCircle2, X } from "lucide-react"; // optional icons

const CheckoutModal = ({ cartItems, onClose, refreshCart }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await checkout(cartItems);
    console.log("🧾 Checkout Response:", data);

    if (data?.receipt) setReceipt(data.receipt);
    refreshCart();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>
        
        {receipt ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="text-green-500 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Checkout Successful 🎉
            </h2>
            <p className="text-gray-600">Order ID: {receipt.orderId}</p>
            <p className="text-gray-800 font-medium mt-2">
              Total: ${receipt.total}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(receipt.createdAt).toLocaleString()}
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Checkout
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-5 w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
              }`}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
