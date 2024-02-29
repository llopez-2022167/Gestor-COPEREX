'use strict'

import jwt from 'jsonwebtoken'
import Company from '../company/company.model.js'

export const validateJwt = async(req, res, next)=>{
    try{
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //obtener el token de los headers
        let { authorization } = req.headers
        console.log(req.headers)
        //Verificar si viene el token
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        //Obtener el uid del usuario que envió el token
        let { uid } = jwt.verify(authorization, secretKey)
        //Validar si aún existe en la BD
        let company = await Company.findOne({_id: uid})
        if(!company) return res.status(404).send({message: 'Company not found - Unauthorized'})
        req.company = company
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
      let { company } = req
      if(!company || user.role !== 'ADMIN') return res.status(403).send({message: `You dont have access | username: ${company.businessUser}`})
      next()
    }catch(err){
        console.error(err)
        return res.status(403).send({message: 'Unauthorized role'})
    }
}