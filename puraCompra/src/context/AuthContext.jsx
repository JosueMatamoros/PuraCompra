import React, { createContext, useState, useEffect } from 'react';

// Crea el contexto
const AuthContext = createContext();

// Crea el proveedor del contexto
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail: email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Error al iniciar sesión:', data.message);
        return false;
      }
      setUser(data.user);
      localStorage.setItem('token', data.token);
      console.log('Inicio de sesión exitoso:', data);
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const register = async (name, lastname, phone, email, password) => {
    try {
      console.log(phone)
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lastname, phoneNumber: phone, mail: email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Error al registrar usuario:', data.message);
        return false;
      }
      console.log('Usuario registrado:', data);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Comprueba el token almacenado cuando la app se carga
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías hacer una solicitud para verificar el token y obtener el usuario
      setUser({ email: 'user@example.com' }); // Este es un ejemplo, deberías obtener el usuario real
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
