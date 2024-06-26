import session from 'express-session'
import * as services from '../services/user.services.js'
 

export const registerResponse = (req, res, next)=>{
    try {
        res.json({
            msg: 'Registro Ok',
            session: req.session
        })
    } catch (error) {
        next(error)
    }
}

export const loginResponse = async(req, res, next)=>{
    try {
        let id = null
        if(req.session.passport && req.session.passport.user) id = req.session.passport.user
            const user = await services.getUserById(id)
            if(!user) return res.status(401).json({msg: 'Error en la autenticación'})
                const {firts_name, last_name, email, age, role} = user;
            res.json({
                msg: "login con github Ok",
                firts_name,
                last_name,
                email,
                role
            })
    } catch (error) {
        next(error)
    }
}

export const githubResponse = async(req, res, next)=>{
    try {
        console.log(req.user)
        const {firts_name, last_name, email, age, role} = req.user;
        res.json({
            msg: "login con github Ok",
            user: {
            firts_name,
            last_name,
            email,
            role}
        })
    } catch (error) {
        next(error)
    }
}