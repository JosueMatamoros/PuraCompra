import { Sequelize, DataTypes, ENUM } from "sequelize";
import sequelize from "./index.js";

const Reviews = sequelize.define('reviews', {
  reviewsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
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
  title:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  body:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  star:{
      type: ENUM('ONE_STAR', 'TWO_STAR', 'TREE_STAR', 'FOURTH_STAR', 'FIVE_STAR'),
      allowNull: false,
  },
  date :{
      type: DataTypes.DATE,
      allowNull: false,
  }
},{
  tableName: 'reviews',
  sequelize,
});

export default Reviews;