import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { Book } from "./models/bookModel.js";

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// ----------------------------------------------------------------------------

app.post("/books", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      res.status(400).send({ message: "Send all the required fields" });
    }

    const newBook = new Book({
      title,
      author,
      publishYear,
    });

    const savedBook = await newBook.save();
    res.status(201).send(savedBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/books/:Id", async (req, res) => {
  const bookId = req.params.Id;

  try {
    const bookInfo = await Book.findById(bookId);
    res.status(200).send(bookInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

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
