import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const User = sequelize.define("User", {
  UsersID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addresses: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
    tableName: "Users",
    Sequelize,
  }
);

export default User;