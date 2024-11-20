"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CollectionPointController_1 = require("../controller/CollectionPointController");
var validators_1 = require("../helpers/validators");
var auth_1 = require("../helpers/auth");
var router = express_1.default.Router();
router.use("*", auth_1.tokenValited);
router.get("/ponto-coleta", CollectionPointController_1.collectionPointController.list);
router.post("/ponto-coleta", validators_1.collectionPointValidator, CollectionPointController_1.collectionPointController.register);
router.get("/meus-pontos-coleta", CollectionPointController_1.collectionPointController.myList);
router.post("/ponto-coleta-likes/:collectionPointId/:isLiked", validators_1.collectionPointLikesValidator, CollectionPointController_1.collectionPointController.likes);
router.post("/ponto-coleta-denuncia/:collectionPointId", validators_1.collectionPointParamValidator, CollectionPointController_1.collectionPointController.denuncia);
router.post("/ponto-coleta-delete/:collectionPointId", validators_1.collectionPointParamValidator, CollectionPointController_1.collectionPointController.delete);
exports.default = router;
