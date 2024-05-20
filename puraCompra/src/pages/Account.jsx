import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/header/Header';

export default function Account() {
  const { user, logout } = useContext(AuthContext);
  const [selectedView, setSelectedView] = useState('Account');
  const [selectedOption, setSelectedOption] = useState('Personal Information');

  if (!user) {
    return <p>Loading...</p>;
  }

  const renderContent = () => {
    if (selectedView === 'Account') {
      switch (selectedOption) {
        case 'Personal Information':
          return <p>This is your personal information.</p>;
        case 'Address Book':
          return <p>This is your address book.</p>;
        case 'Payment Methods':
          return <p>These are your payment methods.</p>;
        case 'Order History':
          return <p>This is your order history.</p>;
        case 'Wishlist':
          return <p>This is your wishlist.</p>;
        default:
          return null;
      }
    } else if (selectedView === 'Orders') {
      return <p>This is your orders view.</p>;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex justify-between items-center border-b-2 pb-2 px-4">
          <div>
            <h1 className="text-2xl font-bold">Hi <strong>{user.name}</strong></h1>
          </div>
          <div className="flex justify-center space-x-8">
            <button 
              className={`mx-2 text-gray-600 hover:text-black ${selectedView === 'Account' ? 'font-bold' : ''}`}
              onClick={() => setSelectedView('Account')}
            >
              Account
            </button>
            <button 
              className={`mx-2 text-gray-600 hover:text-black ${selectedView === 'Orders' ? 'font-bold' : ''}`}
              onClick={() => setSelectedView('Orders')}
            >
              Orders
            </button>
          </div>
        </div>
        <div className="mt-4 flex">
          {selectedView === 'Account' && (
            <div className="w-1/4">
              <ul className="space-y-2">
                <li 
                  className={`hover:underline cursor-pointer ${selectedOption === 'Personal Information' ? 'font-bold' : ''}`} 
                  onClick={() => setSelectedOption('Personal Information')}
                >
                  Personal Information
                </li>
                <li 
                  className={`hover:underline cursor-pointer ${selectedOption === 'Address Book' ? 'font-bold' : ''}`} 
                  onClick={() => setSelectedOption('Address Book')}
                >
                  Address Book
                </li>
                <li 
                  className={`hover:underline cursor-pointer ${selectedOption === 'Payment Methods' ? 'font-bold' : ''}`} 
                  onClick={() => setSelectedOption('Payment Methods')}
                >
                  Payment Methods
                </li>
                <li 
                  className={`hover:underline cursor-pointer ${selectedOption === 'Order History' ? 'font-bold' : ''}`} 
                  onClick={() => setSelectedOption('Order History')}
                >
                  Order History
                </li>
                <li 
                  className={`hover:underline cursor-pointer ${selectedOption === 'Wishlist' ? 'font-bold' : ''}`} 
                  onClick={() => setSelectedOption('Wishlist')}
                >
                  Wishlist
                </li>
              </ul>
            </div>
          )}
          <div className="w-full md:w-3/4 border-l-2 pl-4">
            <h2 className="text-xl font-semibold">{selectedView}</h2>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}
