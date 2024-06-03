import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { MdModeEditOutline, MdOutlineDelete } from "react-icons/md";
import QuantityModal from "../components/modal/QuantityModal";
import { Drawer } from "flowbite-react";
import { TiShoppingCart } from "react-icons/ti";

export default function ShoppingCart({ isCartOpen, setIsCartOpen }) {
  const { cartItems, fetchCartItems, updateCartItemQuantity, removeCartItem } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (user && user.UsersID) {
      fetchCartItems(user.UsersID);
    }
  }, [fetchCartItems, user]);

  const handleOpenModal = (item, deleteMode = false) => {
    setSelectedItem(item);
    setIsDelete(deleteMode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
    setIsDelete(false);
  };

  const handleUpdateQuantity = (quantity) => {
    if (user && user.UsersID && selectedItem) {
      updateCartItemQuantity(user.UsersID, selectedItem.ProductID, quantity);
      handleCloseModal();
    }
  };

  const handleDeleteItem = () => {
    if (selectedItem && selectedItem.ProductID) {
      removeCartItem(user.UsersID, selectedItem.ProductID);
      handleCloseModal();
    }
  };

  const handleClose = () => setIsCartOpen(false);

  return (
    <Drawer open={isCartOpen} onClose={handleClose} position="right" className="max-h-screen">
      <Drawer.Header title="Shopping Cart" titleIcon={TiShoppingCart}/>
      
      <Drawer.Items>
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto p-4">
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
                          className="w-20 h-20 object-contain mr-4"
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
                              className="ml-2"
                              onClick={() => handleOpenModal(item)}
                            >
                              <MdModeEditOutline />
                            </button>
                            <button
                              className="ml-2"
                              onClick={() => handleOpenModal(item, true)}
                            >
                              <MdOutlineDelete />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="p-4 border-t">
            <Link to="/payment">
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">
              Complete Purchase
              </button>
            </Link>
          </div>
        </div>
        {isModalOpen && selectedItem && (
          <QuantityModal
            item={selectedItem}
            onClose={handleCloseModal}
            onUpdateQuantity={handleUpdateQuantity}
            onDeleteItem={handleDeleteItem}
            isDelete={isDelete}
          />
        )}
      </Drawer.Items>
    </Drawer>
  );
}
