import { query, check, body } from "express-validator";

const createCategoryVlidator = [
  body("title")
    .exists()
    .withMessage("Title cannot be empty")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 30 })
    .withMessage("Title cannot be more than 30 characters"),
  body("icon")
    .exists()
    .withMessage("Icon cannot be empty")
    .bail()
    .isString()
    .withMessage("Icon must be a string"),
  body("color")
    .exists()
    .withMessage("Color cannot be empty")
    .bail()
    .isString()
    .withMessage("Color must be a string"),
];

const updateCategoryValidator = [
  body("title")
    .optional()
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 30 })
    .withMessage("Title cannot be more than 30 characters"),
  body("icon")
    .optional()
    .bail()
    .isString()
    .withMessage("Icon must be a string"),
  body("color")
    .optional()
    .bail()
    .isString()
    .withMessage("Color must be a string"),
];
export { createCategoryVlidator, updateCategoryValidator };
