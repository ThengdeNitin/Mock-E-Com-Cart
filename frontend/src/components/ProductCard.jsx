import React from 'react';
import { addToCart } from '../api/api';

const ProductCard = ({ product, refreshCart }) => {
  const handleAdd = async () => {
    await addToCart(product._id, 1);
    refreshCart();
  };

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <button
        onClick={handleAdd}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
