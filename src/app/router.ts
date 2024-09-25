import { Router } from "express"
import userRoutes from "./routes/UserRoutes"

const router: Router = Router()

//Routes
router.use(userRoutes)

export { router }
