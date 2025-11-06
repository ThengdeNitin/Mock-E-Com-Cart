import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Cart from './components/Card';
import CheckoutModal from './components/CheckoutModel';
import { getCart } from './api/api';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCart = async () => {
    const data = await getCart();
    setCartItems(data.cartItems || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🛍️ Vibe Commerce</h1>
        <button
          onClick={() => setShowCheckout(true)}
          className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-indigo-100"
        >
          Checkout ({cartItems.length})
        </button>
      </header>

      <main className="p-6">
        <Home refreshCart={fetchCart} />
        <Cart refreshCart={fetchCart} />
      </main>

      {showCheckout && (
        <CheckoutModal
          cartItems={cartItems}
          onClose={() => setShowCheckout(false)}
          refreshCart={fetchCart}
        />
      )}
    </div>
  );
}

export default App;
