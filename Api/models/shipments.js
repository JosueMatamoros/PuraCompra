import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Shipments = sequelize.define("Shipments", {
  ShipmentsID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
  OrdersID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'OrdersID'
    }
  },
  tracking: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM('DELIVERED', 'IN_PROCESS', 'PENDING'),
    defaultValue: 'PENDING',
    allowNull: false,
  },
}, {
  tableName: "Shipments",
  sequelize,
});

export default Shipments;