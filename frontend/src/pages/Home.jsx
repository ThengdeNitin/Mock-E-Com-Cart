import React from "react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

const Home = ({ refreshCart, cart }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🛍️ Products</h2>
        <button
          onClick={() => navigate("/cart")}
          className="text-indigo-600 font-bold hover:text-indigo-800 transition"
        >
          🛒 Cart ({cart?.length || 0})
        </button>
      </div>

      <ProductGrid refreshCart={refreshCart} />
    </div>
  );
};

export default Home;
