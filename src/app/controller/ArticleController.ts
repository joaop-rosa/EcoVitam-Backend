import { Request, Response } from "express"
import { promisePool } from "../helpers/db"
import { validationResult } from "express-validator"
import { User } from "../types/types"
import { FieldPacket, RowDataPacket } from "mysql2"

class ArticleController {
  public async list(req: Request, res: Response) {
    try {
      await promisePool.query("START TRANSACTION")

      const [rows, fields] = await promisePool.query(
        `SELECT 
            a.id as id,
            a.titulo as titulo,
            a.url_imagem_capa as imagemUrl
        FROM artigo a`
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
    if (!user.is_admin) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para realizar essa operação" })
    }
    const { titulo, conteudo, url_imagem_capa } = req.body

    try {
      await promisePool.query("START TRANSACTION")

      await promisePool.query(
        `INSERT INTO artigo
          (titulo, conteudo, url_imagem_capa, user_id)
          VALUES (?, ?, ?, ?)`,
        [titulo, conteudo, url_imagem_capa, user.id]
      )

      await promisePool.query("COMMIT")
      return res.status(200).send("Artigo criado com sucesso")
    } catch (err) {
      await promisePool.query("ROLLBACK")
      console.error(err)
      res.status(500).send("Internal Server Error")
    }
  }

  public async detailed(req: Request, res: Response) {
    const errors = validationResult(req)["errors"]
    if (errors.length) return res.status(422).json({ errors })

    const articleId = req.params.articleId

    try {
      await promisePool.query("START TRANSACTION")

      const [rows] = await promisePool.query<RowDataPacket[]>(
        `SELECT 
            a.id AS id,
            a.titulo AS titulo,
            a.url_imagem_capa AS imagemUrl,
            a.conteudo AS conteudo,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo,
            COUNT(CASE WHEN l.is_liked = 1 THEN 1 END) AS total_likes,
            COUNT(CASE WHEN l.is_liked = 0 THEN 1 END) AS total_dislikes
        FROM artigo a
        LEFT JOIN usuario u ON u.id = a.user_id
        LEFT JOIN likes l ON l.artigo_id = a.id
        WHERE a.id = ?
        GROUP BY a.id, u.id;
        `,
        [articleId]
      )
      await promisePool.query("COMMIT")
      return res.status(200).json(rows[0])
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

    const articleId = req.params.articleId
    const isLiked = req.params.isLiked

    try {
      await promisePool.query("START TRANSACTION")

      // Verificar se já deu like
      const [rows] = await promisePool.query<RowDataPacket[]>(
        `SELECT is_liked FROM likes
          WHERE user_id = ?
          AND artigo_id = ?`,
        [user.id, articleId]
      )

      if (!rows.length) {
        await promisePool.query(
          `INSERT INTO likes
            (artigo_id, is_liked, user_id)
            VALUES (?, ?, ?)`,
          [articleId, JSON.parse(isLiked), user.id]
        )
      } else if (!!rows[0].is_liked === !!JSON.parse(isLiked)) {
        await promisePool.query(
          `DELETE FROM likes
            WHERE user_id = ?
            AND artigo_id = ?`,
          [user.id, articleId]
        )
      } else {
        await promisePool.query(
          `UPDATE likes
            SET is_liked = ?
            WHERE user_id = ?
            AND artigo_id = ?`,
          [JSON.parse(isLiked), user.id, articleId]
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
}

export const articleController = new ArticleController()
