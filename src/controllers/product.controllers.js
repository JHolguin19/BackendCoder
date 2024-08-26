import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
const prodService = new ProductService();

export default class ProductController extends Controllers {
    constructor(){
        super(prodService);
        this.product=prodService
    }

    create = async(req, res, next) =>{
        try {
            const productData = req.body;
            const user = req.user; 
            const data = await this.product.createProduct(productData, user)
            if(!data) return httpResponse.NotFound(res, {msg: 'not Product to create'})
            else return httpResponse.Ok(res, data)
        } catch (error) {
            next(error)
        }
    }
    
};