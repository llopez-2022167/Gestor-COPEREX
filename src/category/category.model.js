import {Schema, model} from 'mongoose'

const categorySchema = Schema({
    name: {
        type:String,
        require: [true, "Se requiere nombre"] //Se requiere nombre
    },
    descriptor: {
        type: String,
        require: [true, "Se requiere descripción"] //Se requiere descripción
    }
},{
    versionKey: false
})

export default model('category', categorySchema)