//Validar campos en las rutas
import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { existEmail, existUsername, notRequiredField } from "../utils/db.validators.js"

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