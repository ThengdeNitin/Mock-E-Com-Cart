import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Home = ({ refreshCart }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🛒 Products</h2>
      <ProductGrid refreshCart={refreshCart} />
    </div>
  );
};

export default Home;
