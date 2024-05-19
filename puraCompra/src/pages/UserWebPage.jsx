import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/header/Header'

export default function UserWebPage() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="text-xl font-bold mb-4"> User Account</div>
      <div>
        <p>{user.name}</p>
        <p>{user.lastname}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
    </>
  )
}
