import express from "express"
import { collectionPointController } from "../controller/CollectionPointController"
import {
  collectionPointLikesValidator,
  collectionPointParamValidator,
  collectionPointValidator,
} from "../helpers/validators"
import { tokenValited } from "../helpers/auth"

const router = express.Router()

router.use("*", tokenValited)
router.get("/ponto-coleta", collectionPointController.list)
router.post(
  "/ponto-coleta",
  collectionPointValidator,
  collectionPointController.register
)
router.get("/meus-pontos-coleta", collectionPointController.myList)
router.post(
  "/ponto-coleta-likes/:collectionPointId/:isLiked",
  collectionPointLikesValidator,
  collectionPointController.likes
)
router.post(
  "/ponto-coleta-denuncia/:collectionPointId",
  collectionPointParamValidator,
  collectionPointController.denuncia
)

export default router
