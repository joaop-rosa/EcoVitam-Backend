import express from "express"
import { collectionPointController } from "../controller/CollectionPointController"
import { collectionPointValidator } from "../helpers/validators"
import { tokenValited } from "../helpers/auth"

const router = express.Router()

router.use("*", tokenValited)
router.get("/ponto-coleta", collectionPointController.list)
router.post(
  "/ponto-coleta",
  collectionPointValidator,
  collectionPointController.register
)

export default router
