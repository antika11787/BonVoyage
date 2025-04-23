import { query, check, body } from "express-validator";

const tourUpdateValidator = [
  body("title")
    .optional()
    .bail()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 70 })
    .withMessage("Title cannot be more than 70 characters"),
  body("description")
    .optional()
    .bail()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 200 })
    .withMessage("Description cannot be more than 200 characters"),
  body("startDate")
    .optional()
    .bail()
    .notEmpty()
    .withMessage("Start date cannot be empty")
    .bail()
    .isDate({format: 'YYYY-MM-DD'})
    .withMessage("Start date must be a date"),
  body("endDate")
    .optional()
    .bail()
    .notEmpty()
    .withMessage("End date cannot be empty")
    .bail()
    .isDate({format: 'YYYY-MM-DD'})
    .withMessage("End date must be a date"),
  body("place")
    .optional()
    .bail()
    .isString()
    .withMessage("Place must be a string")
    .isLength({ max: 70 })
    .withMessage("Place cannot be more than 70 characters"),
  body("type")
    .optional()
    .bail()
    .isIn(["UNDECIDED", "RELAX", "TREKKING", "HIKING", "PICNIC", "CAMPING"])
    .withMessage(
      "Type must be one of 'UNDECIDED', 'RELAX', 'TREKKING', 'HIKING', 'PICNIC' or 'CAMPING'"
    ),
  body("estimatedBudget")
    .optional()
    .bail()
    .notEmpty()
    .withMessage("Estimated Budget cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Estimated Budget must be a number"),
];

const tourCreateValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 70 })
    .withMessage("Title cannot be more than 70 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description cannot be empty")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 200 })
    .withMessage("Description cannot be more than 200 characters"),
  body("startDate")
    .notEmpty()
    .withMessage("Start date cannot be empty")
    .bail()
    .isDate({format: 'YYYY-MM-DD'})
    .withMessage("Start date must be a date"),
  body("endDate")
    .notEmpty()
    .withMessage("End date cannot be empty")
    .bail()
    .isDate({format: 'YYYY-MM-DD'})
    .withMessage("End date must be a date"),
  body("place")
    .notEmpty()
    .withMessage("Place cannot be empty")
    .isString()
    .withMessage("Place must be a string")
    .isLength({ max: 70 })
    .withMessage("Place cannot be more than 70 characters"),
  body("type")
    .isIn(["UNDECIDED", "RELAX", "TREKKING", "HIKING", "PICNIC", "CAMPING"])
    .withMessage(
      "Type must be one of 'UNDECIDED', 'RELAX', 'TREKKING', 'HIKING', 'PICNIC' or 'CAMPING'"
    ),
  body("estimatedBudget")
    .notEmpty()
    .withMessage("Estimated Budget cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Estimated Budget must be a number"),
];

export { tourUpdateValidator , tourCreateValidator };
