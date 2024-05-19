import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const PriceHistory = sequelize.define("PriceHistory", {
  PriceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: "PriceHistory",
  sequelize,
});

export default PriceHistory;