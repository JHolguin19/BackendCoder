import {Strategy as githubStrategy} from 'passport-github2'
import * as services from '../services/user.services'
import passport from 'passport'
import 'dotenv/config'


const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/users/profile'
}

const registerOrLogin = async(accesToken, refreshToken, profile, done)=>{
    try {
        console.log(profile)
    } catch (error) {
        return done(error)
    }
}

passport.use('github', new githubStrategy(strategyConfig, registerOrLogin));

     
//recibe el usuario por el usuario y se queda con el id
passport.serializeUser((user, done)=>{
    done(null, user._id)
})


//buscal el usuario por el id y se queda con toda la informacion
passport.deserializeUser(async(id, done)=>{
    try {
        const user = await services.getUserById(id)
        return done(null, user)
    } catch (error) {
        done(error)
    }
    
})