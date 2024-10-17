import { Request, Response } from "express"
import { promisePool } from "../helpers/db"
import { validationResult } from "express-validator"
import { User } from "../types/types"

class ArticleController {
  public async list(req: Request, res: Response) {
    try {
      await promisePool.query("START TRANSACTION")

      const [rows, fields] = await promisePool.query(
        `SELECT 
            a.id as id,
            a.titulo as titulo,
            a.url_imagem_capa as imagemUrl,
            a.conteudo as conteudo,
            CONCAT(u.primeiro_nome, ' ', u.ultimo_nome) AS nome_completo
        FROM artigo a
        LEFT JOIN usuario u ON u.id = a.user_id`
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
}

export const articleController = new ArticleController()
