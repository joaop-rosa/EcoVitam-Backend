import express from "express"
import { firstController } from "../controller/FirstController"
import { registerValidator } from "../helpers/validators"
import { userController } from "../controller/UserController"
import { tokenValited } from "../helpers/auth"

const router = express.Router()

router.get("/", firstController.home)
router.post("/user", registerValidator, userController.register)
router.post("/login", userController.login)

router.use("*", tokenValited)
router.get("/check-token", userController.checkToken)

export default router
