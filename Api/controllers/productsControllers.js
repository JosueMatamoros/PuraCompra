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
      const { seller, name, stock, description, price } = req.body;
      const mainImage = req.file ? `/assets/products/${req.file.filename}` : '';
  
      const newProduct = await Products.create({
        Sellers: seller,
        name,
        stock,
        description,
        price,
        imageUrl: mainImage,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
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

export const updateProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        const [updated] = await Products.update({ stock }, {
            where: { ProductsID: id }
        });
        if (updated) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const countProducts = async (req, res) => {
    try {
      const count = await Products.count();
  
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
