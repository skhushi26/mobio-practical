const Book = require("../Models/Book");
const responseBuilder = require("../utils/response");

exports.createBook = async (req, res) => {
  try {
    const { name, author, description } = req.body;
    const userId = req.user.id;

    const bookData = await Book.create({
      name,
      author,
      description,
      userId,
    });

    responseBuilder(res, null, bookData, "Book added successfully", 200);
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in adding book", 500);
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const userId = await req.user.id;
    const books = await Book.find({ userId });
    responseBuilder(res, null, books, "Books found successfully", 200);
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in fetching books data", 500);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const getBookDetail = await Book.findById({ _id: id });
    responseBuilder(res, null, getBookDetail, "Book detail found successfully", 200);
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in fetching book detail", 500);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, author, description } = req.body;
    const isBookAvailable = await Book.findById({ _id: id });
    if (!isBookAvailable) {
      responseBuilder(res, null, null, "Book not available", 400);
    } else {
      const updatedBook = await Book.findByIdAndUpdate({ _id: id }, { name, author, description });
      responseBuilder(res, null, updatedBook, "Book updated successfully", 200);
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in updating book data", 500);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const isBookAvailable = await Book.findById({ _id: id });
    if (!isBookAvailable) {
      responseBuilder(res, null, null, "Book not available", 400);
    } else {
      const deleteBook = await Book.findByIdAndDelete({ _id: id });
      responseBuilder(res, null, updatedBook, "Book deleted successfully", 200);
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in deleting book data", 500);
  }
};
