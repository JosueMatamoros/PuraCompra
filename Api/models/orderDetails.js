import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const OrderDetails = sequelize.define("OrderDetails", {
  OrdersID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: "orderdetails",
  sequelize,
});

export default OrderDetails;