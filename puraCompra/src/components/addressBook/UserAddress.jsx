import React, { useContext, useState, useEffect } from 'react';
import DirectionCard from '../card/DirectionCard';
import { AuthContext } from '../../context/AuthContext';

export default function UserAddress() {
  const { user } = useContext(AuthContext);
  const [addresses, setAddresses] = useState(user ? user.Addresses : []);

  useEffect(() => {
    // Actualiza el estado de addresses cuando el usuario cambia
    if (user) {
      setAddresses(user.Addresses);
    }
  }, [user]);

  const updateAddress = (addressID, newDirection) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.AddressID === addressID ? { ...address, address: newDirection } : address
      )
    );
  };

  return (
    <div className='flex flex-col items-start'>
      <div className='flex flex-row'>
        {addresses && addresses.map((address, index) => (
          <DirectionCard 
            key={address.AddressID} 
            directionNumber={`Direction ${index + 1}`} 
            direction={address.address}
            addressID={address.AddressID}
            updateAddress={updateAddress}
          />
        ))}
      </div>
    </div>
  );
}
