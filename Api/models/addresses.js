import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Addresses = sequelize.define("Addresses", {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AddressID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
}, {
  tableName: "addresses",
  sequelize,
});

export default Addresses;