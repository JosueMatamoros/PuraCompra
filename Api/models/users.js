import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Addresses from "./addresses.js";
import Orders from "./orders.js";

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



await User.sync();
await Addresses.sync();

export default User;