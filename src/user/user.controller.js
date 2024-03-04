'use strict'

import User from './user.model.js'
//Importar validator.js
import {generateJwt} from '../utils/jwt.js'
import { encrypt, comparePassword } from '../utils/validator.js'
//Excel Importar

export const test =(req,res)=>{
    console.log('Tesrt is running')
    res.send({message: 'test good'})
}

export const defaultAdmin = async(req, res)=>{
    try{
        const existingUser = await User.findOne({username: 'default'});

        if(existingUser){
            return;
        }
        let data = {
            name: 'Admin',
            lastName: 'Admin',
            email: 'Admin@gamil.com',
            password: await encrypt ('admin'),
        }
        let user = new User(data);
        await user.save();
    }catch(err){
        console.error(err);
    }
}

export const signUp = async (req, res)=>{
    try{
        let data = req.body;
        let existingUser = await User.findOne({message: data.username});
        if(existingUser){
            return res.status(400).send({
                message: 'username is already in use'
            });
        };
        data.password = await encrypt(data.password);
        let user= new User(data);
        await user.save();
        return res.send({message: 
            `Registered succefully , can be logged with username ${user.username}`
        });
    }catch(err){
        console.error(err);
        return res.status(500).send(
            {
                message: 'Error registering user', err: err
            });
    }
}

export const login = async (req, res) => {
    try {
        let { user, password } = req.body
        let users = await User.findOne({
            $or: [
                { username: user },
                { email: user }
            ]
        });
        if (users && await comparePassword(password, users.password)) {
            let loggedUser = {
                uid: users.id,
                username: users.username,
                email: users.email,
                name: users.name,
            }
            let token = await generateJwt(loggedUser)
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser, token })

        }
        return res.status(404).send({ message: 'Invalid credentials' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}