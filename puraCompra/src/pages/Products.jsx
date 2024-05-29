import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductsCarrousel from '../components/carrousel/ProductsCarrousel';
import Header from '../components/header/Header';


const Products = () => {
  const { products } = useContext(ProductContext);
  // Agrupar productos por vendedor
  const groupedProducts = products.reduce((acc, product) => {
    const sellerName = product.Seller.name; // Ajusta según tu estructura de datos
    if (!acc[sellerName]) {
      acc[sellerName] = [];
    }
    acc[sellerName].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto ">
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