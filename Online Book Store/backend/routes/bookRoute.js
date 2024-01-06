import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      res.status(400).send({ message: "Send all the required fields" });
      return;
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

// ----------------------------------------------------------------------------

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ----------------------------------------------------------------------------

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Book.findById(id);

    if (!result) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ----------------------------------------------------------------------------
router.put("/:id", async (req, res) => {
  const { title, author, publishYear } = req.body;
  const { id } = req.params;

  try {
    if (!title || !author || !publishYear) {
      res.status(400).send({ message: "Send all the required fields" });
      return;
    }

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ----------------------------------------------------------------------------

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


export default router;