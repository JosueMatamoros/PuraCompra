import Products from '../models/products.js';

export const createProduct = async (request, response) => {
    try {
        const { ProductsID, SellersID, name, stock, description, price, image_url } = request.body;
        const newProduct = await Products.create({ ProductsID, SellersID, name, stock, description, price, image_url });
        response.status(201).json(newProduct);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getProducts = async (request, response) => {
    try {
        const products = await Products.findAll();
        response.json(products);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getProductById = async (request, response) => {
    try {
        const product = await Products.findByPk(request.params.id);
        if (product) {
            response.json(product);
        } else {
            response.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (request, response) => {
    try {
        const { id } = request.params;
        const { SellersID, name, stock, description, price, image_url } = request.body;
        const [updated] = await Products.update({ SellersID, name, stock, description, price, image_url }, {
            where: { ProductsID: id }
        });
        if (updated) {
            const updatedProduct = await Products.findByPk(id);
            response.status(200).json(updatedProduct);
        } else {
            response.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (request, response) => {
    try {
        const { id } = request.params;
        const deleted = await Products.destroy({
            where: { ProductsID: id }
        });
        if (deleted) {
            response.status(204).end();
        } else {
            response.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
