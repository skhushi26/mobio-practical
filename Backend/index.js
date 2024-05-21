const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./utils/db");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

const userRoutes = require("./Routes/userRoutes");
const bookRoutes = require("./Routes/bookRoutes");

app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5000mb" }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/book", bookRoutes);

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
