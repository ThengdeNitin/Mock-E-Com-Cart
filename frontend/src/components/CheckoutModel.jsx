import React, { useState } from 'react';
import { checkout } from '../api/api';

const CheckoutModal = ({ cartItems, onClose, refreshCart }) => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await checkout(cartItems);
    setReceipt(data);
    refreshCart();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        {receipt ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">✅ Checkout Successful</h2>
            <p>Total: ${receipt.total}</p>
            <p>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <input
              type="text"
              placeholder="Name"
              className="border rounded w-full p-2 mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded w-full p-2 mb-4"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
            >
              Pay Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
