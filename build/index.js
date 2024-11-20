"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app/app");
require("dotenv/config");
new app_1.App().server.listen(process.env.PORT);
