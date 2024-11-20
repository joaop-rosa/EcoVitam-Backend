"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var router_1 = require("./router");
var logger = function (req, res, next) {
    console.log("".concat(req.method, " ").concat(req.url));
    console.log(req.body);
    next();
};
var App = /** @class */ (function () {
    function App() {
        this.server = (0, express_1.default)();
        this.middleware();
        this.router();
    }
    App.prototype.middleware = function () {
        this.server.use(express_1.default.json());
        this.server.use(logger);
    };
    App.prototype.router = function () {
        this.server.use(router_1.router);
    };
    return App;
}());
exports.App = App;
