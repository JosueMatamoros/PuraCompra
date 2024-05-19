import React from 'react';
import Routing from './routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </>
  );
}

export default App;
