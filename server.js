// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const suratRouter = require("./routes/surat");
const usersRouter = require("./routes/users");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", suratRouter);
app.use("/api", usersRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
