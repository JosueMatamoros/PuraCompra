import sequelize from "./models/index.js";
import express from "express";
import usersRoutes from "./routes/usersRoutes.js";

import User from "./models/users.js"; 
import Orders from "./models/order.js";
import ProductPromotions from "./models/productPromotions.js";
import Reviews from "./models/reviews.js";
import TransactionLogs from "./models/transactionLogs.js";
import Shipments from "./models/shipments.js";
import PriceHistory from "./models/priceHistory.js";
import OrderDetails from "./models/orderDetails.js";
import Products from "./models/products.js";
import Addresses from "./models/addresses.js";

const app = express();
const port = 3000;

app.use('/users', usersRoutes);


async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
