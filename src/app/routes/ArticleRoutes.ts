import express from "express"
import { tokenValited } from "../helpers/auth"
import { articleController } from "../controller/ArticleController"

const router = express.Router()

router.use("*", tokenValited)
router.get("/artigo", articleController.list)
router.post("/artigo", articleController.register)

export default router
