import { Request, Response } from "express"
import { promisePool } from "../helpers/db"
import { validationResult } from "express-validator"
import { RowDataPacket } from "mysql2"
import { getPassword } from "../helpers/password"

class UserController {
  public async register(req: Request, res: Response) {
    const {
      email,
      senha,
      primeiro_nome,
      ultimo_nome,
      data_nascimento,
      estado,
      cidade,
    } = req.body
    const errors = validationResult(req)["errors"]
    if (errors.length) return res.status(422).json({ errors })

    const [rows] = await promisePool.query<RowDataPacket[]>(
      "SELECT 1 FROM usuario WHERE email = ?",
      [email]
    )

    if (rows.length) {
      return res.status(400).json("O e-mail já está cadastrado")
    }

    const encryptedPassword = getPassword(senha)

    try {
      await promisePool.query("START TRANSACTION")

      await promisePool.query(
        `INSERT INTO usuario
        (email, senha, primeiro_nome, ultimo_nome, data_nascimento, estado, cidade)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          email,
          encryptedPassword,
          primeiro_nome,
          ultimo_nome,
          data_nascimento,
          estado,
          cidade,
        ]
      )

      await promisePool.query("COMMIT")
      return res.status(200).send("Usuário criado com sucesso")
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }
}

export const userController = new UserController()
