import { body, param } from "express-validator"

export const registerValidator = [
  body("email", "Invalid email").isEmail().not().isEmpty(),
  body("senha", "senha does not Empty").not().isEmpty(),
  body("primeiro_nome", "primeiro_nome does not Empty")
    .isString()
    .not()
    .isEmpty(),
  body("ultimo_nome", "ultimo_nome does not Empty").isString().not().isEmpty(),
  body("estado", "estado does not Empty")
    .isString()
    .isLength({ min: 2, max: 2 })
    .not()
    .isEmpty(),
  body("cidade", "cidade does not Empty").isString().not().isEmpty(),
  body("data_nascimento", "Invalid birthday")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .isISO8601()
    .not()
    .isEmpty(),
]

export const collectionPointValidator = [
  body("nome", "Nome de ponto de coleta inválido").isString().not().isEmpty(),
  body("endereco", "Endereço de ponto de coleta inválido")
    .isString()
    .not()
    .isEmpty(),
  body("estado", "Estado de ponto de coleta inválido")
    .isString()
    .not()
    .isEmpty(),
  body("cidade", "Cidade de ponto de coleta inválido")
    .isString()
    .not()
    .isEmpty(),
  body("contato", "Contato de ponto de coleta inválido")
    .isString()
    .not()
    .isEmpty(),
]

export const eventsValidator = [
  body("titulo", "Titulo do evento inválido").isString().not().isEmpty(),
  body("endereco", "Endereço do evento inválido").isString().not().isEmpty(),
  body("estado", "Estado do estado inválido").isString().not().isEmpty(),
  body("cidade", "Cidade do evento inválida").isString().not().isEmpty(),
  body("contato", "Contato do evento inválido").isString().not().isEmpty(),
  body("data", "Data do evento inválida")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .isISO8601()
    .not()
    .isEmpty(),
  body("horaInicio", "Hora de início do evento inválida")
    .isString()
    .not()
    .isEmpty(),
  body("horaFim", "Hora do fim do evento inválida").isString().not().isEmpty(),
]

export const articleValidator = [
  body("titulo", "Titulo do artigo é inválido").isString().not().isEmpty(),
  body("url_imagem_capa", "Imagem do artigo é inválido")
    .isString()
    .not()
    .isEmpty(),
  body("conteudo", "Conteudo do artigo é inválido").isString().not().isEmpty(),
]

export const articleParamValidator = [
  param("articleId", "articleId must be valid").isNumeric(),
]

export const articleLikesParamValidator = [
  param("articleId", "articleId must be valid").isNumeric(),
  param("isLiked", "isLiked must be valid").isBoolean(),
]

export const collectionPointLikesValidator = [
  param("collectionPointId", "collectionPointId must be valid").isNumeric(),
  param("isLiked", "isLiked must be valid").isBoolean(),
]

export const eventLikesValidator = [
  param("eventId", "collectionPointId must be valid").isNumeric(),
  param("isLiked", "isLiked must be valid").isBoolean(),
]
