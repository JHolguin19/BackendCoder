import UserDaos from "../daos/user.daos.js"
import { UserModel } from "../daos/models/user.model.js"

const userDaos = new UserDaos(UserModel);

export const login = async(req, res)=>{
    try {
    const {email, password} = req.body
    const user = await userDaos.login(email, password)
    if(!user) res.status(401).json({msg:'No estas autorizado'})
        //Se podria poner para redireccional al registro
    else{
         req.session.email= email,
         req.session.password = password,
         res.redirect('/views/profile')
        
    }
    res.json({msg: 'login succesful'})
    } catch (error) {
        console.log(error)
    }

}

export const register = async(req, res)=>{
   
    try {
        const {email} = req.body;
        if(email === "adminCoder@gmail.com" && password === 'adminCoder123'){
            const user = await user.UserDaos.register({
                ...req.body,
                role:'admin'
            })
            if(!user) return res.status(401).json({msg:'No puedes iniciar sesión'})
            else res.redirect('/views/login'); 
        }else{
            const user =  await userDaos.register(req.body);
            if(!user) res.status(401).json({msg:'No puedes iniciar sesión'})
                else res.redirect('/views/login');
            
    }
        }
         catch (error) {
        throw new Error(error)
    }


}


export const visit = (req, res)=>{
    req.session.info && req.session.contador ++;
    res.json({msg:`${req.session.info.name} a visitado el sitio: ${req.session.info.contador}`})

}

export const infoSession = (req, res)=>{
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies
    })

}

export const logout = (req, res)=>{
    req.session.destroy(),
    res.send("session finalizada")
}