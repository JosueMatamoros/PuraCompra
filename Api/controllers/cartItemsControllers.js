import CartItems from "../models/cartItems.js";

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

export const getCartItems = async (request, response) => {
    const { userId } = request.params;
    try {
      const cartItems = await CartItems.findAll({ where: { UsersID: userId }, include: Product });
      response.status(200).json(cartItems);
    } catch (error) {
      response.status(500).json({ error: 'Error al obtener los productos del carrito' });
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