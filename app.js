require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const LoginRouter = require("./Router/Login.router");
const AdminRouter = require("./Router/Admin.router");
const ForgetPassRouter = require("./Router/ForgetPass.router");

app.use("/", LoginRouter);
app.use("/admin", AdminRouter);
app.use("/forgot", ForgetPassRouter);

const db = require("./config/db");
db.connect();
app.listen(port, () => {
  console.log("Server chạy ở cổng " + port);
});
