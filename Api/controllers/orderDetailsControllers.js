import OrderDetails from "../models/orderDetails.js";

// Create a new order detail
export const createOrderDetail = async (request, response) => {
    try {
    const { OrdersID, ProductID } = request.body;
    const newOrderDetail = await OrderDetails.create({ OrdersID, ProductID });
    response.status(201).json(newOrderDetail);
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};

// Get all order details
export const getOrderDetails = async (request, response) => {
    try {
    const orderDetails = await OrderDetails.findAll();
    response.json(orderDetails);
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};

// Get order detail by ID
export const getOrderDetailById = async (request, response) => {
    try {
    const orderDetail = await OrderDetails.findByPk(request.params.id);
    if (orderDetail) {
        response.json(orderDetail);
    } else {
        response.status(404).json({ message: "Order detail not found" });
    }
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};

// Update an order detail
export const updateOrderDetail = async (request, response) => {
    try {
    const { id } = request.params;
    const { OrdersID, ProductID } = request.body;
    const [updated] = await OrderDetails.update({ OrdersID, ProductID }, {
        where: { OrdersID: id }
    });
    if (updated) {
        const updatedOrderDetail = await OrderDetails.findByPk(id);
        response.status(200).json(updatedOrderDetail);
    } else {
        response.status(404).json({ message: "Order detail not found" });
    }
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};

// Delete an order detail
export const deleteOrderDetail = async (request, response) => {
    try {
    const { id } = request.params;
    const deleted = await OrderDetails.destroy({
        where: { OrdersID: id }
    });
    if (deleted) {
        response.status(204).send();
    } else {
        response.status(404).json({ message: "Order detail not found" });
    }
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};