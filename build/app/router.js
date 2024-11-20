"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
var CollectionPointRoutes_1 = __importDefault(require("./routes/CollectionPointRoutes"));
var EventsRoutes_1 = __importDefault(require("./routes/EventsRoutes"));
var ArticleRoutes_1 = __importDefault(require("./routes/ArticleRoutes"));
var router = (0, express_1.Router)();
exports.router = router;
router.use(UserRoutes_1.default);
router.use(CollectionPointRoutes_1.default);
router.use(EventsRoutes_1.default);
router.use(ArticleRoutes_1.default);
