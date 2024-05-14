import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const ProductPromotions = sequelize.define('productPromotions', {
    ProductsID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    PromotionsID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
}, {
    tableName: 'productspromotions',
    sequelize,
});

export default ProductPromotions;