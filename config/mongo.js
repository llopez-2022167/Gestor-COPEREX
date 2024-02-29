'use strict'

//{mongose}
import mongoose from 'mongoose'

export const connect = async()=>{
    try{
        mongoose.connection.on('err', ()=>{
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect()
        })
        mongoose.connection.on('connection', ()=>{
            console.log('MongoDB | try conecting')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | connected to mongodb')
        })
        mongoose.connection.on('open', ()=>{
            console.log('MongoDB | conected to database')
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB | reconnected to  mongodb')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB | disconected')
        })
        await mongoose.connect(process.env.URI_MONGP,{
            serverSelectionTimeoutMS: 5000, maxPoolSize: 50
        })
    }catch(err){
        console.error('Database connection faild', err)
    }
}