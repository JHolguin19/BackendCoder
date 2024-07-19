import config from './config.js';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import MainRouter from './routes/index.js';
const mainRouter = new MainRouter();

const app = express();

app
    .use(json())
    .use(express.static(`${__dirname}/public`))
    .use(cookieParser())
    .use(urlencoded({ extended: true }))
    .use(morgan('dev'))
    .use('/api', mainRouter.getRouter())
    .use('/', viewsRouter)
    .use(errorHandler)


app.listen(PORT, ()=>console.log(`Server OK PORT: ${config.process.PORT} in ${config.NODE_ENV} environment`));