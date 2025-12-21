import express from "express"
import { getAdminReports } from "../controllers/adminReports.controller.js"

const router = express.Router()

router.get("/reports", getAdminReports)

export default router