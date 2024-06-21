import { Router } from 'express';
const router = Router();

import { loginResponse, registerResponse} from '../controller/user.controller.js'
import passport from 'passport'

import {validateLogin} from '../middlewares/middlewares.js'
import { isAuth } from '../middlewares/isAuth.js';
//entre comillas se debe poner el mismo nombre del local strategy, del middleware
router.post('/login', passport.authenticate('login'), loginResponse)
router.post('/register', passport.authenticate('register'), registerResponse)

router.get('/private', isAuth, (req, res)=>{res.json({msg:'ruta privada'})})


export default router