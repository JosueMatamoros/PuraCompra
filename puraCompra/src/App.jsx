import React from 'react';
import Routing from './routes';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
    <AuthProvider>
      <ProductProvider>
        <Routing />
      </ProductProvider>
    </AuthProvider>
    </CartProvider>
  );
}


export default App;
