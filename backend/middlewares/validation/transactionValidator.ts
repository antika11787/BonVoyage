import { body } from "express-validator";

const transactionCreateValidator = [
  body("tourId")
    .exists()
    .withMessage("Tour ID is required")
    .bail()
    .notEmpty()
    .withMessage("Tour ID cannot be empty")
    .bail()
    .isMongoId()
    .withMessage("Tour ID must be a mongo id"),

  body("amount")
    .exists()
    .withMessage("Amount is required")
    .bail()
    .notEmpty()
    .withMessage("Amount cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Title must be at most 50 characters long"),

  body("description")
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long")
    .isLength({ max: 255 })
    .withMessage("Description must be at most 255 characters long"),

  body("paidBy")
    .exists()
    .withMessage("Paid by is required")
    .bail()
    .notEmpty()
    .withMessage("Paid by cannot be empty")
    .bail()
    .isArray()
    .withMessage("Paid by must be an array")
    .bail()
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Paid by cannot be empty");
      }
      return true;
    }),

  body("paidBy.*.walletId")
    .exists()
    .withMessage("Wallet ID is required")
    .bail()
    .notEmpty()
    .withMessage("Wallet ID cannot be empty")
    .bail()
    .isMongoId()
    .withMessage("Wallet ID must be a mongo id"),

  body("paidBy.*.amount")
    .exists()
    .withMessage("Amount is required")
    .bail()
    .notEmpty()
    .withMessage("Amount cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("transactionCategoryId")
    .exists()
    .withMessage("Transaction Category ID is required")
    .bail()
    .notEmpty()
    .withMessage("Transaction Category ID cannot be empty")
    .bail()
    .isMongoId()
    .withMessage("Transaction Category ID must be a mongo id"),

  body("splitType")
    .exists()
    .withMessage("Type is required")
    .bail()
    .notEmpty()
    .withMessage("Type cannot be empty")
    .bail()
    .isString()
    .withMessage("Type must be a string")
    .bail()
    .isIn(["EQUAL", "CUSTOM"])
    .withMessage("Type must be either EQUAL or CUSTOM"),

  body("custom")
    .optional()
    .isArray()
    .withMessage("Custom must be an array")
    .bail()
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Custom cannot be empty");
      }
      return true;
    }),

  body("custom.*.walletId")
    .exists()
    .withMessage("Wallet ID is required")
    .bail()
    .notEmpty()
    .withMessage("Wallet ID cannot be empty")
    .bail()
    .isMongoId()
    .withMessage("Wallet ID must be a mongo id"),

  body("custom.*.amount")
    .exists()
    .withMessage("Amount is required")
    .bail()
    .notEmpty()
    .withMessage("Amount cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Amount must be a number"),
];

export { transactionCreateValidator };
