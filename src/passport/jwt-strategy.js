import passport from 'passport'
import { ExtractJwt, Strategy as jwtStrategy} from 'passport-jwt'
import * as services from '../services/user.services.js';
import 'dotenv/config';


//req.user = jwt_payload

const verifyToken = async(jwt_payload, done) => {
    console.log('payload', jwt_payload)

    const user = await services.getUserById(jwt_payload.userId)
    if(!user) return(null, false);
    return done(null, user)
}


/*-----------------------------------Cookie Strategy--------------------------------------------*/

 const cookieExtractor = (req)=>{
    return req.cookies.token;
 }
 
 const strategyConfigCookie = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor
    ]), 
    secretOrKey: process.env.SECRET_KEY
};

passport.use('jwtCookies', new jwtStrategy(strategyConfigCookie, verifyToken))



passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser(async(id, done)=>{
    try {
        const user = await services.getUserById(id);
        return done(null, user);
    } catch (error) {
        done(error)
    }
});
