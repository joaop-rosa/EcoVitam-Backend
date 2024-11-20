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
exports.collectionPointController = void 0;
var db_1 = require("../helpers/db");
var express_validator_1 = require("express-validator");
var ColletionPointController = /** @class */ (function () {
    function ColletionPointController() {
    }
    ColletionPointController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, nome, cidade, _b, rows, fields, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        _a = req.query, nome = _a.nome, cidade = _a.cidade;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 7]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, db_1.promisePool.query("SELECT\n            pc.id AS id,\n            pc.nome AS pontoColetaNome,\n            pc.endereco AS endereco,\n            pc.estado AS estado,\n            pc.cidade AS cidade,\n            pc.contato AS contato,\n            COUNT(CASE WHEN l.is_liked = TRUE THEN 1 END) AS total_likes,\n            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo,\n            MAX(CASE WHEN l.user_id = ? AND l.is_liked = TRUE THEN 1 ELSE 0 END) AS is_user_liked\n        FROM ponto_de_coleta pc\n        LEFT JOIN usuario u ON u.id = pc.user_id\n        LEFT JOIN likes l ON l.ponto_coleta_id = pc.id\n        WHERE pc.nome LIKE ?\n          AND pc.cidade LIKE ?\n          AND pc.is_blocked = 0\n        GROUP BY pc.id, u.id;", [user.id, "%".concat(nome !== null && nome !== void 0 ? nome : "", "%"), "%".concat(cidade !== null && cidade !== void 0 ? cidade : "", "%")])];
                    case 3:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, res.status(200).json(rows)];
                    case 5:
                        err_1 = _c.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 6:
                        _c.sent();
                        console.error(err_1);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ColletionPointController.prototype.myList = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, rows, fields, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 7]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("SELECT \n            pc.id as id, \n            pc.nome as pontoColetaNome,\n            pc.endereco as endereco,\n            pc.estado as estado,\n            pc.cidade as cidade,\n            pc.contato as contato,\n            COUNT(CASE WHEN l.is_liked = TRUE THEN 1 END) AS total_likes,\n            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo\n            from ponto_de_coleta pc\n            LEFT JOIN usuario u ON u.id = pc.user_id\n            LEFT JOIN likes l ON l.ponto_coleta_id = pc.id\n            WHERE pc.user_id = ? AND pc.is_blocked = 0\n            GROUP BY pc.id, u.id", [user.id])];
                    case 3:
                        _a = _b.sent(), rows = _a[0], fields = _a[1];
                        return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json(rows)];
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
    ColletionPointController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, _a, nome, endereco, estado, cidade, contato, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        errors = (0, express_validator_1.validationResult)(req)["errors"];
                        if (errors.length)
                            return [2 /*return*/, res.status(422).json({ errors: errors })];
                        _a = req.body, nome = _a.nome, endereco = _a.endereco, estado = _a.estado, cidade = _a.cidade, contato = _a.contato;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 7]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("INSERT INTO ponto_de_coleta\n        (nome, endereco, estado, cidade, contato, user_id)\n        VALUES (?, ?, ?, ?, ?, ?)", [nome, endereco, estado, cidade, contato, user.id])];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send("Ponto de coleta criado com sucesso")];
                    case 5:
                        err_3 = _b.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 6:
                        _b.sent();
                        console.error(err_3);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ColletionPointController.prototype.likes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, collectionPointId, isLiked, rows, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        errors = (0, express_validator_1.validationResult)(req)["errors"];
                        if (errors.length)
                            return [2 /*return*/, res.status(422).json({ errors: errors })];
                        collectionPointId = req.params.collectionPointId;
                        isLiked = req.params.isLiked;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 13]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("SELECT is_liked FROM likes\n          WHERE user_id = ?\n          AND ponto_coleta_id = ?", [user.id, collectionPointId])];
                    case 3:
                        rows = (_a.sent())[0];
                        if (!!rows.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, db_1.promisePool.query("INSERT INTO likes\n            (ponto_coleta_id, is_liked, user_id)\n            VALUES (?, ?, ?)", [collectionPointId, JSON.parse(isLiked), user.id])];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(!!rows[0].is_liked === !!JSON.parse(isLiked))) return [3 /*break*/, 7];
                        return [4 /*yield*/, db_1.promisePool.query("DELETE FROM likes\n            WHERE user_id = ?\n            AND ponto_coleta_id = ?", [user.id, collectionPointId])];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, db_1.promisePool.query("UPDATE likes\n            SET is_liked = ?\n            WHERE user_id = ?\n            AND ponto_coleta_id = ?", [JSON.parse(isLiked), user.id, collectionPointId])];
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
    ColletionPointController.prototype.denuncia = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, collectionPointId, rows, rows_1, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        errors = (0, express_validator_1.validationResult)(req)["errors"];
                        if (errors.length)
                            return [2 /*return*/, res.status(422).json({ errors: errors })];
                        collectionPointId = req.params.collectionPointId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 11]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("SELECT true FROM denuncias\n          WHERE user_id = ?\n          AND ponto_coleta_id = ?", [user.id, collectionPointId])];
                    case 3:
                        rows = (_a.sent())[0];
                        if (!!rows.length) return [3 /*break*/, 7];
                        return [4 /*yield*/, db_1.promisePool.query("INSERT INTO denuncias\n            (ponto_coleta_id, user_id)\n            VALUES (?, ?)", [collectionPointId, user.id])];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("SELECT\n            COUNT(1) AS total_denuncias\n            FROM denuncias\n            WHERE ponto_coleta_id = ?", [collectionPointId])];
                    case 5:
                        rows_1 = (_a.sent())[0];
                        if (!(Number(rows_1[0].total_denuncias) >= 3)) return [3 /*break*/, 7];
                        return [4 /*yield*/, db_1.promisePool.query("UPDATE eventos\n              SET is_blocked = 1\n              WHERE user_id = ?\n              AND id = ?", [user.id, collectionPointId])];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send("Denuncia enviada")];
                    case 9:
                        err_5 = _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 10:
                        _a.sent();
                        console.error(err_5);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ColletionPointController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, collectionPointId, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = JSON.parse(req.headers["user"]);
                        errors = (0, express_validator_1.validationResult)(req)["errors"];
                        if (errors.length)
                            return [2 /*return*/, res.status(422).json({ errors: errors })];
                        collectionPointId = req.params.collectionPointId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 7]);
                        return [4 /*yield*/, db_1.promisePool.query("START TRANSACTION")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("UPDATE ponto_de_coleta\n          SET is_blocked = 1\n          WHERE user_id = ?\n          AND id = ?", [user.id, collectionPointId])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("COMMIT")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send("Deletado com sucesso")];
                    case 5:
                        err_6 = _a.sent();
                        return [4 /*yield*/, db_1.promisePool.query("ROLLBACK")];
                    case 6:
                        _a.sent();
                        console.error(err_6);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return ColletionPointController;
}());
exports.collectionPointController = new ColletionPointController();
