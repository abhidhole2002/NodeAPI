const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

// Routers
const userRouter = require("./routers/user");
const productRouter = require("./routers/products");
const userCartRouter = require("./routers/userCart");

// middlewares
const allowedOrigins = ["https://e--com.vercel.app", "http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

dotenv.config({ path: "./.env" });
// mongodb connection
const connectToDatabase = require("./connection");
connectToDatabase();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/prod", (req, res) => {
  res.render("uploadProducts.ejs");
});

// routers
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", userCartRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
