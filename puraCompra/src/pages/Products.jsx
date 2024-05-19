import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductsCarrousel from '../components/carrousel/ProductsCarrousel';

const Products = () => {
  const { products } = useContext(ProductContext);

  // Agrupar productos por Sellers
  const groupedProducts = products.reduce((acc, product) => {
    const sellerName = product.Seller.name;
    if (!acc[sellerName]) {
      acc[sellerName] = [];
    }
    acc[sellerName].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      {Object.keys(groupedProducts).map(sellerName => (
        <div key={sellerName} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{sellerName}</h2>
          <ProductsCarrousel products={groupedProducts[sellerName]} />
        </div>
      ))}
    </div>
  );
};

export default Products;
