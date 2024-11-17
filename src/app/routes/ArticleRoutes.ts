import express from "express"
import { tokenValited } from "../helpers/auth"
import { articleController } from "../controller/ArticleController"
import {
  articleLikesParamValidator,
  articleParamValidator,
} from "../helpers/validators"

const router = express.Router()

router.use("*", tokenValited)
router.get("/artigo", articleController.list)
router.post("/artigo", articleController.register)
router.get(
  "/artigo/:articleId",
  articleParamValidator,
  articleController.detailed
)
router.post(
  "/artigo-likes/:articleId/:isLiked",
  articleLikesParamValidator,
  articleController.likes
)

export default router
