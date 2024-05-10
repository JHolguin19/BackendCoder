import ProductManager from "../manager/product.manager.js";
import { Router } from 'express'
import { bodyValidator } from "../middleware/body.validator.js";   
import { __dirname } from "../path.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`)


const router = Router();

router.get("/", async(req, res, next) =>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products)    
    } catch (error) {
        next(error)        
    }
    
})

router.post('/', [bodyValidator], async(req, res) => {
    try {
        //console.log(req.body)
        const product = await productManager.addProducts(req.body);
        res.status(200).json(product);
    } catch (error) {
        next(error)   
    }
})

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductbyId(id);
        if(!product){
            res.status(404).json({msg: 'product not found'})
        }else return res.status(200).json(product)
    } catch (error) { next(error) 
    }

})

router.post('/:limite', async(req, res) =>{
    try {
        const { limite } = req.params;
        const products = await productManager.limitProduct(limite);
        res.status(404).json(products)
    } catch (error) {
        next(error) 
    }
})

export default router;