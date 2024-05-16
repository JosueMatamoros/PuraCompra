import React, { useState } from 'react';
import SignIn from './SignIn';
import Login from './Login';

export default function RegisterAccount() {
  const [activeForm, setActiveForm] = useState('login'); // 'login' o 'signin'

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-gray-100">
      {/* Panel dinámico que se ajusta según el formulario activo */}
      <div className={`transition-all ease-in-out duration-700 flex flex-col items-center justify-center p-10 text-white ${activeForm === 'signin' ? 'bg-orange-500 w-1/3' : 'bg-orange-500 w-2/3'}`}>
        <h1 className="text-4xl font-bold mb-4">{activeForm === 'login' ? 'Welcome Back!' : 'Create Account'}</h1>
        <button
          className="py-2 px-4 bg-white text-orange-500 font-semibold rounded hover:bg-gray-100 transition duration-300"
          onClick={() => setActiveForm(activeForm === 'login' ? 'signin' : 'login')}
        >
          {activeForm === 'login' ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
      
      {/* Panel para el Formulario actual */}
      <div className="w-2/3 flex items-center justify-center">
        {activeForm === 'login' ? <Login /> : <SignIn />}
      </div>
    </div>
  );
}
