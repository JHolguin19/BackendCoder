import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import MainRouter from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import { initMongoDB, storeConfig } from './db/connection.js';
import { logger } from './utils/logger.js';
import config from './config/config.js';

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

    
const PERSISTENCE = config.PERSISTENCE

const PORT = config.PORT || 8080;

if(PERSISTENCE === 'MONGODB') initMongoDB()

app.listen(PORT, ()=> logger.info('Server Ok en el puerto 8080'));

