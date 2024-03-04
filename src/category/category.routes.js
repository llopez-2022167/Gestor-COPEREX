import {Router} from 'express';
import {
    add
} from './category.controller.js'

const api = Router();
//Puerto publica
api.post('/add', add);

export default api;

