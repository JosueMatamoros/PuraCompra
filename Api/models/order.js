import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Orders = sequelize.define("orders", {
  OrdersID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
  },
  UsersID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  taxes: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
},{
  tableName: "Orders",
  sequelize,
})

export default Orders;