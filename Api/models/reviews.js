import { Sequelize, DataTypes, ENUM } from "sequelize";
import sequelize from "./index.js";
import Users from './users.js';
import Products from './products.js';

const Reviews = sequelize.define('reviews', {
  reviewsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true, // Cambiado a true para permitir la autoincrementación
      primaryKey: true,
  },
  UsersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  ProductsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  body:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  star:{
      type: ENUM('ONE_STAR', 'TWO_STAR', 'TREE_STAR', 'FOUR_STAR', 'FIVE_STAR'),
      allowNull: false,
  },
  date :{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
  }
},{
  tableName: 'reviews',
  sequelize,
});

// Associations
Reviews.belongsTo(Users, { foreignKey: 'UsersId', as: 'User' });
Reviews.belongsTo(Products, { foreignKey: 'ProductsId' });

export default Reviews;
