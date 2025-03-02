//Validar campos en las rutas
import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { checkCompanyNameExists, existEmail, existUsername, notRequiredField } from "../utils/db.validators.js"

export const updateUserValidator = [
    body('username')
        .optional() //Parámetro opcional, puede llegar como no puede llegar
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles 
]

export const updatePasswordValidator = [
    body('currentPassword')
        .notEmpty().withMessage('Current password cannot be empty'),
    body('newPassword')
        .notEmpty().withMessage('New password cannot be empty')
        .isStrongPassword()
        .withMessage('New password must be strong')
        .isLength({ min: 8 })
        .withMessage('New password needs min characters')
        .matches(/[a-z]/).withMessage('New password must contain at least 1 lowercase letter')
        .matches(/[A-Z]/).withMessage('New password must contain at least 1 uppercase letter')
        .matches(/\d/).withMessage('New password must contain at least 1 number'),
    validateErrors 
]

export const saveCompanyValidator = [
    body('name')
        .notEmpty().withMessage('Name is required.')
        .custom(checkCompanyNameExists), // Use la validacion customizada
    body('description')
        .notEmpty().withMessage('Description is required.'),
    body('phone')
        .notEmpty().withMessage('Phone is required.')
        .isLength({ min: 8, max: 15 }).withMessage('Phone number must be between 8 and 15 characters.'),
    body('impactLevel')
        .notEmpty().withMessage('Impact level is required.'),
    body('yearsOfExperience')
        .notEmpty().withMessage('Years of experience is required.')
        .isNumeric().withMessage('Years of experience must be a number.'),
    body('businessCategory')
        .notEmpty().withMessage('Business category is required.'),
    body('subsidiary')
        .notEmpty().withMessage('Subsidiary type is required.'),
    validateErrors
]
export const saveCompanyValidator2 = [
    body('name')
        .custom(checkCompanyNameExists), // Use la validacion customizada
    validateErrors
]