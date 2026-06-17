const express = require("express");
const Book = require("../models/book");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const search = req.query.search;
		const filter = search
			? { title: { $regex: search, $options: "i" } }
			: {};

		const books = await Book.find(filter).sort({ _id: -1 });
		res.json(books);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch books", error: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);

		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		res.json(book);
	} catch (error) {
		res.status(400).json({ message: "Invalid book id", error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const book = new Book(req.body);
		const savedBook = await book.save();
		res.status(201).json(savedBook);
	} catch (error) {
		res.status(400).json({ message: "Failed to create book", error: error.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!updatedBook) {
			return res.status(404).json({ message: "Book not found" });
		}

		res.json(updatedBook);
	} catch (error) {
		res.status(400).json({ message: "Failed to update book", error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deletedBook = await Book.findByIdAndDelete(req.params.id);

		if (!deletedBook) {
			return res.status(404).json({ message: "Book not found" });
		}

		res.json({ message: "Book deleted successfully" });
	} catch (error) {
		res.status(400).json({ message: "Failed to delete book", error: error.message });
	}
});

module.exports = router;
