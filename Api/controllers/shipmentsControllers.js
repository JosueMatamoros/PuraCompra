import Shipments from '../models/shipments.js';

export const createShipment = async (request, response) => {
  try {
    const { OrdersID, date, price, totalPrice, state } = request.body;
    const newShipment = await Shipments.create({ OrdersID, date: date || new Date(), price, totalPrice, state });
    response.status(201).json(newShipment);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getShipments = async (request, response) => {
  try {
    const shipments = await Shipments.findAll();
    response.status(200).json(shipments);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getShipmentById = async (request, response) => {
  try {
    const { id } = request.params;
    const shipment = await Shipments.findByPk(id);
    if (shipment) {
      response.status(200).json(shipment);
    } else {
      response.status(404).json({ message: `Shipment with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateShipment = async (request, response) => {
  try {
    const { id } = request.params;
    const { tracking, state } = request.body;

    let updateData = {};
    if (tracking !== undefined) {
      updateData.tracking = tracking;
      updateData.state = 'IN_PROCESS';
    } else if (state === 'DELIVED') {
      updateData.state = 'DELIVED';
    } else {
      return response.status(400).json({ message: "Invalid update request" });
    }

    const [updated] = await Shipments.update(updateData, {
      where: { ShipmentsID: id }
    });

    if (updated) {
      const updatedShipment = await Shipments.findByPk(id);
      response.status(200).json(updatedShipment);
    } else {
      response.status(404).json({ message: `Shipment with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const deleteShipment = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await Shipments.destroy({
      where: { ShipmentsID: id }
    });
    if (deleted) {
      response.status(204).json({ message: 'Shipment deleted' });
    } else {
      response.status(404).json({ message: `Shipment with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const countShipmentsByState = async (req, res) => {
  const { state } = req.params;
  try {
    const count = await Shipments.count({
      where: {
        state: state,
      },
    });

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
