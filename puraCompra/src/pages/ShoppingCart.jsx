import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext"; // Ajusta el path si es necesario
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function ShoppingCart() {
  const { cartItems, fetchCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.UsersID) {
      const userId = user.UsersID;
      fetchCartItems(userId);
    }
  }, [fetchCartItems, user]);

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
                      <p>Quantity: {item.quantity}</p>
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
    </>
  );
}
