import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

import bookRoute from "./routes/bookRoute.js";

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// ----------------------------------------------------------------------------
app.use("/books", bookRoute);

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

mongoose
  .connect(process.env.MONGODB_ATLAS)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log("Server start at port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
