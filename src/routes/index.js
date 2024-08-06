import { Router } from "express";
import productRouter from './product.router.js';
import userRouter from './user.router.js';
import cartRouter from './cart.router.js';
import ticketRouter from './ticket.router.js'
import mokinRouter from './mockin.router.js'
export default class MainRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.use('/products', productRouter);
        this.router.use('/users', userRouter);
        this.router.use('/carts', cartRouter);
        this.router.use('/ticket', ticketRouter);
        this.router.use('/mockin', mokinRouter)
    }

    getRouter(){
        return this.router;
    }
}