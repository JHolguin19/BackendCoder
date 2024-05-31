import express from 'express'
import ProductsRouter from  './src/routes/products.router.js'
import { initMongoDB } from './src/daos/mongodb/connection.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import morgan from 'morgan';


const app = express();


//Para no tener problemas a la hora de leer y manipular archivos  .JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use("/products", ProductsRouter)

app.use(errorHandler)
initMongoDB()


//Iniciar el servidor en el puerto 8080
const PORT = 8080;
app.listen(PORT, ()=>{

    console.log(`Se pudo conectar al servidor desde el puerto" ${PORT}`);
})