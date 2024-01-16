const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const User = require("./models/User.js");
const Post = require("./models/Post.js");
const Contact = require("./models/Contact.js");

const app = express();
const uploadMiddleware = multer({ dest: "./uploads" });
const salt = bcrypt.genSaltSync(10);
const secret = "9vCo4";

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  "mongodb+srv://blog:Cmm9vCo4kxL7O4FS@cluster0.sf29n96.mongodb.net/"
);

// Routes

// Registration
app.post("/registration", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userDoc = await User.create({
      email,
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

// Login
app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  const salted_password = bcrypt.compareSync(password, userDoc.password);

  if (salted_password) {
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        email,
      });
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});

// Auth
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  try {
    const decoded = jwt.verify(token, secret);
    res.json(decoded);
  } catch (error) {
    return;
  }
});

// Logout
app.post("/logout", async (req, res) => {
  res.cookie("token", "").json("ok");
});

// Post create
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;

  fs.renameSync(path, newPath);

  const { token } = req.cookies;

  try {
    const decoded = jwt.verify(token, secret);
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: decoded.id,
    });
    res.json({ postDoc });
  } catch (error) {
    return res.status(401).json({
      message: "You are not authorized!",
    });
  }
});

// Get all posts
app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(posts);
});

// Get post by id
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

// Edit post
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;

  try {
    const decoded = jwt.verify(token, secret);
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);

    if (!isAuthor) {
      return res.status(400).json({ message: "You are not the author" });
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath || postDoc.cover,
    });
    res.json(postDoc);
  } catch (error) {
    return res.status(401).json({
      message: "You are not authorized!",
    });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const contactDoc = await Contact.create({
      email,
      subject,
      message,
    });
    res.json({
      contactDoc,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad request!",
    });
  }
});

// Start the server
app.listen(3334, () => {
  console.log("Server is running on port 3334");
});
