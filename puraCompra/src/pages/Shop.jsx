import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Header from "../components/header/Header";
import axios from "axios";
import { Spinner } from "flowbite-react";
import ScraperCard from "../components/shop/ScraperCard";
import SkeletonCard from "../components/shop/SkeletonCard";
import ShopCarrousel from "../components/shop/ShopCarrousel";
import Footer from "../components/footer/Footer";

export default function Shop() {
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/products/scrap",
        { url }
      );
      setProduct(response.data);
    } catch (error) {
      setError("Error al obtener la información del producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="relative mt-8 mb-8 w-full max-w-md">
          <input
            type="text"
            placeholder="Paste Url"
            className="pl-4 pr-10 py-2 w-full border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
          >
            <FiSearch />
          </button>
        </div>
        <div className="flex items-center justify-center flex-grow mb-8">
          {error && (
            <div className="flex items-center justify-center mt-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          {product ? (
            <ScraperCard name={product.name} price={product.price} imageUrl={product.imageUrl} rating={product.rating} />
          ) : (
            <SkeletonCard />
          )}
        </div>
        <div className="w-full">
          <ShopCarrousel />
        </div>
      </div>
      <Footer />
    </>
  );
}
