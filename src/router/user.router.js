import { Router } from 'express';
const router = Router();

import { login, logout, visit, infoSession, register} from '../controller/user.controller.js'
import {validateLogin} from '../middlewares/middlewares.js'

router.post('/login', login)
router.post('/register', register)
router.get('/info', validateLogin, infoSession) 
router.get('/secret-endpoint', validateLogin, visit)
router.post('/logout', logout)



export default router