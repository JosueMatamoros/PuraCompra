import CartItems from "../models/cartItems.js";
import Products from "../models/products.js";

export const addCartItem = async (request, response) => {
  const { userId, productId, quantity } = request.body;

  try {
    const cartItem = await CartItems.findOne({ where: { UsersID: userId, ProductID: productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await CartItems.create({ UsersID: userId, ProductID: productId, quantity });
    }
    response.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    response.status(500).json({ error: 'Error al añadir el producto al carrito' });
  }
};

export const getCartItems = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await CartItems.findAll({
      where: { UsersID: userId },
      include: [
        {
          model: Products,
          as: 'product',  // Utiliza el alias definido en la asociación
          attributes: ['ProductsID', 'name', 'price', 'description', 'imageUrl']
        }
      ]
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error al obtener los productos del carrito:', error);
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
};

export const clearCart = async (request, response) => {
  const { userId } = request.body;
  try {
    await CartItems.destroy({ where: { UsersID: userId } });
    response.status(200).json({ message: 'Todos los productos han sido eliminados del carrito' });
  } catch (error) {
    response.status(500).json({ error: 'Error al eliminar los productos del carrito' });
  }
};

export const removeCartItem = async (request, response) => {
  const { userId, productId } = request.body;
  try {
    await CartItems.destroy({ where: { UsersID: userId, ProductID: productId } });
    response.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    response.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
};

export const updateCartItemQuantity = async (request, response) => {
  const { userId, productId, quantity } = request.body;
  try {
    console.log('userId:', userId, 'productId:', productId, 'quantity:', quantity)
    const cartItem = await CartItems.findOne({ where: { UsersID: userId, ProductID: productId } });
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      response.status(200).json({ message: 'Cantidad actualizada' });
    } else {
      response.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
  }
};
