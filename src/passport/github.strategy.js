import {Strategy as GithubStrategy} from 'passport-github2'
import * as services from '../services/user.services.js'
import passport from 'passport'
import 'dotenv/config'


const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}

const registerOrLogin = async(accesToken, refreshToken, profile, done)=>{
    try {
        console.log(profile)
        const email = profile._json.email ?? '';
        const user = await services.getUserByEmail(email) 
        const first_name = profile._json.name.split('')[0];
        const last_name = profile._json.name.split('').legth === 3 ? profile._json.name.split('')[1].concat('', profile._json.name.split('')[2] ): profile._json.name.split('')[1]
;        if(user) return done(null, user); 
         const newUser = await services.register({
            first_name,
            last_name,
            email,
            password: '',
            isGithub:true

         })
         return done (null, newUser)
    } catch (error) {
        return done(error)
    } 
}

passport.use('github', new GithubStrategy(strategyConfig, registerOrLogin));

     
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