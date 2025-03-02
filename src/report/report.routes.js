import express from 'express';
import { generateReport } from './generateReport.js'

const router = express.Router()

router.get('/reporte', generateReport)

export default router