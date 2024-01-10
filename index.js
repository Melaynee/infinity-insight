const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "9vCo4";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://blog:Cmm9vCo4kxL7O4FS@cluster0.sf29n96.mongodb.net/"
);

// Registration
app.post("/registration", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.create({
      email,
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

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json("ok");
});

// Cmm9vCo4kxL7O4FS
app.listen(3334);
