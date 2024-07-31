import Services from "./class.services.js";
// import ProductDaoMongo from "../daos/mongodb/product.dao.js";
import factory from "../persistence/factory.js";

const { prodDao } = factory;

// const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }
};