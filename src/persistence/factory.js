import ProductDaoMongo from "./daos/mongodb/product.dao.js";
import ProductDaoFs from './daos/filesystem/product.dao.js'
import CartDaoMongoDB from './daos/mongodb/cart.dao.js'
import UserDaoMongo from './daos/mongodb/user.dao.js'
import { initMongoDB } from "../db/connection.js";

let prodDao = null
let userDao = null
let cartDao = null

let persistence = process.argv[2];

switch(persistence){
    case 'fs':
        prodDao = new ProductDaoFs('./src/daos/filesystem/products.json')
        //userDao = new UserDaoMongo ('/')
        console.log(persistence);
        break;
    case 'mongo':
        userDao = new UserDaoMongo()
        prodDao = new ProductDaoMongo();
        cartDao = new CartDaoMongoDB();
        console.log(persistence);
        initMongoDB()
    default:
        prodDao = new ProductDaoFs('./src/daos/filesystem/producst.json');
        break
}

export default {userDao, prodDao, cartDao}