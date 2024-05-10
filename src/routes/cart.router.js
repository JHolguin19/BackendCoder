import { Router } from 'express'
import { __dirname } from "../path.js";
import CartManager from "../manager/cart.manager.js";


const cartManager = new CartManager(`${__dirname}/db/carts.json`)


const router = Router();

router.post('/:idCart/product/:idProduct', async(req, res, next) => {
    try {
        const {idCart} = req.params
        const {idProduct} = req.params
        const response = await cartManager.saveProductToCart(idCart, idProduct)
        res.json(response);

    } catch (error) {
        next(error)   
    }
})

router.post('/', async(req, res, next) => {
    try {
        const cart = await cartManager.createCart();
        res.json(cart)
    } catch (error) {
        next(error)   
    }
})

router.get('/:idCart', async(req, res, next) => {
    try {
        const { idCart } = req.params;
        const cart = await cartManager.getCartById(idCart);
        if(!cart){
            res.status(404).json({msg: 'product not found'})
        }else return res.status(200).json(cart)
    } catch (error) { next(error) 
    }

})

export default router;