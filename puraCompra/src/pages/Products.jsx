import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductsCarrousel from '../components/Carrousel/ProductsCarrousel'
import Header from '../components/header/Header';
const Products = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
    
      <div className="container mx-auto p-4">
        {Object.keys(groupedProducts).map((sellerName, index) => (
          <div key={sellerName} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sellerName}</h2>
            <ProductsCarrousel products={groupedProducts[sellerName]} carrouselId={index} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Products;
