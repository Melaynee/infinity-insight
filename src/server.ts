require("dotenv").config();

const express = require("express");
import mongoose from "mongoose";
const cookieParser = require("cookie-parser");

import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import contactRoutes from "./routes/contact";

import corsMiddleware from "./middlewares/cors";
import errorHandlerMiddleware from "./middlewares/errorHandler";

const mongodbUrl = process.env.MONGO_URL;

const path = require("path");

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

if (mongodbUrl) {
  mongoose
    .connect(mongodbUrl)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error));
}

app.use(errorHandlerMiddleware);

// Start the server
app.listen(3334, () => {
  console.log("Server is running on port 3334");
});
