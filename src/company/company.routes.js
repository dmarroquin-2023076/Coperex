import { Router } from "express";
import { saveCompany, updateCompany } from "./company.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post('/', validateJwt ,saveCompany)
api.post('/update/:id', validateJwt, updateCompany)

export default api