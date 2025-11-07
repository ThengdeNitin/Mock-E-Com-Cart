import React, { useState } from 'react';
import { addToCart } from '../api/api';

const ProductCard = ({ product, refreshCart }) => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await addToCart(product._id, 1);
      await refreshCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-48 border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-all">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-sm font-semibold text-center">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">${product.price}</p>
      <button
        onClick={handleAdd}
        disabled={loading}
        className={`w-full text-white text-sm py-1.5 rounded transition 
          ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
