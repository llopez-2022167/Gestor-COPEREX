// models/companyModel.js
import  { Schema, model } from 'mongoose';

const companySchema = Schema({
    name: {
        type: String,
        required: true
    },
    impact: {
        type: String,
        upperCase: true,
        anum: ['Alto', 'Bajo', 'Medio'],
        require: true
    },
    yearExp:{
        type: String,
        require: [true, "se requiere contraseña"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categoria',
        require: true
    },
},{
    versionKey: false
});

export default model('company', companySchema)
