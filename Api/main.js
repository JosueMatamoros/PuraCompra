import sequelize from "./models/index.js";
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


async function loadModels() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(User === sequelize.models.User); // true
  try {
    await sequelize.sync();
    const users = await User.findAll();
    console.log(JSON.stringify(users, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }

  try {
    await sequelize.sync();
    const orders = await Orders.findAll();
    console.log(JSON.stringify(orders, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
  try {
    await sequelize.sync();
    const productPromotions = await ProductPromotions.findAll();
    console.log(JSON.stringify(productPromotions, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
  try {
    await sequelize.sync();
    const reviews = await Reviews.findAll();
    console.log(JSON.stringify(reviews, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
  try {
    await sequelize.sync();
    const transactionLogs = await TransactionLogs.findAll();
    console.log(JSON.stringify(transactionLogs, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
  try {
    await sequelize.sync();
    const shipments = await Shipments.findAll();
    console.log(JSON.stringify(shipments, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
  try {
    await sequelize.sync();
    const priceHistory = await PriceHistory.findAll();
    console.log(JSON.stringify(priceHistory, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
  try {
    await sequelize.sync();
    const orderDetails = await OrderDetails.findAll();
    console.log(JSON.stringify(orderDetails, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
  try {
    await sequelize.sync();
    const orders = await Products.findAll();
    console.log(JSON.stringify(orders, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
  try {
    await sequelize.sync();
    const addresses = await Addresses.findAll();
    console.log(JSON.stringify(addresses, null, 2));
  }
  catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  await loadModels();
}

main();
