import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Addresses = sequelize.define("Addresses", {
  AddressID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  UsersID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'UsersID'
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "Addresses",
  sequelize,
  timestamps: false,
});

await Addresses.sync();
export default Addresses;
