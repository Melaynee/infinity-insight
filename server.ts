require("dotenv").config();

const express = require("express");
import mongoose from "mongoose";
const cookieParser = require("cookie-parser");

import authRoutes from "./src/routes/auth";
import postRoutes from "./src/routes/post";
import contactRoutes from "./src/routes/contact";

import corsMiddleware from "./src/middlewares/cors";
import errorHandlerMiddleware from "./src/validationErrorHandler";

import path from "path";

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(authRoutes);
app.use(postRoutes);
app.use(contactRoutes);

mongoose
  .connect(
    process.env.MONGO_URL ??
      "mongodb+srv://blog:Cmm9vCo4kxL7O4FS@cluster0.sf29n96.mongodb.net/"
  )
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

app.use(errorHandlerMiddleware);

// Start the server
app.listen(3334, () => {
  console.log("Server is running on port 3334");
});
