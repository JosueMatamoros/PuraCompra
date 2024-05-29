import React, { useState, useContext } from 'react';
import { Modal, Button, Toast } from 'flowbite-react';
import axios from 'axios';
import { HiCheck } from 'react-icons/hi';
import photo from '../../assets/address/addressBackground.png';
import { AuthContext } from '../../context/AuthContext';

export default function DirectionCard({ directionNumber, direction, addressID, onUpdate, onDelete }) {
    const { user } = useContext(AuthContext);
    const [newAddress, setNewAddress] = useState(direction);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        if (!user || !user.UsersID) {
            console.error('No user is logged in or user ID is missing');
            return;
        }
        onUpdate(newAddress);
        try {
            const response = await axios.put(`http://localhost:3000/addresses/${addressID}`, {
                address: newAddress,
                userID: user.UsersID,
            });
            if (response.status === 200) {
                setIsModalOpen(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } else {
                console.error('Failed to update address');
            }
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/addresses/${addressID}`);
            if (response.status === 200) {
                onDelete(addressID);
            } else {
                console.error('Failed to delete address');
            }
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <div className="flex flex-col justify-between relative max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2 my-2">
            <div>
                <a href="#">
                    <img className="object-contain" src={photo} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{directionNumber}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{direction}</p>
                </div>
            </div>
            <div className="p-5">
                <button onClick={handleOpenModal} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Edit
                </button>
                <button onClick={handleDelete} className="inline-flex items-center px-3 py-2 ml-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Delete
                </button>
            </div>
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <Modal.Header>
                    Edit Address
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <label htmlFor="direction" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Direction
                        </label>
                        <textarea
                            type="text"
                            id="direction"
                            rows="4"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
            {showToast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">Success! Address updated.</div>
                        <Toast.Toggle />
                    </Toast>
                </div>
            )}
        </div>
    );
}
