import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user.UsersID) {
      fetchOrders(user.UsersID);
    }
  }, [user]);

  const fetchOrders = async (userId) => {
    try {
        console.log('User ID:', userId);
      const response = await axios.get(
        `http://localhost:3000/orders/${user.UsersID}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col p-4">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {orders.map((order) => (
              <div
                key={order.OrdersID} // Asegúrate de usar OrdersID como clave
                className="p-4 border border-gray-200 rounded shadow-sm"
              >
                <h2 className="text-xl font-semibold">Order #{order.OrdersID}</h2>
                <p>
                  Order Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p>Total Amount: ${order.price + order.taxes}</p> {/* Ajusta según tu estructura de datos */}
                <p>Address: {order.address}</p> {/* Agrega cualquier otro detalle que necesites */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
