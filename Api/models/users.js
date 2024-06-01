import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Addresses from "./addresses.js";
import Orders from "./orders.js";
import CartItems from "./cartItems.js";

const User = sequelize.define("User", {
  UsersID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    tableName: "Users",
    Sequelize,
  }
);

User.hasMany(Addresses, {
  foreignKey: 'UsersID',
  sourceKey: 'UsersID'
});

Addresses.belongsTo(User, {
  foreignKey: 'UsersID',
  targetKey: 'UsersID'
});

User.hasMany(CartItems, {
  foreignKey: 'UsersID',
  sourceKey: 'UsersID',
  as: 'cartItems'
});

CartItems.belongsTo(User, {
  foreignKey: 'UsersID',
  targetKey: 'UsersID'
});

await CartItems.sync();
await User.sync();
await Addresses.sync();

export default User;