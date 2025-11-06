import React, { useEffect, useState } from 'react';
import { getCart, deleteCartItem } from '../api/api.js';

const Cart = ({ refreshCart }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const data = await getCart();
    console.log("🛒 Cart Data:", data.cartItems);
    setCart(data.cartItems || []);
  };

  const handleRemove = async (id) => {
    await deleteCartItem(id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    refreshCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price} x {item.qty} = ${item.subtotal}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="font-bold text-lg mt-4">Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
