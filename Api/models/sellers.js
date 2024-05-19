import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Sellers = sequelize.define("Sellers", {
  SellersID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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
    type: DataTypes.ENUM('RETAIL_DISTRIBUTORS', 'PLATFORM_PARTNERS', 'DIGITAL_RESELLERS'),
    allowNull: false,
  },
}, {
  tableName: "Sellers",
  sequelize,
});

export default Sellers;