import 'dotenv/config'
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import MainRouter from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import { initMongoDB, storeConfig } from './db/connection.js';
import { logger } from './utils/logger.js';

const mainRouter = new MainRouter();

const app = express();

app
    .use(json())
    .use(cookieParser())
    .use(urlencoded({ extended: true }))
    .use(session(storeConfig))
    .use(morgan('dev'))
    .use('/api', mainRouter.getRouter())
    .use(errorHandler)

    

const PORT = process.env.PORT;
initMongoDB()

console.log(process.env.SECRET_KEY_JWT)
app.listen(PORT, ()=> logger.info('Server Ok en el puerto 8080'));

