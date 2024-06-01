import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js"; // Ajusta el path si es necesario
import User from "./users.js"; // Ajusta el path si es necesario
import Products from './products.js';

const CartItems = sequelize.define('CartItem', {
  CartItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UsersID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  tableName: 'CartItems',
  sequelize,
});

// Define associations
CartItems.belongsTo(Products, { foreignKey: 'ProductID', as: 'product' });

export default CartItems;

