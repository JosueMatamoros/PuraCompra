import Sellers from '../models/sellers.js';

export const createSeller = async (request, response) => {
  try {
    const { SellersID, name, url, type } = request.body;
    const newSeller = await Sellers.create({ SellersID, name, url, type });
    response.status(201).json(newSeller);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getSellers = async (request, response) => {
  try {
    const sellers = await Sellers.findAll();
    response.status(200).json(sellers);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getSellerById = async (request, response) => {
  try {
    const { id } = request.params;
    const seller = await Sellers.findByPk(id);
    if (seller) {
      response.status(200).json(seller);
    } else {
      response.status(404).json({ message: `Seller with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateSeller = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, url, type } = request.body; // Actualizar solo los campos específicos

    const [updated] = await Sellers.update({ name, url, type }, {
      where: { SellersID: id }
    });

    if (updated) {
      const updatedSeller = await Sellers.findByPk(id);
      response.status(200).json(updatedSeller);
    } else {
      response.status(404).json({ message: `Seller with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const deleteSeller = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await Sellers.destroy({
      where: { SellersID: id }
    });
    if (deleted) {
      response.status(204).json({ message: 'Seller deleted' });
    } else {
      response.status(404).json({ message: `Seller with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
