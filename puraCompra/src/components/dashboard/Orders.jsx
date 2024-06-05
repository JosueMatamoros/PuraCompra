import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [shipments, setShipments] = useState({});

  useEffect(() => {
    if (user && user.UsersID) {
      fetchOrders(user.UsersID);
    }
  }, [user]);

  const fetchOrders = async (userId) => {
    try {
      const ordersResponse = await axios.get(
        `http://localhost:3000/orders/${userId}`
      );
      setOrders(ordersResponse.data);
      // Fetch shipments for each order
      ordersResponse.data.forEach((order) => {
        fetchShipmentByOrderId(order.OrdersID);
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchShipmentByOrderId = async (orderId) => {
    try {
      const shipmentResponse = await axios.get(
        `http://localhost:3000/shipments/shipments/${orderId}`
      );
      setShipments((prevShipments) => ({
        ...prevShipments,
        [orderId]: shipmentResponse.data,
      }));
    } catch (error) {
      console.error(`Error fetching shipment for order ${orderId}:`, error);
    }
  };

  const getShipmentState = (orderId) => {
    const shipment = shipments[orderId];
    return shipment ? shipment.state : "No shipment data";
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {orders.map(
            (order) =>
              getShipmentState(order.OrdersID) !== "DELIVERED" && (
                <div
                  key={order.OrdersID}
                  className="p-4 border border-gray-200 rounded shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-semibold">
                      Order #{order.OrdersID}
                    </h2>
                    <p>
                      Order Date: {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p>Total Amount: ${order.price + order.taxes}</p>
                    <p>Address: {order.address}</p>
                  </div>

                  <div
                    className={`p-2 font-bold ${
                      getShipmentState(order.OrdersID) === "IN_PROCESS"
                        ? "text-green-600"
                        : ""
                    }`}
                  >
                    {getShipmentState(order.OrdersID)}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
