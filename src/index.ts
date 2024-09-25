import { App } from "./app/app"
import "dotenv/config"

new App().server.listen(process.env.PORT)
