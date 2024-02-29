// models/companyModel.js
import mongoose, { mongo } from "mongoose";

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    businessUser: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    //nivel de impacto
    impactLevel: {
        type: String,
        required: true
    },
    //Años de trayectoria
    yearsOfExperience: {
        type: Number,
        required: true
    },
    //categoría empresarial
    businessCategory: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        upperCase: true,
        enum: ['ADMIN'],
        required: true
    }
});

export default mongoose.model('company', companySchema)
