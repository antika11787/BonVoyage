import { query, check, body } from "express-validator";
const paginationValidator = [
  query("limit")
    .optional()
    .bail()
    .notEmpty()
    .withMessage("Limit cannot be empty")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer")
    .bail()
    .isLength({ max: 10 })
    .withMessage("Too long input"),
  query("page")
    .optional()
    .bail()
    .notEmpty()
    .withMessage("Page cannot be empty")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .bail()
    .isLength({ max: 10 })
    .withMessage("Too long input"),
];
export { paginationValidator };