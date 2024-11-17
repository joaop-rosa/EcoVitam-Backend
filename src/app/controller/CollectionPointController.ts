import { Request, Response } from "express"
import { promisePool } from "../helpers/db"
import { validationResult } from "express-validator"
import { User } from "../types/types"
import { RowDataPacket } from "mysql2"

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
            COUNT(CASE WHEN l.is_liked = TRUE THEN 1 END) AS total_likes,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
            from ponto_de_coleta pc
            LEFT JOIN usuario u ON u.id = pc.user_id
            LEFT JOIN likes l ON l.ponto_coleta_id = pc.id
            WHERE pc.nome LIKE ? AND pc.cidade LIKE ?
            GROUP BY pc.id, u.id`,
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
            pc.id as id, 
            pc.nome as pontoColetaNome,
            pc.endereco as endereco,
            pc.estado as estado,
            pc.cidade as cidade,
            pc.contato as contato,
            COUNT(CASE WHEN l.is_liked = TRUE THEN 1 END) AS total_likes,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
            from ponto_de_coleta pc
            LEFT JOIN usuario u ON u.id = pc.user_id
            LEFT JOIN likes l ON l.ponto_coleta_id = pc.id
            WHERE pc.user_id = ?
            GROUP BY pc.id, u.id`,
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

  public async likes(req: Request, res: Response) {
    const user = JSON.parse(req.headers["user"] as string) as User
    const errors = validationResult(req)["errors"]
    if (errors.length) return res.status(422).json({ errors })

    const collectionPointId = req.params.collectionPointId
    const isLiked = req.params.isLiked

    try {
      await promisePool.query("START TRANSACTION")

      const [rows] = await promisePool.query<RowDataPacket[]>(
        `SELECT is_liked FROM likes
          WHERE user_id = ?
          AND ponto_coleta_id = ?`,
        [user.id, collectionPointId]
      )

      if (!rows.length) {
        await promisePool.query(
          `INSERT INTO likes
            (ponto_coleta_id, is_liked, user_id)
            VALUES (?, ?, ?)`,
          [collectionPointId, JSON.parse(isLiked), user.id]
        )
      } else if (!!rows[0].is_liked === !!JSON.parse(isLiked)) {
        await promisePool.query(
          `DELETE FROM likes
            WHERE user_id = ?
            AND ponto_coleta_id = ?`,
          [user.id, collectionPointId]
        )
      } else {
        await promisePool.query(
          `UPDATE likes
            SET is_liked = ?
            WHERE user_id = ?
            AND ponto_coleta_id = ?`,
          [JSON.parse(isLiked), user.id, collectionPointId]
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

    const collectionPointId = req.params.collectionPointId

    try {
      await promisePool.query("START TRANSACTION")

      const [rows] = await promisePool.query<RowDataPacket[]>(
        `SELECT true FROM denuncias
          WHERE user_id = ?
          AND ponto_coleta_id = ?`,
        [user.id, collectionPointId]
      )

      if (!rows.length) {
        await promisePool.query(
          `INSERT INTO denuncias
            (ponto_coleta_id, user_id)
            VALUES (?, ?)`,
          [collectionPointId, user.id]
        )

        const [rows] = await promisePool.query<RowDataPacket[]>(
          `SELECT
            COUNT(1) AS total_denuncias
            FROM denuncias
            WHERE ponto_coleta_id = ?`,
          [collectionPointId]
        )

        if (Number(rows[0].total_denuncias) >= 3) {
          await promisePool.query(
            `UPDATE eventos
              SET is_blocked = 1
              WHERE user_id = ?
              AND id = ?`,
            [user.id, collectionPointId]
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

    const collectionPointId = req.params.collectionPointId

    try {
      await promisePool.query("START TRANSACTION")

      await promisePool.query(
        `UPDATE ponto_de_coleta
          SET is_blocked = 1
          WHERE user_id = ?
          AND id = ?`,
        [user.id, collectionPointId]
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

export const collectionPointController = new ColletionPointController()
