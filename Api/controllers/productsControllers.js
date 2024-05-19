import Products from '../models/products.js';
import Sellers from '../models/sellers.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: [
                {
                    model: Sellers,
                    attributes: ['name'], // Solo el nombre del vendedor
                },
            ],
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { Sellers, name, stock, description, price, imageUrl } = req.body;
        const newProduct = await Products.create({ Sellers, name, stock, description, price, imageUrl });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id, {
            include: [
                {
                    model: Sellers,
                    attributes: ['name'],
                },
            ],
        });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { Sellers, name, stock, description, price, imageUrl } = req.body;
        const [updated] = await Products.update({ Sellers, name, stock, description, price, imageUrl }, {
            where: { ProductsID: id }
        });
        if (updated) {
            const updatedProduct = await Products.findByPk(id, {
                include: [
                    {
                        model: Sellers,
                        attributes: ['name'],
                    },
                ],
            });
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Products.destroy({
            where: { ProductsID: id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
