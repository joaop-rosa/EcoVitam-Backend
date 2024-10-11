import { Router } from "express"
import userRoutes from "./routes/UserRoutes"
import collectionPointRoutes from "./routes/CollectionPointRoutes"

const router: Router = Router()

router.use(userRoutes)
router.use(collectionPointRoutes)

export { router }
