import { query, check , body } from 'express-validator';

const registerValidator = [
    body('name')
    .exists()
    .withMessage('Name is required')
    .bail()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 20 })
    .withMessage('Name must be at most 20 characters long'),

    body('email')
    .exists()
    .withMessage('Email is required')
    .bail()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .bail()
    .isEmail()
    .withMessage('Invalid email address'),

    body("password")
      .exists()
      .withMessage("Password was not provided")
      .bail()
      .notEmpty()
      .withMessage("Password cannot be empty")
      .bail()
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .bail()
      .isLength({ max: 32 })
      .withMessage("Password cannot be more than 32 characters")
      .bail()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter,one number and one special character"
      ),
];


const loginValidator = [
    body('email')
    .exists()
    .withMessage('Email is required')
    .bail()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .bail()
    .isEmail()
    .withMessage('Invalid email address'),

    body('password')
    .exists()
    .withMessage('Password is required')
    .bail()
    .notEmpty()
    .withMessage('Password cannot be empty')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .isLength({ max: 32 })
    .withMessage('Password must be at most 32 characters long') ,
];

const forgotPasswordValidator = [
    body("email")
      .exists()
      .withMessage("Email was not provided")
      .bail()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .bail()
      .isString()
      .withMessage("Email must be a string")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Email cannot be more than 50 characters")
      .bail()
      .isEmail()
      .withMessage("Email must be a valid email"),
  ];

  const checkToken = [
    body("token")
      .exists()
      .withMessage("Token was not provided")
      .bail()
      .notEmpty()
      .withMessage("Token cannot be empty")
      .bail()
      .isString()
      .withMessage("Token must be a string")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Token cannot be more than 50 characters"),

    body("id")
      .exists()
      .withMessage("Id was not provided")
      .bail()
      .notEmpty()
      .withMessage("Id cannot be empty")
      .bail()
      .isString()
      .withMessage("Id must be a string")
      .bail()
      .isMongoId()
      .withMessage("Id must be a valid mongo id"),
  ];

  const resetPasswordValidator = [
    body("password")
      .exists()
      .withMessage("Password was not provided")
      .bail()
      .notEmpty()
      .withMessage("Password cannot be empty")
      .bail()
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .bail()
      .isLength({ max: 32 })
      .withMessage("Password cannot be more than 32 characters")
      .bail()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter,one number and one special character"
      ),
    body("id")
      .exists()
      .withMessage("Id was not provided")
      .bail()
      .notEmpty()
      .withMessage("Id cannot be empty")
      .bail()
      .isString()
      .withMessage("Id must be a string")
      .bail()
      .isMongoId()
      .withMessage("Id must be a valid mongo id"),
    body("token")
      .exists()
      .withMessage("Token was not provided")
      .bail()
      .notEmpty()
      .withMessage("Token cannot be empty")
      .bail()
      .isString()
      .withMessage("Token must be a string")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Token cannot be more than 50 characters"),
  ];

export { registerValidator, loginValidator , forgotPasswordValidator , checkToken , resetPasswordValidator };




