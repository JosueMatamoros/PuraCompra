import React, { useContext, useState, useEffect } from 'react';
import DirectionCard from '../card/DirectionCard';
import { AuthContext } from '../../context/AuthContext';
import AddAddressModal from '../modal/AddAddressModal';
import { FaPlus } from "react-icons/fa6";
import { Button } from 'flowbite-react';

export default function UserAddress() {
  const { user, updateAddresses } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddAddress = (newAddress) => {
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    updateAddresses(updatedAddresses);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        <div className="flex items-center justify-center mx-2 my-2">
          <button onClick={handleOpenModal} className="inline-flex items-center justify-center w-8 h-8 text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <FaPlus className="w-4 h-4" />
          </button>
          </div>
        </div>
        <AddAddressModal
          show={isModalOpen}
          onClose={handleCloseModal}
          onAddAddress={handleAddAddress}
        />
      </div>
      );
}
