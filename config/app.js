//Levantar servidor HTTP (express)
//EsModules
'use strict'

//Importaciones
import  express from 'express'
import morgan from 'morgan'
import helmet  from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'
import companyRoutes from '../src/company/company.routes.js'

//Configyuraciones
const app = express()
config();
const port = process.env.PORT || 3056


//Configuracion del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json)
app.use(cors())//Aceptar o denegar solicitudes de diferentes orígenes (local, remoto) / políticas de acceso
app.use(helmet())//Aplica capa de seguridad básica al servidor
app.use(morgan('dev'))//Logs de solicitudes al servidor HTTP

//Declaracion de routes
app.use(companyRoutes)

//Levantar el servidor
export const initSever = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
