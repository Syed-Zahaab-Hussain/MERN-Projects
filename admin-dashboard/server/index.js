import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import generalRoutes from "./routes/general.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("combined"));
app.use(cors());

// Data Imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);
app.use("management", managementRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "admin-dasboard",
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`server started on port http://localhost:${PORT}`)
    );

    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
  })
  .catch((err) => console.log(`${err} did not connect`));
