import { Router } from 'express';
const router = Router();

import { githubResponse, loginResponse, registerResponse} from '../controller/user.controller.js'
import passport from 'passport'

import { isAuth } from '../middlewares/isAuth.js';
//entre comillas se debe poner el mismo nombre del local strategy, del middleware
router.post('/login', passport.authenticate('login'), loginResponse)
router.post('/register', passport.authenticate('register'), registerResponse)

router.get('/private', isAuth, (req, res)=>{res.json({msg:'ruta privada'})})

// Boton de inicio de sesion con github 
router.get('/register-github', passport.authenticate('github', { scope: ['user:email']}))


router.get('/profile', passport.authenticate('github', { 
    failuredRedirect:'/login',
    successRedirect:'/profile-github',
    passReqToCallback:true
}))

router.get('/logout', (req, res)=>{
    req.logout((err) => {
        if (err) res.send(err)
            res.redirect('/login')
    })
})


export default router