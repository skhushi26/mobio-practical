const mongoose = require("mongoose");

// DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/bookmanagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("Error occurred in connecting", err);
  });
