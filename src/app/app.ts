import express, { Request, Response, NextFunction } from "express"
import { router } from "./router"

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`)
  console.log(req.body)
  next()
}

export class App {
  public server: express.Application

  constructor() {
    this.server = express()
    this.middleware()
    this.router()
  }

  private middleware() {
    this.server.use(express.json())
    this.server.use(logger)
  }

  private router() {
    this.server.use(router)
  }
}
