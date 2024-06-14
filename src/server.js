import express from 'express'
import cookieParser from 'cookie-parser'
import session, { Cookie } from 'express-session'
import 'dotenv/config'
import sessionRouter from './router/user.router.js'
import viewsRouter from './router/views.router.js'
import MongoStore from 'connect-mongo'  
import handlebars from 'express-handlebars';
import { initMongoDB } from './db/database.js'
import { __dirname } from './util.js'



const SECRET =  process.env.SECRET_KEY
const SECRET_URL = process.env.MONGO_URL

const storeConfig ={
    store:  MongoStore.create({
        mongoUrl: SECRET_URL,
        crypto:{secret: SECRET },
        ttl: 180
        
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        maxAge: 180000 //Tener el mismo tiempo del ttl, para que no vaya a finalizar antes y matar la session.
     }
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session(storeConfig))
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


initMongoDB();
app.use('/users', sessionRouter)
app.use('/', viewsRouter)


app.listen(8080, ()=> console.log('server ok. Puerto 8080'))