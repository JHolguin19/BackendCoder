import Services from "./class.services.js";
// import ProductDaoMongo from "../daos/mongodb/product.dao.js";
import persistence from "../daos/persistence.js";

const { prodDao } = persistence;

// const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }
};