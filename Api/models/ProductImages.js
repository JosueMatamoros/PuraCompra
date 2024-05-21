import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './index.js';
import Products from './products.js';

const ProductImages = sequelize.define('ProductImages', {
  ImageID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  ProductsID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: 'ProductsID',
    },
    onDelete: 'CASCADE'
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'ProductImages',
  sequelize,
});

ProductImages.belongsTo(Products, { foreignKey: 'ProductsID' });
Products.hasMany(ProductImages, { foreignKey: 'ProductsID' });

export default ProductImages;
