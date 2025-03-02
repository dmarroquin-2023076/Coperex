import { Router } from "express";
import { listCompanies, listCompaniesAlphabeticallyAZ, listCompaniesAlphabeticallyZA, listCompaniesByCategory, listCompaniesByExperience, saveCompany, updateCompany } from "./company.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { saveCompanyValidator, saveCompanyValidator2 } from "../../middlewares/validators.js";
import { objectIdValid } from "../../utils/db.validators.js";

const api = Router()

api.post('/', validateJwt, saveCompanyValidator,saveCompany)

api.get('/', validateJwt, listCompanies)

api.get('/years/',validateJwt,listCompaniesByExperience)

api.get('/listbycategory/:category', validateJwt, listCompaniesByCategory)

api.get('/listalphabeticallyaz', validateJwt, listCompaniesAlphabeticallyAZ)

api.get('/listalphabeticallyza', validateJwt, listCompaniesAlphabeticallyZA);

api.put('/update/:id', validateJwt,objectIdValid,saveCompanyValidator2, updateCompany)

export default api