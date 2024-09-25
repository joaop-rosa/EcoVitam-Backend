import express from "express"
import { firstController } from "../controller/FirstController"
import { registerValidator } from "../helpers/validators"
import { userController } from "../controller/UserController"

const router = express.Router()

router.get("/", firstController.home)
router.post("/user", registerValidator, userController.register)

export default router
