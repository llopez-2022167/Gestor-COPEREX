'use strict'

import Company from './company.model.js'
import {checkUpdate} from '../utils/validator.js'
import {generateJwt} from '../utils/jwt.js'
  
module.exports = { login };
  
  // controllers/companyController.js
//const { Company } = require('../models/companyModel');
  

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'test is running'})
}

export const registerCompany = async(req, res) => {
    try{
        // Lógica de registro de empresa
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'ADMIN'
        let company = new Company(data)
        await company.save()
        return res.send({message: `Registered successfully, can  be logged whiteh username ${company.businessUser}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

// controllers/authController.js
export const login = async(req, res) => {
    // Lógica de inicio de sesión
    try{
         //Capturar los datos (body)
        let { businessUser,password } = req.body
        //Validar que el usuario exista
        let company = await Company.dinfOne({businessUser}) //buscar un solo registro
         //Verifico que la contraseña coincida
        if(company && await checkPassword(password, company.password)){
            let loggedCompany ={
                uid: company._id,
                businessUser: company.businessUser,
                name: company.name,
                role: company.role
            }
             //Generar el Token
            let token = await generateJwt(loggedCompany)
            //Respondo al company
            return res.send({message: `welcome ${loggedCompany.name}`, loggedCompany, token})
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
};
  
// export const viewCompanies = async(req, res) => {
//     // Lógica de visualización de empresas
//     try {
//         let companies = await Company.find();
//         // Aplicar filtros si se proporcionan en la consulta
//         if (req.query.category) {
//           companies = companies.filter(company => company.businessCategory === req.query.category);
//         }
//         if (req.query.minExperience) {
//           companies = companies.filter(company => company.yearsOfExperience >= parseInt(req.query.minExperience));
//         }
    
//         // Ordenar las empresas según el parámetro de orden si se proporciona
//         if (req.query.sortBy) {
//           const sortBy = req.query.sortBy.toLowerCase();
//           if (sortBy === 'name') {
//             companies.sort((a, b) => a.name.localeCompare(b.name));
//           } else if (sortBy === 'years') {
//             companies.sort((a, b) => a.yearsOfExperience - b.yearsOfExperience);
//           }
//           // Agregar lógica para otros campos si es necesario
//         }
    
//         res.json(companies);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Hubo un error al recuperar las empresas." });
//     }
// }
  
export const update = async(req, res) => {
    // Lógica de edición de empresa
    try{
        let { id } = req.params
        let data = req.body

        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updateCompany = await Company.findOneAndUpdate({_id: id},data,{new: true})
        if(!update) return res.status(401).send({message: 'User not found and not updated'})

        return res.send({message: 'Updated user', update})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating account'})
    }

}
  
//module.exports = { registerCompany, viewCompanies, update };