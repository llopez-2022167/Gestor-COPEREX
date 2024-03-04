import { Schema, model } from 'mongoose';

const userSchema = Schema({
    name: {
        type:  String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'email is requiered ']
    },
    password: {
        type: String,
        required: [true, 'passwrod is requiered']
    }
},{
    versionKey: false
})

export default model('user', userSchema);