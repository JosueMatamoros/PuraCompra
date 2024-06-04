import React, { useEffect, useState } from "react";
import Header from "../header/Header";

export default function AdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [tracking, setTracking] = useState("");

  const fetchShipments = async () => {
    try {
      const response = await fetch("http://localhost:3000/shipments");
      const data = await response.json();
      setShipments(data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateShipmentTracking = async (shipmentId) => {
    try {
      const response = await fetch(`http://localhost:3000/shipments/${shipmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tracking }),
      });
      if (response.ok) {
        await fetchShipments(); // Refresh the shipments list
        setSelectedShipment(null); // Deselect shipment
        setTracking(""); // Clear the tracking input
      } else {
        console.error("Failed to update shipment tracking");
      }
    } catch (error) {
      console.error("Error updating shipment tracking:", error);
    }
  };

  const markShipmentAsDelivered = async (shipmentId) => {
    try {
      const response = await fetch(`http://localhost:3000/shipments/${shipmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: 'DELIVERED' }),
      });
      if (response.ok) {
        await fetchShipments(); // Refresh the shipments list
      } else {
        console.error("Failed to mark shipment as delivered");
      }
    } catch (error) {
      console.error("Error marking shipment as delivered:", error);
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchOrders();
    fetchUsers();
  }, []);

  const getOrderDetails = (orderId) => {
    const order = orders.find(order => order.OrdersID === orderId);
    const user = order ? users.find(user => user.UsersID === order.UsersID) : null;
    return {
      date: order ? new Date(order.date).toLocaleDateString() : 'N/A',
      buyerName: user ? `${user.name} ${user.lastname}` : 'N/A'
    };
  };

  const pendingShipments = shipments.filter(shipment => shipment.state === 'PENDING');
  const inProcessShipments = shipments.filter(shipment => shipment.state === 'IN_PROCESS');
  const deliveredShipments = shipments.filter(shipment => shipment.state === 'DELIVERED');

  const renderTable = (title, shipments, isPending) => (
    <div className="mb-8">
      <h3 className="font-semibold mb-4">{title}</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left">Order ID</th>
            <th className="py-2 text-left">Date</th>
            <th className="py-2 text-left">Buyer Name</th>
            <th className="py-2 text-left">State</th>
            <th className="py-2 text-left">Tracking</th>
            <th className="py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => {
            const { date, buyerName } = getOrderDetails(shipment.OrdersID);
            return (
              <tr key={shipment.ShipmentsID} className="border-t">
                <td className="py-2">{shipment.OrdersID}</td>
                <td className="py-2">{date}</td>
                <td className="py-2">{buyerName}</td>
                <td className="py-2">{shipment.state}</td>
                <td className="py-2">
                  {selectedShipment === shipment.ShipmentsID && isPending ? (
                    <input
                      type="text"
                      value={tracking}
                      onChange={(e) => setTracking(e.target.value)}
                      className="border px-2 py-1"
                    />
                  ) : (
                    shipment.tracking || "N/A"
                  )}
                </td>
                <td className="py-2 flex justify-end gap-2">
                  {isPending ? (
                    selectedShipment === shipment.ShipmentsID ? (
                      <button
                        onClick={() => updateShipmentTracking(shipment.ShipmentsID)}
                        className="bg-blue-500 text-white py-1 px-3 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedShipment(shipment.ShipmentsID);
                          setTracking(shipment.tracking || "");
                        }}
                        className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-full p-2"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )
                  ) : shipment.state === 'IN_PROCESS' ? (
                    <button
                      onClick={() => markShipmentAsDelivered(shipment.ShipmentsID)}
                      className="bg-green-500 text-white py-1 px-3 rounded"
                    >
                      Mark as Delivered
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Header />
      <div className="p-6 bg-white shadow rounded-lg">
        {renderTable("Pending Shipments", pendingShipments, true)}
        {renderTable("In Process Shipments", inProcessShipments, false)}
        {renderTable("Delivered Shipments", deliveredShipments, false)}
      </div>
    </>
  );
}
