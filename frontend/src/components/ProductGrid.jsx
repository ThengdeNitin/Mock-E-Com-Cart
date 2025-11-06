import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import ProductCard from './ProductCard';

const ProductGrid = ({ refreshCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} refreshCart={refreshCart} />
      ))}
    </div>
  );
};

export default ProductGrid;
