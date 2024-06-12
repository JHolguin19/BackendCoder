import {Router} from 'express'
//Forma de importar pero muy larga
//import { getAllProducts, getByProductId,
//    createProduct, updateProduct, removeProduct } 
//    from '../controllers/product.controllers'

import * as controllers from '../controllers/product.controllers.js'


const router = Router()

router.get("/", controllers.getAllProducts);
router.get("/:id", controllers.getByProductId);
router.post("/", controllers.createProduct);
router.put("/:id", controllers.updateProduct);
router.delete("/:id", controllers.removeProduct);

export default router;