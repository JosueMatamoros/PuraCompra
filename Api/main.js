import sequelize from "./models/index.js";
import express from "express";
import bodyParser from "body-parser";

import addressesRoutes from "./routes/addressesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import promotionsRoutes from "./routes/promotionsRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import sellersRoutes from "./routes/sellersRoutes.js";
import shipmentsRoutes from "./routes/shipmentsRoutes.js";
import transactionLogsRoutes from "./routes/transactionLogsRoutes.js";

import Promotions from "./models/promotions.js";
import User from "./models/users.js"; 
import Orders from "./models/orders.js";
import ProductPromotions from "./models/productPromotions.js";
import Reviews from "./models/reviews.js";
import TransactionLogs from "./models/transactionLogs.js";
import Shipments from "./models/shipments.js";
import PriceHistory from "./models/priceHistory.js";
import OrderDetails from "./models/orderDetails.js";
import Products from "./models/products.js";
import Addresses from "./models/addresses.js";
import Sellers from "./models/sellers.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/addresses', addressesRoutes);
app.use('/users', usersRoutes);
app.use('/promotions', promotionsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/sellers', sellersRoutes);
app.use('/shipments', shipmentsRoutes);
app.use('/transactionLogs', transactionLogsRoutes);

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