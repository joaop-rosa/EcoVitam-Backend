import { Request, Response } from "express"
import { promisePool } from "../helpers/db"

class FirstController {
  public async home(req: Request, res: Response) {
    const [rows, fields] = await promisePool.query(
      "SELECT TRUE from materiais_descartaveis"
    )

    return res.json({
      response: "Hello World",
      rows,
      fields,
    })
  }
}

export const firstController = new FirstController()
