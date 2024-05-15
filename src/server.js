import express, { urlencoded } from 'express';
import morgan from 'morgan'
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js'
import { __dirname } from './path.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
const app = express()



const PORT = 8080;
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(morgan('dev'))

//estas lineas siempre tienen que ir cada vez que utilicemos handlebars ya que es la inicializacion

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')



app.get('/', (req, res)=>{
    res.render('realTimeProducts')
})



app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

const httpServer = app.listen(PORT, ()=> console.log(`Servidor ok en el puerto: ${PORT}`))

const socketServer = new Server(httpServer);

let product = [];

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado ${socket.id}`)
    socket.on('disconnect', ()=>{
        console.log('usuario desconectado')
    })

    socket.emit('saludosdesdelback', 'Bienvenido a websocket')

    socket.on('respuestadesdefront', (message)=>{
        console.log(message)
    })

    socket.on('NewProduct', (prod)=>{
        product.push(prod)
        socket.emit('product', product)
    })

    socket.on('deletePro', (idE)=>{
        product = product.filter((product)=>{product.id !== idE})
        socket.emit('product', product)
    })

})