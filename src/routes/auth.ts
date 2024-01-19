import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import checkAuth, { AuthenticatedRequest } from "../middlewares/checkAuth";
import { loginValidation, registerValidation } from "../validators";
import validationErrorHandler from "../validationErrorHandler";

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET ?? "9vCo4";

// Registration
router.post(
  "/registration",
  registerValidation,
  validationErrorHandler,
  async (req: Request, res: Response) => {
    try {
      const { email, username, password } = req.body;

      const userDoc = await User.create({
        email,
        username,
        passwordHash: bcrypt.hashSync(password, salt),
      });

      const token = jwt.sign({ _id: userDoc._id }, secret, {});

      res.json({
        id: userDoc._id,
        email: userDoc.email,
        username: userDoc.username,
        token,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Login
router.post(
  "/auth",
  loginValidation,
  validationErrorHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const userDoc: IUser | null = await User.findOne({ email });

      if (!userDoc) {
        return res.status(404).json("User not found");
      }
      if (!userDoc.passwordHash) {
        return res.status(400).json("Invalid password or user data");
      }
      const isValidPassword = await bcrypt.compare(
        password,
        userDoc.passwordHash
      );

      if (!isValidPassword) {
        return res.status(400).json("Wrong credentials");
      }

      const token = jwt.sign(
        {
          email,
          id: userDoc?._id,
        },
        secret,
        {}
      );

      res.json({
        id: userDoc._id,
        email: userDoc.email,
        username: userDoc.username,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" + error });
    }
  }
);

//
router.get("/auth/me", checkAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userDoc = await User.findById(req.userId);

    if (!userDoc) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { passwordHash, ...userData } = userDoc;

    res.json({
      id: userDoc._id,
      email: userDoc.email,
      username: userDoc.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Access denied",
    });
  }
});

// Logout
router.post("/logout", (req: Request, res: Response) => {
  try {
    res.json("Logout success");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
