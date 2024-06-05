import sequelize from "./models/index.js";
import express from "express";
import fs from 'fs';
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

import addressesRoutes from "./routes/addressesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import promotionsRoutes from "./routes/promotionsRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import sellersRoutes from "./routes/sellersRoutes.js";
import shipmentsRoutes from "./routes/shipmentsRoutes.js";
import transactionLogsRoutes from "./routes/transactionLogsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import priceHistoryRoutes from "./routes/priceHistoryRoutes.js";
import orderDetailsRoutes from "./routes/orderDetailsRoutes.js";
import ProductPromotionsRoutes from "./routes/productPromotionsRoutes.js";
import ProductImagesRoutes from "./routes/ProductImagesRoutes.js";
import cartItemsRoutes from "./routes/cartItemsRoutes.js";
import middlewareRoutes from "./routes/middlewareRoutes.js";

import { uploadProfilePicture } from "./controllers/usersControllers.js";

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Configurar CORS para permitir todas las solicitudes necesarias
app.use(cors({
  origin: '*', // Permitir todos los orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

app.use(express.json());
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'products'
app.use('/assets/products', express.static(path.join(__dirname, '../puraCompra/src/assets/products')));
app.use('/profileIcon', express.static(path.join(__dirname, '../puraCompra/src/profileIcon')));

// Configuración de multer para subir imágenes de perfil
const profileIconStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '../puraCompra/src/profileIcon');
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const profileIconUpload = multer({ storage: profileIconStorage });

// Configuración de multer para subir imágenes de productos
const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '../puraCompra/src/assets/products');
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const productImageUpload = multer({ storage: productImageStorage });

// Rutas de la API
app.post('/upload/:id', profileIconUpload.single('profilePicture'), uploadProfilePicture);

app.use('/addresses', addressesRoutes);
app.use('/users', usersRoutes);
app.use('/promotions', promotionsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/sellers', sellersRoutes);
app.use('/shipments', shipmentsRoutes);
app.use('/transactionLogs', transactionLogsRoutes);
app.use('/orders', ordersRoutes);
app.use('/products', productImageUpload.single('mainImage'), productsRoutes); // Middleware para subir imagen de producto
app.use('/priceHistory', priceHistoryRoutes);
app.use('/orderDetails', orderDetailsRoutes);
app.use('/productPromotions', ProductPromotionsRoutes);
app.use('/productImages', productImageUpload.single('imageUrl'), ProductImagesRoutes); // Middleware para subir imágenes adicionales
app.use('/cart', cartItemsRoutes);
app.use('/middleware', middlewareRoutes);

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
