import React, { useContext, useState, useEffect } from "react";
import DirectionCard from "../card/DirectionCard";
import { AuthContext } from "../../context/AuthContext";
import AddAddressModal from "../modal/AddAddressModal";
import { FaPlus } from "react-icons/fa";

export default function UserAddress() {
  const { user, updateAddresses, updateUser } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.Addresses) {
      setAddresses(user.Addresses);
    }
  }, [user]);

  const handleUpdateAddress = (newAddress, index) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, address: newAddress } : address
    );
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = (newAddress) => {
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    const updatedUser = { ...user, Addresses: updatedAddresses };
    updateUser(updatedUser);
    //updateAddresses(updatedAddresses);
  };

  const handleDeleteAddress = (addressID) => {
    const updatedAddresses = addresses.filter(address => address.AddressID !== addressID);
    setAddresses(updatedAddresses);
    updateAddresses(updatedAddresses);
    const updatedUser = { ...user, Addresses: updatedAddresses };
    updateUser(updatedUser);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Función para dividir las direcciones en filas de tres columnas
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const rows = chunkArray(addresses, 3);

  return (
    <div className="flex flex-col items-start">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row mb-4">
          {row.map((address, index) => (
            <DirectionCard
              key={address.AddressID}
              directionNumber={`Direction ${index + 1 + rowIndex * 3}`}
              direction={address.address}
              addressID={address.AddressID}
              onUpdate={(newAddress) => handleUpdateAddress(newAddress, index + rowIndex * 3)}
              onDelete={handleDeleteAddress}
            />
          ))}
          {rowIndex === rows.length - 1 && row.length < 3 && (
            <div
              className="flex items-center justify-center w-full h-full border rounded-lg border-gray-300 mx-2 my-2"
              style={{ width: "18rem", height: "27rem" }}
            >
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <FaPlus className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      ))}
      {addresses.length === 0 && (
        <div className="flex flex-row mb-4">
          <div
            className="flex items-center justify-center w-full h-full border rounded-lg border-gray-300 mx-2 my-2"
            style={{ width: "18rem", height: "27rem" }}
          >
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <FaPlus className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      <AddAddressModal
        show={isModalOpen}
        onClose={handleCloseModal}
        onAddAddress={handleAddAddress}
      />
    </div>
  );
}
