import React, { useContext, useState, useEffect } from 'react';
import DirectionCard from '../card/DirectionCard';
import { AuthContext } from '../../context/AuthContext';

export default function UserAddress() {
  const { user, updateAddresses } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (user) {
      setAddresses(user.Addresses || []);
    }
  }, [user]);

  const handleUpdateAddress = (newAddress, index) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, address: newAddress } : address
    );
    setAddresses(updatedAddresses);
    updateAddresses(updatedAddresses);
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
            onUpdate={(newAddress) => handleUpdateAddress(newAddress, index)}
          />
        ))}
      </div>
    </div>
  );
}
