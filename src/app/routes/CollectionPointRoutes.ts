import express from "express"
import { collectionPointController } from "../controller/CollectionPointController"

const router = express.Router()

router.get("/ponto-coleta", collectionPointController.list)

export default router
