import express, { urlencoded } from 'express';
import ProductManager from './manager/product.manager.js';
import morgan from 'morgan'
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js'
import { errorHandler } from './middleware/error.handles.js';
import { __dirname } from './path.js';
const app = express()



const PORT = 8080;
app.use(express.static(__dirname + 'public'))
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(errorHandler)

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, ()=> console.log(`Servidor ok en el puerto: ${PORT}`))