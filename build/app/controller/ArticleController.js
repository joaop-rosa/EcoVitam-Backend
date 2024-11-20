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
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleController = void 0;
var db_1 = require("../helpers/db");
var express_validator_1 = require("express-validator");
var ArticleController = /** @class */ (function () {
    function ArticleController() {
    }
    ArticleController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rows, fields, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 6]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("SELECT \n            a.id as id,\n            a.titulo as titulo,\n            a.url_imagem_capa as imagemUrl\n        FROM artigo a")];
                    case 2:
                        _a = _b.sent(), rows = _a[0], fields = _a[1];
                        return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json(rows)];
                    case 4:
                        err_1 = _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 5:
                        _b.sent();
                        console.error(err_1);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ArticleController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, _a, titulo, conteudo, url_imagem_capa, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        errors = (0, express_validator_1.validationResult)(req)["errors"];
                        if (errors.length)
                            return [2 /*return*/, res.status(422).json({ errors: errors })];
                        if (!user.is_admin) {
                            return [2 /*return*/, res
                                    .status(403)
                                    .json({ message: "Você não tem permissão para realizar essa operação" })];
                        }
                        _a = req.body, titulo = _a.titulo, conteudo = _a.conteudo, url_imagem_capa = _a.url_imagem_capa;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 7]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("INSERT INTO artigo\n          (titulo, conteudo, url_imagem_capa, user_id)\n          VALUES (?, ?, ?, ?)", [titulo, conteudo, url_imagem_capa, user.id])];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send("Artigo criado com sucesso")];
                    case 5:
                        err_2 = _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 6:
                        _b.sent();
                        console.error(err_2);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ArticleController.prototype.detailed = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, articleId, rows, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        errors = (0, express_validator_1.validationResult)(req)["errors"];
                        if (errors.length)
                            return [2 /*return*/, res.status(422).json({ errors: errors })];
                        articleId = req.params.articleId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 7]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("SELECT \n            a.id AS id,\n            a.titulo AS titulo,\n            a.url_imagem_capa AS imagemUrl,\n            a.conteudo AS conteudo,\n            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo,\n            COUNT(CASE WHEN l.is_liked = 1 THEN 1 END) AS total_likes,\n            COUNT(CASE WHEN l.is_liked = 0 THEN 1 END) AS total_dislikes,\n            MAX(CASE WHEN l.user_id = ? THEN l.is_liked END) AS user_feedback\n          FROM artigo a\n          LEFT JOIN usuario u ON u.id = a.user_id\n          LEFT JOIN likes l ON l.artigo_id = a.id\n          WHERE a.id = ?\n          GROUP BY a.id, u.id\n        ", [user.id, articleId])];
                    case 3:
                        rows = (_a.sent())[0];
                        return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json(rows[0])];
                    case 5:
                        err_3 = _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 6:
                        _a.sent();
                        console.error(err_3);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ArticleController.prototype.likes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, articleId, isLiked, rows, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        errors = (0, express_validator_1.validationResult)(req)["errors"];
                        if (errors.length)
                            return [2 /*return*/, res.status(422).json({ errors: errors })];
                        articleId = req.params.articleId;
                        isLiked = req.params.isLiked;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 13]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("SELECT is_liked FROM likes\n          WHERE user_id = ?\n          AND artigo_id = ?", [user.id, articleId])];
                    case 3:
                        rows = (_a.sent())[0];
                        if (!!rows.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, db_1.promisePool.query("INSERT INTO likes\n            (artigo_id, is_liked, user_id)\n            VALUES (?, ?, ?)", [articleId, JSON.parse(isLiked), user.id])];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(!!rows[0].is_liked === !!JSON.parse(isLiked))) return [3 /*break*/, 7];
                        return [4 /*yield*/, db_1.promisePool.query("DELETE FROM likes\n            WHERE user_id = ?\n            AND artigo_id = ?", [user.id, articleId])];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, db_1.promisePool.query("UPDATE likes\n            SET is_liked = ?\n            WHERE user_id = ?\n            AND artigo_id = ?", [JSON.parse(isLiked), user.id, articleId])];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send("Feedback enviado")];
                    case 11:
                        err_4 = _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 12:
                        _a.sent();
                        console.error(err_4);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    return ArticleController;
}());
exports.articleController = new ArticleController();
