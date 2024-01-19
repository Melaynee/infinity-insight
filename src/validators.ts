import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  body("username", "Please provide your username").isLength({ min: 3 }),
];

export const postCreateValidation = [
  body("title", "Enter a title for the article")
    .isLength({ min: 3 })
    .isString(),
  body("summary", "Enter summary for the article")
    .isLength({ min: 3 })
    .isString(),
  body("content", "Enter text for the article")
    .isLength({ min: 100 })
    .isString(),
  body("cover", "Invalid image format").isString(),
];
