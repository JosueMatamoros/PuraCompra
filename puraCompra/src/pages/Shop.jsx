import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Header from '../components/header/Header';
import axios from 'axios';

export default function Shop() {
  const [url, setUrl] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/products/scrap', { url });
      setProduct(response.data);
    } catch (error) {
      setError('Error al obtener la información del producto');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Paste Url"
            className="pl-4 pr-10 py-2 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            size={50}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full">
            <FiSearch />
          </button>
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center mt-4">
          <p>Cargando...</p>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center mt-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {product && (
        <div className="p-4 bg-gray-100 mt-4">
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt={product.name} />
          <p>Price: ${product.price}</p>
        </div>
      )}
    </>
  );
}
