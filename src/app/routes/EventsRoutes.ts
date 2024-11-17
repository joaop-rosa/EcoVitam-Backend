import express from "express"
import { tokenValited } from "../helpers/auth"
import { eventsController } from "../controller/EventsController"
import {
  eventLikesValidator,
  eventParamValidator,
  eventsValidator,
} from "../helpers/validators"

const router = express.Router()

router.use("*", tokenValited)
router.get("/eventos", eventsController.list)
router.post("/eventos", eventsValidator, eventsController.register)
router.get("/meus-eventos", eventsController.myList)
router.post(
  "/eventos-likes/:eventId/:isLiked",
  eventLikesValidator,
  eventsController.likes
)
router.post(
  "/eventos-denuncia/:eventId",
  eventParamValidator,
  eventsController.denuncia
)
router.post(
  "/eventos-delete/:eventId",
  eventParamValidator,
  eventsController.delete
)

export default router
