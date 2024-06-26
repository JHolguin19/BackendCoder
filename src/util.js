  import {dirname} from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))


import bcrypt from 'bcrypt'

/**
 * Funciona el hasheo de contraseña a traves de bscrypt con el metodo hashSync
 * @param {*} password //Tipo string    
 * @returns 
 */
export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) //por lo general se utiliza de 8 a 10, por cada caracter de la constraseña crea 10 caracteres encriptados
}

/**
 * funcion que realiza la validacion de la contraseña, compara pasword en string con la hasheada 
 * @param {*} password 
 * @param {*} user 
 * @returns 
 */
export const isValidPassword = (password, user)=>{
    return bcrypt.compareSync(password, user.password)
}

