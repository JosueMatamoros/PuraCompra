import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Button,
} from "@mui/material";

export default function OrdersHistory() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [shipments, setShipments] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [detailsVisible, setDetailsVisible] = useState({});

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

  const fetchOrderDetails = async (orderId) => {
    try {
      const detailsResponse = await axios.get(
        `http://localhost:3000/orderdetails/${orderId}`
      );
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        [orderId]: detailsResponse.data,
      }));
      detailsResponse.data.forEach((detail) => {
        fetchProductDetails(detail.ProductID);
      });
    } catch (error) {
      console.error(
        `Error fetching order details for order ${orderId}:`,
        error
      );
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const productResponse = await axios.get(
        `http://localhost:3000/products/${productId}`
      );
      const product = productResponse.data;
      setProductDetails((prevProductDetails) => ({
        ...prevProductDetails,
        [productId]: product,
      }));
    } catch (error) {
      console.error(
        `Error fetching product details for product ${productId}:`,
        error
      );
    }
  };

  const getShipmentState = (orderId) => {
    const shipment = shipments[orderId];
    return shipment ? shipment.state : "No shipment data";
  };

  const formatShipmentState = (state) => {
    if (state === "IN_PROCESS") {
      return "IN PROCESS";
    }
    return state;
  };

  const toggleDetailsVisibility = (orderId) => {
    setDetailsVisible((prevVisibility) => ({
      ...prevVisibility,
      [orderId]: !prevVisibility[orderId],
    }));
    if (!detailsVisible[orderId]) {
      fetchOrderDetails(orderId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {orders.map(
            (order) =>
              getShipmentState(order.OrdersID) === "DELIVERED" && (
                <div
                  key={order.OrdersID}
                  className="p-4 border border-gray-200 rounded shadow-sm flex flex-col"
                >
                  <div className="flex justify-between items-center">
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

                    <div className="flex flex-col justify-center0">
                      <div
                        className={`p-2 font-bold ${
                          getShipmentState(order.OrdersID) === "DELIVERED"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {formatShipmentState(getShipmentState(order.OrdersID))}
                      </div>

                      <button
                        onClick={() => toggleDetailsVisibility(order.OrdersID)}
                        className="p-2 border rounded-full"
                      >
                        {detailsVisible[order.OrdersID] ? "▲" : "▼"}
                      </button>
                    </div>
                  </div>

                  {detailsVisible[order.OrdersID] &&
                    orderDetails[order.OrdersID] && (
                      <div className="mt-4 ">
                        <h3 className="text-lg font-semibold ">
                          Order Details:
                        </h3>
                        <Table
                          sx={{ minWidth: 650 }}
                          aria-label="simple table"
                          className="border rounded-lg"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell align="left" className="font-bold">
                                Image
                              </TableCell>
                              <TableCell align="left" className="font-bold">
                                Name
                              </TableCell>
                              <TableCell align="left" className="font-bold">
                                Price
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orderDetails[order.OrdersID].map((detail) => (
                              <TableRow key={detail.ProductID}>
                                <TableCell align="left">
                                  {productDetails[detail.ProductID] && (
                                    <Box className="w-16 h-16 overflow-hidden flex justify-center items-center">
                                      <img
                                        src={`http://localhost:3000${
                                          productDetails[detail.ProductID]
                                            .imageUrl
                                        }`}
                                        alt={
                                          productDetails[detail.ProductID].name
                                        }
                                        className="object-contain max-h-full"
                                      />
                                    </Box>
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {productDetails[detail.ProductID] &&
                                    productDetails[detail.ProductID].name}
                                </TableCell>
                                <TableCell align="left">
                                  {productDetails[detail.ProductID] &&
                                    `$${productDetails[
                                      detail.ProductID
                                    ].price.toFixed(2)}`}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
