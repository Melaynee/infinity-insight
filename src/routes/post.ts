import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs/promises";
import Post, { IPost } from "../models/Post";

const router = express.Router();
const uploadMiddleware = multer({ dest: "./uploads" });
const secret = process.env.JWT_SECRET;

// Post create
router.post(
  "/post",
  uploadMiddleware.single("file"),
  async (req: Request, res: Response) => {
    try {
      const { originalname, path } = req.file as Express.Multer.File;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = `${path}.${ext}`;

      await fs.rename(path, newPath);

      const { token } = req.cookies;
      const decoded: any = jwt.verify(token, secret as jwt.Secret);

      const { title, summary, content } = req.body;
      const postDoc: IPost = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: decoded.id,
      });

      res.json({ postDoc });
    } catch (error) {
      res.status(401).json({
        message: "You are not authorized!",
      });
    }
  }
);

// Get all posts
router.get("/post", async (req: Request, res: Response) => {
  try {
    const posts: IPost[] = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get post by id
router.get("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postDoc: IPost | null = await Post.findById(id).populate("author", [
      "username",
    ]);
    if (postDoc) {
      res.json(postDoc);
    } else {
      res.status(404).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Edit post
router.put(
  "/post",
  uploadMiddleware.single("file"),
  async (req: Request, res: Response) => {
    try {
      let newPath = null;
      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = `${path}.${ext}`;
        await fs.rename(path, newPath);
      }

      const { token } = req.cookies;
      const decoded: any = jwt.verify(token, secret as jwt.Secret);

      const { id, title, summary, content } = req.body;
      const postDoc: IPost | null = await Post.findById(id);

      if (!postDoc) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);

      if (!isAuthor) {
        return res.status(400).json({
          message: "You are not the author",
        });
      }

      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ?? postDoc.cover,
      });

      res.json(postDoc);
    } catch (error) {
      res.status(401).json({
        message: "You are not authorized!",
      });
    }
  }
);

export default router;
