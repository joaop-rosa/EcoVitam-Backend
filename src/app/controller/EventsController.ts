import { Request, Response } from "express"
import { promisePool } from "../helpers/db"
import { validationResult } from "express-validator"
import { User } from "../types/types"

class EventsController {
  public async list(req: Request, res: Response) {
    const { nome, cidade } = req.query

    try {
      await promisePool.query("START TRANSACTION")

      const [rows, fields] = await promisePool.query(
        `SELECT 
            e.id as id,
            e.titulo as titulo,
            e.endereco as endereco,
            e.estado as estado,
            e.cidade as cidade,
            e.contato as contato,
            e.data as data,
            e.hora_inicio as hora_inicio,
            e.hora_fim as hora_fim,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
            from eventos e
            LEFT JOIN usuario u ON u.id = e.user_id
            WHERE e.titulo LIKE ? AND e.cidade LIKE ?`,
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
    const user = JSON.parse(req.headers["user"] as string) as User
    try {
      await promisePool.query("START TRANSACTION")

      const [rows, fields] = await promisePool.query(
        `SELECT 
            e.id as id,
            e.titulo as titulo,
            e.endereco as endereco,
            e.estado as estado,
            e.cidade as cidade,
            e.contato as contato,
            e.data as data,
            e.hora_inicio as hora_inicio,
            e.hora_fim as hora_fim,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
          FROM eventos e
          LEFT JOIN usuario u ON u.id = e.user_id
          WHERE e.user_id = ?`,
        [user.id]
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
    const {
      titulo,
      endereco,
      estado,
      cidade,
      contato,
      data,
      horaInicio,
      horaFim,
    } = req.body

    try {
      await promisePool.query("START TRANSACTION")

      await promisePool.query(
        `INSERT INTO eventos
        (titulo, endereco, estado, cidade, contato, data, hora_inicio, hora_fim, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          titulo,
          endereco,
          estado,
          cidade,
          contato,
          data,
          horaInicio,
          horaFim,
          user.id,
        ]
      )

      await promisePool.query("COMMIT")
      return res.status(200).send("Evento criado com sucesso")
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }
}

export const eventsController = new EventsController()
