import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js"; // Ajusta el path si es necesario

// FOREIGN KEY (UsersID) REFERENCES Users (UsersID),
// FOREIGN KEY (ProductID) REFERENCES Products (ProductsID)

const CartItems = sequelize.define("cartItems", {
    CartItemID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    UsersID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    tableName: "CartItems",
    sequelize,
    timestamps: false,
});
CartItems.associate = (models) => {
    // Relación con Users
    CartItems.belongsTo(models.User, {
        foreignKey: 'UsersID',
        as: 'user',
        onDelete: 'CASCADE'
    });

    // Relación con Products
    CartItems.belongsTo(models.Product, {
        foreignKey: 'ProductID',
        as: 'product',
        onDelete: 'CASCADE'
    });
};

export default CartItems;