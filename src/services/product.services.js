import Services from "./class.services.js";
import ProductDaoMongo from "../persistence/daos/mongodb/product.dao.js";


const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }

    async createProduct(obj, user){
        try {
            const {role, email} = user
        if(role ==='PREMIUM'){
            const product = await prodDao.create({
                ...obj,
                owner: email
            })
            return product
        }else return null
            
        } catch (error) {
            throw new Error
        }
        
    }


};