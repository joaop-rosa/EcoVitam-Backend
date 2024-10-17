import { body } from "express-validator"

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

export const eventsValidator = []
