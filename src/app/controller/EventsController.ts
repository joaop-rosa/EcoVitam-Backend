import { Request, Response } from "express"
import { promisePool } from "../helpers/db"
import { validationResult } from "express-validator"
import { User } from "../types/types"
import { RowDataPacket } from "mysql2"

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
            COUNT(CASE WHEN l.is_liked = TRUE THEN 1 END) AS total_likes,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
            from eventos e
            LEFT JOIN likes l ON l.event_id = e.id
            LEFT JOIN usuario u ON u.id = e.user_id
            WHERE e.titulo LIKE ? AND e.cidade LIKE ? AND e.is_blocked = 0
            GROUP BY e.id, u.id`,
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
            COUNT(CASE WHEN l.is_liked = TRUE THEN 1 END) AS total_likes,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
          FROM eventos e
          LEFT JOIN usuario u ON u.id = e.user_id
          LEFT JOIN likes l ON l.event_id = e.id
          WHERE e.user_id = ? AND e.is_blocked = 0
          GROUP BY e.id, u.id`,
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

  public async likes(req: Request, res: Response) {
    const user = JSON.parse(req.headers["user"] as string) as User
    const errors = validationResult(req)["errors"]
    if (errors.length) return res.status(422).json({ errors })

    const eventId = req.params.eventId
    const isLiked = req.params.isLiked

    try {
      await promisePool.query("START TRANSACTION")

      const [rows] = await promisePool.query<RowDataPacket[]>(
        `SELECT is_liked FROM likes
          WHERE user_id = ?
          AND event_id = ?`,
        [user.id, eventId]
      )

      if (!rows.length) {
        await promisePool.query(
          `INSERT INTO likes
            (event_id, is_liked, user_id)
            VALUES (?, ?, ?)`,
          [eventId, JSON.parse(isLiked), user.id]
        )
      } else if (!!rows[0].is_liked === !!JSON.parse(isLiked)) {
        await promisePool.query(
          `DELETE FROM likes
            WHERE user_id = ?
            AND event_id = ?`,
          [user.id, eventId]
        )
      } else {
        await promisePool.query(
          `UPDATE likes
            SET is_liked = ?
            WHERE user_id = ?
            AND event_id = ?`,
          [JSON.parse(isLiked), user.id, eventId]
        )
      }

      await promisePool.query("COMMIT")
      return res.status(200).send("Feedback enviado")
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }

  public async denuncia(req: Request, res: Response) {
    const user = JSON.parse(req.headers["user"] as string) as User
    const errors = validationResult(req)["errors"]
    if (errors.length) return res.status(422).json({ errors })

    const eventId = req.params.eventId

    try {
      await promisePool.query("START TRANSACTION")

      const [rows] = await promisePool.query<RowDataPacket[]>(
        `SELECT true FROM denuncias
          WHERE user_id = ?
          AND event_id = ?`,
        [user.id, eventId]
      )

      if (!rows.length) {
        await promisePool.query(
          `INSERT INTO denuncias
            (event_id, user_id)
            VALUES (?, ?)`,
          [eventId, user.id]
        )

        const [rows] = await promisePool.query<RowDataPacket[]>(
          `SELECT
            COUNT(1) AS total_denuncias
            FROM denuncias
            WHERE event_id = ?`,
          [eventId]
        )

        if (Number(rows[0].total_denuncias) >= 3) {
          await promisePool.query(
            `UPDATE eventos
              SET is_blocked = 1
              WHERE user_id = ?
              AND id = ?`,
            [user.id, eventId]
          )
        }
      }

      await promisePool.query("COMMIT")
      return res.status(200).send("Denuncia enviada")
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }

  public async delete(req: Request, res: Response) {
    const user = JSON.parse(req.headers["user"] as string) as User
    const errors = validationResult(req)["errors"]
    if (errors.length) return res.status(422).json({ errors })

    const eventId = req.params.eventId

    try {
      await promisePool.query("START TRANSACTION")

      await promisePool.query(
        `UPDATE eventos
          SET is_blocked = 1
          WHERE user_id = ?
          AND id = ?`,
        [user.id, eventId]
      )

      await promisePool.query("COMMIT")
      return res.status(200).send("Deletado com sucesso")
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }
}

export const eventsController = new EventsController()
