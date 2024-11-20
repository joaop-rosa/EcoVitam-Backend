"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValited = tokenValited;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function tokenValited(request, response, next) {
    var authorization = request.headers.authorization;
    var _a = (authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")) || ["", ""], token = _a[1];
    if (!process.env.JWT_KEY) {
        var message = "Ocorreu um erro desconhecido com a validação";
        return response.status(500).json({ message: message });
    }
    if (!token) {
        var message = "Nenhum token provisionado";
        return response.status(401).json({ message: message });
    }
    try {
        var payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        if (typeof payload === "object" && payload !== null && "user" in payload) {
            var user = payload.user; // Tipar corretamente o 'user'
            request.headers["user"] = user;
            return next();
        }
        else {
            var message = "Token inválido";
            return response.status(401).json({ message: message });
        }
    }
    catch (error) {
        console.error(error);
        var message = "Token inválido";
        return response.status(401).json({ message: message });
    }
}
