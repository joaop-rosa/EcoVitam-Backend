import { Router } from "express"
import userRoutes from "./routes/UserRoutes"
import collectionPointRoutes from "./routes/CollectionPointRoutes"
import eventsRoutes from "./routes/EventsRoutes"
import articleRoutes from "./routes/ArticleRoutes"

const router: Router = Router()

router.use(userRoutes)
router.use(collectionPointRoutes)
router.use(eventsRoutes)
router.use(articleRoutes)

export { router }
