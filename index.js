const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routers = require("./routers/routers");
const productRouters = require("./routers/products");
const UserCart = require("./routers/userCart");
const dotenv = require("dotenv");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config({ path: "./.env" });
// mongodb connection
const connectToDatabase = require("./connection");
connectToDatabase();

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend !" });
});

// routers
app.use("/api", routers);
app.use("/api", productRouters);
app.use("/api", UserCart);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
