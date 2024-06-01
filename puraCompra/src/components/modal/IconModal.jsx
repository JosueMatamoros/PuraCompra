import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import axios from 'axios';

export default function IconModal({ isOpen, onClose, onUpload, userId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      try {
        const response = await axios.post(`http://localhost:3000/upload/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        onUpload(response.data.filePath); // Ruta del archivo en el servidor
        setMessage('File uploaded successfully!');
        setTimeout(() => {
          setMessage('');
          onClose();
        }, 3000); // Cierra el modal después de 3 segundos
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('Error uploading file.');
      }
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Upload Profile Picture</Modal.Header>
      <Modal.Body>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpload} className="bg-blue-700 hover:bg-blue-800 focus:ring-blue-500">
          Upload
        </Button>
        <button onClick={onClose} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent rounded-lg hover:bg-transparent focus:ring-transparent">
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
