import {Router} from 'express'
import {
    test,
    signUp,
    login
}from './user.controller.js'

const api=Router()

api.get('/test', test)

api.post('/signUp', signUp)
api.post('/login', login)

export default api