"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
var db_1 = require("../helpers/db");
var express_validator_1 = require("express-validator");
var password_1 = require("../helpers/password");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.checkToken = function (req, res) {
        return res.status(200).send("Token válido");
    };
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, senha, primeiro_nome, ultimo_nome, data_nascimento, estado, cidade, errors, rows, encryptedPassword, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, senha = _a.senha, primeiro_nome = _a.primeiro_nome, ultimo_nome = _a.ultimo_nome, data_nascimento = _a.data_nascimento, estado = _a.estado, cidade = _a.cidade;
                        errors = (0, express_validator_1.validationResult)(req)["errors"];
                        if (errors.length)
                            return [2 /*return*/, res.status(422).json({ errors: errors })];
                        return [4 /*yield*/, db_1.promisePool.query("SELECT 1 FROM usuario WHERE email = ?", [email])];
                    case 1:
                        rows = (_b.sent())[0];
                        if (rows.length) {
                            return [2 /*return*/, res.status(400).json("O e-mail já está cadastrado")];
                        }
                        encryptedPassword = (0, password_1.getPassword)(senha);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("INSERT INTO usuario\n        (email, senha, primeiro_nome, ultimo_nome, data_nascimento, estado, cidade)\n        VALUES (?, ?, ?, ?, ?, ?, ?)", [
                                email,
                                encryptedPassword,
                                primeiro_nome,
                                ultimo_nome,
                                data_nascimento,
                                estado,
                                cidade,
                            ])];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send("Usuário criado com sucesso")];
                    case 6:
                        err_1 = _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 7:
                        _b.sent();
                        console.error(err_1);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, hash, _b, email, senha, encryptedPassword, rows, isCorrectPassword, _c, senha_1, user, token, error_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = ((_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(" ")) || [" ", " "], hash = _a[1];
                        _b = Buffer.from(hash, "base64").toString().split(":"), email = _b[0], senha = _b[1];
                        encryptedPassword = (0, password_1.getPassword)(senha);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_1.promisePool.query("SELECT * FROM usuario where email = ? and senha = ?", [email, encryptedPassword])];
                    case 2:
                        rows = (_e.sent())[0];
                        isCorrectPassword = rows.length;
                        if (!isCorrectPassword)
                            return [2 /*return*/, res.status(400).send("Password or E-mail incorrect!")];
                        _c = rows[0], senha_1 = _c.senha, user = __rest(_c, ["senha"]);
                        if (!process.env.JWT_KEY) {
                            return [2 /*return*/, res.status(500).send("Internal server error")];
                        }
                        token = jsonwebtoken_1.default.sign({ user: JSON.stringify(user) }, process.env.JWT_KEY, {
                            expiresIn: "60m",
                        });
                        return [2 /*return*/, res.status(200).json({ user: user, token: token })];
                    case 3:
                        error_1 = _e.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.send(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.userController = new UserController();
