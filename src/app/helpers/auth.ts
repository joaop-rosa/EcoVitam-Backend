import jsonwebtoken, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export function tokenValited(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization
  const [, token] = authorization?.split(" ") || ["", ""]

  if (!process.env.JWT_KEY) {
    const message = "Ocorreu um erro desconhecido com a validação"
    return response.status(500).json({ message })
  }

  if (!token) {
    const message = "Nenhum token provisionado"
    return response.status(401).json({ message })
  }

  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_KEY)
    if (typeof payload === "object" && payload !== null && "user" in payload) {
      const { user } = payload as JwtPayload & { user: string } // Tipar corretamente o 'user'
      request.headers["user"] = user
      return next()
    } else {
      const message = "Token inválido"
      return response.status(401).json({ message })
    }
  } catch (error) {
    console.error(error)
    const message = "Token inválido"
    return response.status(401).json({ message })
  }
}
