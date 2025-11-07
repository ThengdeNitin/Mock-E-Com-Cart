import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./components/Card";
import CheckoutModal from "./components/CheckoutModel";
import { getCart } from "./api/api";

function App() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCart = async () => {
    const data = await getCart();
    setCart(data.cartItems || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🛍️ Mock E-Commerce</h1>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home refreshCart={fetchCart} cart={cart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cart}
                refreshCart={fetchCart}
                onCheckout={() => setShowCheckout(true)}
              />
            }
          />
        </Routes>
      </main>

      {showCheckout && (
        <CheckoutModal
          cartItems={cart}
          onClose={() => setShowCheckout(false)}
          refreshCart={fetchCart}
        />
      )}
    </div>
  );
}

export default App;
