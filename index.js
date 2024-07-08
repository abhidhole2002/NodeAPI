const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const routers = require("./routers/routers");
const productRouters = require("./routers/products");
const UserCart = require("./routers/userCart");
const dotenv = require("dotenv");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

dotenv.config({ path: "./.env" });
// mongodb connection
const connectToDatabase = require("./connection");
const { render } = require("ejs");
connectToDatabase();

// app.get("/", (req, res) => {
//   res.json({ message: "Hello from backend !" });
// });

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// routers
app.use("/api", routers);
app.use("/api", productRouters);
app.use("/api", UserCart);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
