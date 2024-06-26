import passport from 'passport'
import * as services from '../services/user.services.js'
import { Strategy as LocalStrategy } from 'passport-local'

const StrategyConfig ={
    usernameField: 'email',
    passportField: 'password',
    passReqToCallback: true
}

const signUp = async (req, email, password, done) => {
    try {
        const user = await services.getUserByEmail(email);
        if(user) return done(null, false);
        const newUser = await services.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};


const login = async ( email, password, done)=>{
    const userLogin = await services.login({email, password})
    if(!userLogin) return done(null, false, {msg:'User not found'})
        return done(null, userLogin)

}

const signUpStrategy = new LocalStrategy(StrategyConfig, signUp)
const loginStrategy = new LocalStrategy(StrategyConfig, login)

passport.use('login', loginStrategy)
passport.use('register', signUpStrategy)
 



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