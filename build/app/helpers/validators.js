"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionPointParamValidator = exports.eventParamValidator = exports.eventLikesValidator = exports.collectionPointLikesValidator = exports.articleLikesParamValidator = exports.articleParamValidator = exports.articleValidator = exports.eventsValidator = exports.collectionPointValidator = exports.registerValidator = void 0;
var express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("email", "Invalid email").isEmail().not().isEmpty(),
    (0, express_validator_1.body)("senha", "senha does not Empty").not().isEmpty(),
    (0, express_validator_1.body)("primeiro_nome", "primeiro_nome does not Empty")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("ultimo_nome", "ultimo_nome does not Empty").isString().not().isEmpty(),
    (0, express_validator_1.body)("estado", "estado does not Empty")
        .isString()
        .isLength({ min: 2, max: 2 })
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("cidade", "cidade does not Empty").isString().not().isEmpty(),
    (0, express_validator_1.body)("data_nascimento", "Invalid birthday")
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .isISO8601()
        .not()
        .isEmpty(),
];
exports.collectionPointValidator = [
    (0, express_validator_1.body)("nome", "Nome de ponto de coleta inválido").isString().not().isEmpty(),
    (0, express_validator_1.body)("endereco", "Endereço de ponto de coleta inválido")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("estado", "Estado de ponto de coleta inválido")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("cidade", "Cidade de ponto de coleta inválido")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("contato", "Contato de ponto de coleta inválido")
        .isString()
        .not()
        .isEmpty(),
];
exports.eventsValidator = [
    (0, express_validator_1.body)("titulo", "Titulo do evento inválido").isString().not().isEmpty(),
    (0, express_validator_1.body)("endereco", "Endereço do evento inválido").isString().not().isEmpty(),
    (0, express_validator_1.body)("estado", "Estado do estado inválido").isString().not().isEmpty(),
    (0, express_validator_1.body)("cidade", "Cidade do evento inválida").isString().not().isEmpty(),
    (0, express_validator_1.body)("contato", "Contato do evento inválido").isString().not().isEmpty(),
    (0, express_validator_1.body)("data", "Data do evento inválida")
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .isISO8601()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("horaInicio", "Hora de início do evento inválida")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("horaFim", "Hora do fim do evento inválida").isString().not().isEmpty(),
];
exports.articleValidator = [
    (0, express_validator_1.body)("titulo", "Titulo do artigo é inválido").isString().not().isEmpty(),
    (0, express_validator_1.body)("url_imagem_capa", "Imagem do artigo é inválido")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("conteudo", "Conteudo do artigo é inválido").isString().not().isEmpty(),
];
exports.articleParamValidator = [
    (0, express_validator_1.param)("articleId", "articleId must be valid").isNumeric(),
];
exports.articleLikesParamValidator = [
    (0, express_validator_1.param)("articleId", "articleId must be valid").isNumeric(),
    (0, express_validator_1.param)("isLiked", "isLiked must be valid").isBoolean(),
];
exports.collectionPointLikesValidator = [
    (0, express_validator_1.param)("collectionPointId", "collectionPointId must be valid").isNumeric(),
    (0, express_validator_1.param)("isLiked", "isLiked must be valid").isBoolean(),
];
exports.eventLikesValidator = [
    (0, express_validator_1.param)("eventId", "collectionPointId must be valid").isNumeric(),
    (0, express_validator_1.param)("isLiked", "isLiked must be valid").isBoolean(),
];
exports.eventParamValidator = [
    (0, express_validator_1.param)("eventId", "eventId must be valid").isNumeric(),
];
exports.collectionPointParamValidator = [
    (0, express_validator_1.param)("collectionPointId", "collectionPointId must be valid").isNumeric(),
];
