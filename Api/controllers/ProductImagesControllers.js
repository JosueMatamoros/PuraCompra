import ProductImages from '../models/productImages.js';

export const getProductImagesByProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const images = await ProductImages.findAll({
            where: { ProductsID: id },
            attributes: ['imageUrl', 'type', 'color'] 
        });
        if (images.length > 0) {
            res.json(images);
        } else {
            res.status(404).json({ message: 'No images found for this product' });
        }
    } catch (error) {
        console.error('Error fetching product images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
