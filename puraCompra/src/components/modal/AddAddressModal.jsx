import React, { useState, useContext } from 'react';
import { Modal, Button, Toast } from 'flowbite-react';
import { AuthContext } from '../../context/AuthContext';
import { HiCheck } from 'react-icons/hi';
import axios from 'axios';

export default function AddAddressModal({ show, onClose, onAddAddress }) {
  const { user } = useContext(AuthContext);
  const [newAddress, setNewAddress] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSave = async () => {
    if (!user || !user.UsersID) {
      console.error('No user is logged in or user ID is missing');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/addresses', {
        address: newAddress,
        UsersID: user.UsersID, // Asegurarse de que el UserID se pasa correctamente
      });
      if (response.status === 201) {
        onAddAddress(response.data);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        onClose();
      } else {
        console.error('Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>
          Add New Address
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <label htmlFor="new-address" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Address
            </label>
            <textarea
              id="new-address"
              rows="4"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Success! Address added.</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
    </>
  );
}
