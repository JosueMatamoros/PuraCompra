import ProductImages from '../models/productImages.js';

export const getProductImagesByProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const images = await ProductImages.findAll({
            where: { ProductsID: id },
            attributes: ['imageUrl', 'type', 'color', 'colorName'] 
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

export const createProductImage = async (req, res) => {
    try {
      const { productId, type, color, colorName } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }
  
      const newImageUrl = `/assets/products/${req.file.filename}`;
  
      const productImage = await ProductImages.create({
        ProductsID: productId,
        imageUrl: newImageUrl,
        type: type || 0,
        color: color || null,
        colorName: colorName || null,
      });
  
      res.status(201).json(productImage);
    } catch (error) {
      console.error('Error creating product image:', error);
      res.status(500).json({ message: error.message });
    }
  };