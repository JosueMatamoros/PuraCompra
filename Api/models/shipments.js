import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Shipments = sequelize.define("Shipments", {
  ShipmentsID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  OrdersID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tracking: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
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
    type: DataTypes.ENUM('DELIVED', 'IN_PROCESS', 'PENDING'),
    defaultValue: 'PENDING',
    allowNull: false,
  },
}, {
  tableName: "Shipments",
  sequelize,
});

export default Shipments;