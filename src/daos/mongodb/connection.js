//Importamos libreria
import mongoose from 'mongoose'
import 'dotenv/config'

//definimos la url de la base de datos
const MONGO_URL = process.env.MONGO_URL

//iniciamos la conexion a la base de datos
export const initMongoDB = async() =>{
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(MONGO_URL);
        console.log("Se conecto con exito a la base de datos");
    } catch (error) {
        console.log(error)        
    }


}