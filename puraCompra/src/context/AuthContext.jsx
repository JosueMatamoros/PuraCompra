import React, { createContext, useState, useEffect } from 'react';
import sessionstorage from 'sessionstorage';

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
      console.log('User data after login:', data.user); // Verifica los datos del usuario
      setUser(data.user);
      sessionstorage.setItem('user', JSON.stringify(data.user)); // Guarda el usuario en sessionStorage
      console.log('Inicio de sesión exitoso:', data);
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const register = async (name, lastname, phone, email, password, gender, country) => {
    console.log(country);
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lastname, phoneNumber: phone, mail: email, password, gender, country}),
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

  const getUserDetails = async () => {
    try {
      const storedUser = JSON.parse(sessionstorage.getItem('user'));
      if (storedUser && storedUser.UsersID) {
        const response = await fetch(`http://localhost:3000/users/profile/${storedUser.UsersID}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          sessionstorage.setItem('user', JSON.stringify(data));
        } else {
          console.error('Error al obtener detalles del usuario:', data.message);
        }
      }
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    sessionstorage.removeItem('user'); // Elimina el usuario de sessionStorage
  };

  const updateAddresses = (newAddresses) => {
    if (user) {
      const updatedUser = { ...user, Addresses: newAddresses };
      setUser(updatedUser);
      sessionstorage.setItem('user', JSON.stringify(updatedUser)); // Actualiza el usuario en sessionStorage
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    sessionstorage.setItem('user', JSON.stringify(updatedUser)); // Actualiza el usuario en sessionStorage
  };

  // Comprueba el token almacenado cuando la app se carga
  useEffect(() => {
    const storedUser = sessionstorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateAddresses, getUserDetails, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };