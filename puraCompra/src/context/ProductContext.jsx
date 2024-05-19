import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crea el contexto
const ProductContext = createContext();

// Crea el proveedor del contexto
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Función para obtener los productos
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Llama a fetchProducts cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
