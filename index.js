//Ejecutar servicios
import { initSever } from "./config/app.js";
import { connect } from "./config/mongo.js";
import { defaultAdmin  } from "./src/user/user.controller.js";

initSever()
connect()
defaultAdmin()
