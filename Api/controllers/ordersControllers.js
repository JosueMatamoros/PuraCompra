import Orders from '../models/orders.js'

export const createOrder = async (request, response) => {
    try {
        const { OrdersID, UsersID, date, address, price, taxes } = request.body;
        const newOrder = await Orders.create({ UsersID, date, address, price, taxes });
        response.status(201).json(newOrder);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
    }

export const getOrders = async (request, response) => {
    try {
        const orders = await Orders.findAll();
        response.json(orders);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
    };


export const getOrderById = async (request, response) => {
    try {
        const order = await Orders.findByPk(request.params.id);
        if (order) {
            response.json(order);
        } else {
            response.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
    }

export const updateOrder = async (request, response) => {
    try {
        const { id } = request.params;
        const { UsersID, date, address, price, taxes } = request.body;
        const [updated] = await Orders.update({ date, address, price, taxes }, {
            where: { OrdersID: id }
        });
        if (updated) {
            const updatedOrder = await Orders.findByPk(id);
            response.status(200).json(updatedOrder);
        } else {
            response.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
    }

export const deleteOrder = async (request, response) => {
    try {
        const { id } = request.params;
        const deleted = await Orders.destroy({
            where: { OrdersID: id }
        });
        if (deleted) {
            response.status(204).end();
        } else {
            response.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
    }