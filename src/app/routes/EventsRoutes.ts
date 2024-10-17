import express from "express"
import { tokenValited } from "../helpers/auth"
import { eventsController } from "../controller/EventsController"
import { eventsValidator } from "../helpers/validators"

const router = express.Router()

router.use("*", tokenValited)
router.get("/eventos", eventsController.list)
router.post("/eventos", eventsValidator, eventsController.register)
router.get("/meus-eventos", eventsController.myList)

export default router
