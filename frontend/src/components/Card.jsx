import React from "react";
import { deleteCartItem } from "../api/api.js";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, refreshCart, onCheckout }) => {
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    await deleteCartItem(id);
    refreshCart(); 
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
     <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          ← Back
        </button>
    <div className="mt-10 mx-auto max-w-3xl px-4">
      
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center bg-gray-50 rounded-xl py-12 shadow-inner">
          <p className="text-gray-500 text-lg">Your cart is empty 😔</p>
          <p className="text-sm text-gray-400 mt-1">Add some items to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.image || "https://via.placeholder.com/80"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.price} × {item.qty}{" "}
                    <span className="font-medium text-gray-800">= ${item.subtotal}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="mt-3 sm:mt-0 flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
              >
                <Trash2 size={18} />
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl flex justify-between items-center shadow-lg">
            <span className="text-lg font-medium">Total</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={onCheckout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-0.5 duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;
