import ProductPromotions from "../models/productPromotions.js";

// Create a new product promotion
export const createProductPromotion = async (request, response) => {
    try {
    const { ProductsID, PromotionsID } = request.body;
    const newProductPromotion = await ProductPromotions.create({ ProductsID, PromotionsID });
    response.status(201).json(newProductPromotion);
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};

// Get all product promotions
export const getProductPromotions = async (request, response) => {
    try {
    const productPromotions = await ProductPromotions.findAll();
    response.json(productPromotions);
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};

// Get product promotion by ID
export const getProductPromotionById = async (request, response) => {
    try {
    const productPromotion = await ProductPromotions.findByPk(request.params.id);
    if (productPromotion) {
        response.json(productPromotion);
    } else {
        response.status(404).json({ message: "Product promotion not found" });
    }
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};

// Update a product promotion
export const updateProductPromotion = async (request, response) => {
    try {
    const { id } = request.params;
    const { ProductsID, PromotionsID } = request.body;
    const [updated] = await ProductPromotions.update({ ProductsID, PromotionsID }, {
        where: { ProductsID: id }
    });
    if (updated) {
        const updatedProductPromotion = await ProductPromotions.findByPk(id);
        response.status(200).json(updatedProductPromotion);
    } else {
        response.status(404).json({ message: "Product promotion not found" });
    }
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};

// Delete a product promotion
export const deleteProductPromotion = async (request, response) => {
    try {
    const { id } = request.params;
    const deleted = await ProductPromotions.destroy({
        where: { ProductsID: id }
    });
    if (deleted) {
        response.status(204).send();
    } else {
        response.status(404).json({ message: "Product promotion not found" });
    }
    } catch (error) {
    response.status(500).json({ message: error.message });
    }
};
