import React, { useState } from 'react';
import SignIn from './SignIn';
import Login from './Login';

export default function RegisterAccount() {
  const [activeForm, setActiveForm] = useState('login');

  // Función para determinar el mensaje de bienvenida según el formulario activo
  const welcomeMessage = () => {
    if (activeForm === 'login') {
      return (
        <>
          Already have an account with us? <br /> Sign in to continue enjoying our services.
        </>
      );
    } else {
      return (
        <>
          Create your account and discover all we have to offer!
        </>
      );
    }
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-gray-100">
      {/* Panel dinámico que se ajusta según el formulario activo */}
      <div className={`transition-all ease-in-out duration-700 flex flex-col items-center justify-center p-10 text-white ${activeForm === 'login' ? 'bg-black w-2/3' : 'bg-black w-1/3'}`}>
        <h1 className="text-4xl font-bold mb-4">{activeForm === 'login' ? 'Welcome back!' : 'Create Account'}</h1>
        <p className="mb-4 text-lg text-center">{welcomeMessage()}</p>
        <button
          className="py-2 px-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition duration-300"
          onClick={() => setActiveForm(activeForm === 'login' ? 'signin' : 'login')}
        >
          {activeForm === 'login' ? 'Sign In' : 'Login'}
        </button>
      </div>
      
      {/* Panel para el Formulario actual */}
      <div className="w-2/3 flex items-center justify-center">
        {activeForm === 'login' ? <Login /> : <SignIn setActiveForm={setActiveForm} />}
      </div>
    </div>
  );
}
