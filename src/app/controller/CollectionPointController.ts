import { Request, Response } from "express"
import { promisePool } from "../helpers/db"
import { validationResult } from "express-validator"
import { User } from "../types/types"

class ColletionPointController {
  public async list(req: Request, res: Response) {
    const { nome, cidade } = req.query

    try {
      await promisePool.query("START TRANSACTION")

      const [rows, fields] = await promisePool.query(
        `SELECT
            pc.id as id, 
            pc.nome as pontoColetaNome,
            pc.endereco as endereco,
            pc.estado as estado,
            pc.cidade as cidade,
            pc.contato as contato,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
            from ponto_de_coleta pc
            LEFT JOIN usuario u ON u.id = pc.user_id
            WHERE pc.nome LIKE ? AND pc.cidade LIKE ?`,
        [`%${nome ?? ""}%`, `%${cidade ?? ""}%`]
      )

      await promisePool.query("COMMIT")
      return res.status(200).json(rows)
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }

  public async myList(req: Request, res: Response) {
    const { nome, cidade } = req.query

    try {
      await promisePool.query("START TRANSACTION")

      const [rows, fields] = await promisePool.query(
        `SELECT 
            pc.nome as pontoColetaNome,
            pc.endereco as endereco,
            pc.estado as estado,
            pc.cidade as cidade,
            pc.contato as contato,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
            from ponto_de_coleta pc
            LEFT JOIN usuario u ON u.id = pc.user_id
            WHERE pc.nome LIKE ? AND pc.cidade LIKE ?`,
        [`%${nome ?? ""}%`, `%${cidade ?? ""}%`]
      )

      await promisePool.query("COMMIT")
      return res.status(200).json(rows)
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }

  public async register(req: Request, res: Response) {
    const user = JSON.parse(req.headers["user"] as string) as User
    const errors = validationResult(req)["errors"]
    if (errors.length) return res.status(422).json({ errors })
    const { nome, endereco, estado, cidade, contato } = req.body

    try {
      await promisePool.query("START TRANSACTION")

      await promisePool.query(
        `INSERT INTO ponto_de_coleta
        (nome, endereco, estado, cidade, contato, user_id)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [nome, endereco, estado, cidade, contato, user.id]
      )

      await promisePool.query("COMMIT")
      return res.status(200).send("Ponto de coleta criado com sucesso")
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }
}

export const collectionPointController = new ColletionPointController()
