"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var FirstController_1 = require("../controller/FirstController");
var validators_1 = require("../helpers/validators");
var UserController_1 = require("../controller/UserController");
var auth_1 = require("../helpers/auth");
var router = express_1.default.Router();
router.get("/", FirstController_1.firstController.home);
router.post("/user", validators_1.registerValidator, UserController_1.userController.register);
router.post("/login", UserController_1.userController.login);
router.use("*", auth_1.tokenValited);
router.get("/check-token", UserController_1.userController.checkToken);
exports.default = router;
