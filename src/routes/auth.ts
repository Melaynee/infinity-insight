import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET ?? "9vCo4";

interface DecodedToken {
  email: string;
  id: string;
}

// Registration
router.post("/registration", async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    const userDoc = await User.create({
      email,
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Login
router.post("/auth", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userDoc: IUser | null = await User.findOne({ email });

    if (!userDoc) {
      return res.status(400).json("Wrong credentials");
    }

    const salted_password = bcrypt.compareSync(password, userDoc.password);

    if (salted_password) {
      jwt.sign(
        { email, id: userDoc?._id },
        secret,
        {},
        (error: Error | null, token: string | undefined) => {
          if (error) {
            res.status(500).json("Internal Server Error");
          } else {
            res.cookie("token", token).json({
              id: userDoc?._id,
              email,
              username: userDoc?.username,
            });
          }
        }
      );
    } else {
      res.status(400).json({ error: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Auth
router.get("/profile", async (req: Request, res: Response) => {
  const { token } = req.cookies;

  try {
    const decoded: DecodedToken = jwt.verify(token, secret) as DecodedToken;
    const userDoc: IUser | null = await User.findById(decoded.id);

    if (userDoc?.email) {
      const { email, _id, username } = userDoc;
      res.json({ email, _id, username });
    } else {
      res.status(401).json("Unauthorized");
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Logout
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", { path: "/" }).json("ok");
});

export default router;
