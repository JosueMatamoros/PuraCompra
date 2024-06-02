import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext"; // Ajusta el path si es necesario
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import QuantityModal from "../components/modal/QuantityModal"; // Asegúrate de ajustar el path

export default function ShoppingCart() {
  const { cartItems, fetchCartItems, updateCartItemQuantity, removeCartItem } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (user && user.UsersID) {
      fetchCartItems(user.UsersID);
    }
  }, [fetchCartItems, user]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleUpdateQuantity = (quantity) => {
    if (user && user.UsersID && selectedItem) {
      console.log(
        "Updating quantity:",
        quantity,
        selectedItem.ProductID,
        user.UsersID
      );
      updateCartItemQuantity(user.UsersID, selectedItem.ProductID, quantity); // Aquí cambiamos CartItemID a ProductID
      handleCloseModal();
    }
  };

  const handleDeleteItem = () => {
    if (selectedItem && selectedItem.ProductID) {
      removeCartItem(user.UsersID, selectedItem.ProductID); // Aquí pasamos userID y ProductID
      handleCloseModal();
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.CartItemID} className="mb-4">
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:3000${item.product.imageUrl}`}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.product.name}
                      </h2>
                      <p className="text-gray-700">
                        {item.product.description}
                      </p>
                      <p className="text-gray-900 font-bold">
                        ${item.product.price}
                      </p>
                      <div className="flex items-center">
                        <p>Quantity: {item.quantity}</p>
                        <button
                          className="ml-2 text-blue-500"
                          onClick={() => handleOpenModal(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="ml-2 text-red-500"
                          onClick={() => {
                            setSelectedItem(item);
                            handleDeleteItem();
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/payment" className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Pagar
              </button>
            </Link>
          </>
        )}
      </div>
      <Footer />
      {isModalOpen && selectedItem && (
        <QuantityModal
          item={selectedItem}
          onClose={handleCloseModal}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </>
  );
}
