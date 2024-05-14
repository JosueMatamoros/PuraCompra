import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Sellers = sequelize.define("Sellers", {
  SellersID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Retail_Distributors', 'Platform_Partners', 'Degital_Resellers'),
    allowNull: false,
  },
}, {
  tableName: "Sellers",
  sequelize,
});

export default Sellers;