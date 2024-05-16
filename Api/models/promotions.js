import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";


const Promotions = sequelize.define('promotions', {
  PromotionsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
  },
  category: {
      type: DataTypes.ENUM('HOLIDAYS', 'FREE_SHIPING', 'MEMBERS'),
      allowNull: false,
  },
  discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
  },
  description: {
      type: DataTypes.STRING,
      allowNull: false,
  },
},{
  tableName: 'promotions',
  sequelize,
});

export default Promotions;