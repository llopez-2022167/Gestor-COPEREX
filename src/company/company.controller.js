'use strict'

import Category from '../category/category.model.js'
import Company from '../company/company.model.js'
import {checkUpdate} from '../utils/validator.js'
import {generateJwt} from '../utils/jwt.js'
import ExcelExcelJS from 'exceljs'
  
  // controllers/companyController.js
//const { Company } = require('../models/companyModel');
  

export const addCompany = async(req, res) => {
    try{
        // Lógica de registro de empresa
        let data = req.body
        let category = await Category.findOne({_id: data.category})
        if(!category) return res.status(404).send(
            {message: 'Categoria no encontrada'}
        )
        let company = new Company(data)
        await company.save()
        return res.send({message: 'Se creo nueva empresa'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al guardar'})
    }
}
  
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
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Han enviado algunos datos que no se pueden actualizar o faltan datos'})

        let updateCompany = await Company.findOneAndUpdate({_id: id},data,{new: true}).populate('category')
        if(!updateCompany) return res.status(401).send({message: 'Producto no encontrado y no actualizado'})
        return res.send({message: 'Updated product', updateCompany})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al actualizar'})
    }
}

//Excel
  
export const filterAZ = async (req, res) => {
    try {
        const companies = await Company.find().sort({ name: 1 }); // Orden ascendente por el campo 'name'
        return res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving sorted companies', error: error });
    }
}

export const filterZA = async (req, res) => {
    try {
        const companies = await Company.find().sort({ name: -1 }); // Orden descendente por el campo 'name'
        return res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving sorted companies', error: error });
    }
}

export const filterYears = async (req, res) => {
    try {
        const companies = await Company.find().sort({ yearExp: -1 }); // Orden descendente por el campo 'yearExp'
        return res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving sorted companies by experience', error: error });
    }
}

export const filterImpact = async (req, res) => {
    try {
        const companies = await Company.find().sort({ impact: 1 }); // Orden ascendente por el campo 'impact'
        return res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving sorted companies by impact', error: error });
    }
}

export const generateXLSX = async(req, res)=>{
    try {
        let company = await Company.find().populate('category', ['name', 'description'])

        let excelBook = new ExcelJS.Workbook()
        let sheet = excelBook.addWorksheet('Company')

        sheet.columns =[
            {header: 'Name', key: 'name', width: 20},
            {header: 'Impact', key: 'impact', width: 20},
            {header: 'Year of Experiencde', key: 'yearExp', width: 20},
            {header: 'Category', key: 'category', width: 20},
            {header: 'Description', key: 'description', width: 20},
        ]

        company.forEach(company =>{
            sheet.addRow({
                name: company.name,
                impact: company.impact,
                yearExp: company.yearExp,
                category: company.category.name,
                description: company.category.description
            })
        })

        let filePath = 'company.xlsx'
        await excelBook.xlsx.writeFile(filePath)

        res.attachment(filePath)
        res.send()
    }  catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error fetching companies and generating Excel', err: err });
    }
}

