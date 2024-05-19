import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Products = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.ProductsID} className="border p-4 rounded shadow">
            <img 
              src={`http://localhost:3000${product.image_url}`} 
              alt={product.name} 
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
