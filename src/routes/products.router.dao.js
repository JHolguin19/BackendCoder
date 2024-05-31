import {Router} from 'express'
import * as controllers from '../controllers/product.controllers.dao.js'


const router = Router()

router.get("/", controllers.getAllProducts);
router.get("/:id", controllers.getByProductId);
router.post("/", controllers.createProduct);
router.put("/:id", controllers.updateProduct);
router.delete("/:id", controllers.removeProduct);

export default router;