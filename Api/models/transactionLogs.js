import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const TransactionLogs = sequelize.define("TransactionLogs", {
  TransactionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  UsersID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  OrderID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Refund', 'purchase'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: "TransactionLogs",
  sequelize,
});

export default TransactionLogs;