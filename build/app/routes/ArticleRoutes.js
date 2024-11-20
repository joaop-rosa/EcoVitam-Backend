"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../helpers/auth");
var ArticleController_1 = require("../controller/ArticleController");
var validators_1 = require("../helpers/validators");
var router = express_1.default.Router();
router.use("*", auth_1.tokenValited);
router.get("/artigo", ArticleController_1.articleController.list);
router.post("/artigo", ArticleController_1.articleController.register);
router.get("/artigo/:articleId", validators_1.articleParamValidator, ArticleController_1.articleController.detailed);
router.post("/artigo-likes/:articleId/:isLiked", validators_1.articleLikesParamValidator, ArticleController_1.articleController.likes);
exports.default = router;
