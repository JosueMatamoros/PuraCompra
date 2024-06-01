import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './index.js';
import Sellers from './sellers.js';

const Products = sequelize.define('Product', {
  ProductsID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Sellers: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Products',
  sequelize,
});

Products.belongsTo(Sellers, { foreignKey: 'Sellers' });

export default Products;
