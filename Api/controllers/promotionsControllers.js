import Promotions from '../models/promotions.js';

export const createPromotion = async (request, response) => {
  try {
    const { PromotionsID, category, discount, description } = request.body;
    const newPromotion = await Promotions.create({ PromotionsID, category, discount, description });
    response.status(201).json(newPromotion);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getPromotions = async (request, response) => {
  try {
    const promotions = await Promotions.findAll();
    response.status(200).json(promotions);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getPromotionById = async (request, response) => {
  try {
    const { id } = request.params;
    const promotion = await Promotions.findByPk(id);
    if (promotion) {
      response.status(200).json(promotion);
    } else {
      response.status(404).json({ message: `Promotion with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updatePromotion = async (request, response) => {
  try {
    const { id } = request.params;
    const { category, discount, description } = request.body;
    const [updated] = await Promotions.update({ category, discount, description }, {
      where: { PromotionsID: id }
    });
    if (updated) {
      const updatedPromotion = await Promotions.findByPk(id);
      response.status(200).json(updatedPromotion);
    } else {
      response.status(404).json({ message: `Promotion with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const deletePromotion = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await Promotions.destroy({
      where: { PromotionsID: id }
    });
    if (deleted) {
      response.status(204).json({ message: 'Promotion deleted' });
    } else {
      response.status(404).json({ message: `Promotion with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
