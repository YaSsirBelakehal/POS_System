import express from "express"
import { getAdminSettings, updateAdminSettings } from "../controllers/adminSettingsController.js"
import { protectAdmin, authorizeAdmin } from "../middlewares/adminAuth.js"

const router = express.Router()



router.get("/", getAdminSettings)
router.put("/", updateAdminSettings)

export default router