"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../helpers/auth");
var EventsController_1 = require("../controller/EventsController");
var validators_1 = require("../helpers/validators");
var router = express_1.default.Router();
router.use("*", auth_1.tokenValited);
router.get("/eventos", EventsController_1.eventsController.list);
router.post("/eventos", validators_1.eventsValidator, EventsController_1.eventsController.register);
router.get("/meus-eventos", EventsController_1.eventsController.myList);
router.post("/eventos-likes/:eventId/:isLiked", validators_1.eventLikesValidator, EventsController_1.eventsController.likes);
router.post("/eventos-denuncia/:eventId", validators_1.eventParamValidator, EventsController_1.eventsController.denuncia);
router.post("/eventos-delete/:eventId", validators_1.eventParamValidator, EventsController_1.eventsController.delete);
exports.default = router;
