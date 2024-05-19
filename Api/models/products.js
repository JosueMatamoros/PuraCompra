import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './index.js';
import Sellers from './sellers.js';

const Products = sequelize.define('Products', {
  ProductsID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Sellers: {  // Cambié de SellersID a Sellers
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sellers,
      key: 'SellersID',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
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
