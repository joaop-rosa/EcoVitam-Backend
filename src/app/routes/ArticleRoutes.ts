import express from "express"
import { tokenValited } from "../helpers/auth"
import { articleController } from "../controller/ArticleController"
import { articleParamValidator } from "../helpers/validators"

const router = express.Router()

router.use("*", tokenValited)
router.get("/artigo", articleController.list)
router.post("/artigo", articleController.register)
router.get(
  "/artigo/:articleId",
  articleParamValidator,
  articleController.detailed
)

export default router
