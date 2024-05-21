const express = require("express");
const bookController = require("../Controllers/bookController");
const authorize = require("../utils/authentication");

const router = express.Router();

router.post("/add", authorize("User"), bookController.createBook);
router.get("/get-all", authorize("User"), bookController.getAllBooks);
router.get("/get/:id", authorize("User"), bookController.getBookById);
router.put("/update/:id", authorize("User"), bookController.updateBook);
router.delete("/delete/:id", authorize("User"), bookController.deleteBook);

module.exports = router;
