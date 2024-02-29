// routes/authRoutes.js
import express from 'express'
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'
import {test, registerCompany,login,viewCompanies,update}from './company.controller.js'

const api = express.Router();

api.post('/registerCompany', registerCompany)
api.post('/login', login)

//RUTAS PRIVADAS
api.get('/test', [validateJwt, isAdmin], test)
api.put('/update/:id', [validateJwt],update)