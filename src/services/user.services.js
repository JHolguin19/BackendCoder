import UserDaos from "../daos/user.daos.js"
import { UserModel } from "../daos/models/user.model.js"
import { createHash, isValidPassword } from "../util.js";

const userDaos = new UserDaos(UserModel);


export const getUserByEmail = async (email) => {
    try {
      return await userDaos.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const getUserById = async (id) => {
    try {
      return await userDaos.getById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  export const login = async (user) => {
    try {
      const { email, password } = user;
      console.log(user)
      const userExist = await getUserByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      return userExist;
    } catch (error) {
      throw new Error(error);
    }
  };

export const register = async(user)=>{
   
    try {
        const {email, password} = user;
        const existUser = await getUserByEmail(email);
        if(!existUser){
        if(email === "adminCoder@gmail.com" && password === 'adminCoder123'){
            const user = await user.UserDaos.register({
                ...user,
                password: createHash(password),
                role:'admin'
            })
        }else{
            const newUser =  await userDaos.register({...user,
                password: createHash(password)
            });
            return newUser
            
    }
        } else return null
        }catch (error) {
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


