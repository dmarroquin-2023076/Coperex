import { Router } from "express"
import { 
    login,
    updatePassword,
} from "./user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import {  updatePasswordValidator  } from "../../middlewares/validators.js"


const api = Router()

api.post('/',login)

api.put(
    '/updatePassword',
    [
        validateJwt, 
        updatePasswordValidator
    ], 
    updatePassword
)


export default api