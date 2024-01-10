const express = require("express");
const connectToDb = require("./database/connectToDb");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const router = require("./routes/index.route");

// config env
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// connect to MongoDB
connectToDb();

// middleware body
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "assets/uploads/")));

// routing
router(app);

app.listen(PORT, () => console.log("listening on port " + PORT));
