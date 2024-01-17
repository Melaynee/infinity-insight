import express, { Request, Response } from "express";
import Contact, { IContact } from "../models/Contact";

const router = express.Router();

router.post("/contact", async (req: Request, res: Response) => {
  try {
    const { email, subject, message } = req.body;

    const contactDoc: IContact = await Contact.create({
      email,
      subject,
      message,
    });

    res.json({ contactDoc });
  } catch (error) {
    res.status(400).json({
      message: "Bad request!",
    });
  }
});

export default router;
