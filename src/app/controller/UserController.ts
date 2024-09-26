import { Request, Response } from "express"
import { promisePool } from "../helpers/db"
import { validationResult } from "express-validator"
import { RowDataPacket } from "mysql2"
import { getPassword } from "../helpers/password"
import jsonwebtoken from "jsonwebtoken"

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

  public async login(req: Request, res: Response) {
    const [, hash] = req.headers.authorization?.split(" ") || [" ", " "]
    const [email, senha] = Buffer.from(hash, "base64").toString().split(":")

    const encryptedPassword = getPassword(senha)

    try {
      const [rows] = await promisePool.query<RowDataPacket[]>(
        "SELECT * FROM usuario where email = ? and senha = ?",
        [email, encryptedPassword]
      )

      const isCorrectPassword = rows.length

      if (!isCorrectPassword)
        return res.status(400).send("Password or E-mail incorrect!")

      const { senha, ...user } = rows[0]

      if (!process.env.JWT_KEY) {
        return res.status(500).send("Internal server error")
      }

      const token = jsonwebtoken.sign(
        { user: JSON.stringify(user) },
        process.env.JWT_KEY,
        {
          expiresIn: "60m",
        }
      )

      return res.status(200).json({ user, token })
    } catch (error) {
      console.log(error)
      return res.send(error)
    }
  }
}

export const userController = new UserController()
