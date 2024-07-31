import 'dotenv/config'
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import MainRouter from './routes/index.js';
import cookieParser from 'cookie-parser'
const mainRouter = new MainRouter();

const app = express();

app
    .use(json())
    .use(cookieParser())
    .use(urlencoded({ extended: true }))
    .use(morgan('dev'))
    .use('/api', mainRouter.getRouter())
    .use(errorHandler)


const PORT = process.env.PORT;


console.log(process.env.SECRET_KEY_JWT)
app.listen(PORT, ()=>console.log(`Server OK PORT: 8080 `));

