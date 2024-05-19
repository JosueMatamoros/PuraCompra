import React from 'react';
import Routing from './routes';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Routing />
      </ProductProvider>
    </AuthProvider>
  );
}


export default App;
