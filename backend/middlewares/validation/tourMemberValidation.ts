import { query, check , body , param } from 'express-validator';

const addMemberValidation = [
    body('tourId')
    .exists()
    .withMessage('Tour ID is required')
    .bail()
    .notEmpty()
    .withMessage('Tour ID cannot be empty')
    .bail()
    .isMongoId()
    .withMessage('Tour ID must be a valid Mongo ID'),
    body('userId')
    .exists()
    .withMessage('User ID is required')
    .bail()
    .notEmpty()
    .withMessage('User ID cannot be empty')
    .bail()
    .isMongoId()
    .withMessage('User ID must be a valid Mongo ID'),
    body('role')
    .exists()
    .withMessage('Role is required')
    .bail()
    .notEmpty()
    .withMessage('Role cannot be empty')
    .bail()
    .isIn(['CO-LEADER', 'MEMBER'])
    .withMessage('Role must be either CO-LEADER or MEMBER'),
]

const removeMemberValidation = [
    param('tourId')
    .exists()
    .withMessage('Tour ID is required')
    .bail()
    .notEmpty()
    .withMessage('Tour ID cannot be empty')
    .bail()
    .isMongoId()
    .withMessage('Tour ID must be a valid Mongo ID'),
    param('userId')
    .exists()
    .withMessage('User ID is required')
    .bail()
    .notEmpty()
    .withMessage('User ID cannot be empty')
    .bail()
    .isMongoId()
    .withMessage('User ID must be a valid Mongo ID'),
]


const promoteMemberValidation = [
    body('tourId')
    .exists()
    .withMessage('Tour ID is required')
    .bail()
    .notEmpty()
    .withMessage('Tour ID cannot be empty')
    .bail()
    .isMongoId()
    .withMessage('Tour ID must be a valid Mongo ID'),
    body('userId')
    .exists()
    .withMessage('User ID is required')
    .bail()
    .notEmpty()
    .withMessage('User ID cannot be empty')
    .bail()
    .isMongoId()
    .withMessage('User ID must be a valid Mongo ID'),
    body('role')
    .exists()
    .withMessage('Role is required')
    .bail()
    .notEmpty()
    .withMessage('Role cannot be empty')
    .bail()
    .isIn(['CO-LEADER', 'MEMBER'])
    .withMessage('Role must be either CO-LEADER or MEMBER'),
]

const leaveTourValidation = [
    param('tourId')
    .exists()
    .withMessage('Tour ID is required')
    .bail()
    .notEmpty()
    .withMessage('Tour ID cannot be empty')
    .bail()
    .isMongoId()
    .withMessage('Tour ID must be a valid Mongo ID'),
]

export {
    addMemberValidation,
    removeMemberValidation,
    promoteMemberValidation, 
    leaveTourValidation
}
