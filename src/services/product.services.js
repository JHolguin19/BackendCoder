import ProductDaoMongoDB from '../daos/mongodb/product.dao.js';
const productDao = new ProductDaoMongoDB()

//import {__dirname} from '../utils.js';
//import ProductDaoFS from '../daos/filesystem/product.dao.js';
//const productDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products.json`);


export const getAll = async (page, limit, name, sort) => {
  try {
    return await productDao.getProducts(page, limit, name, sort);
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (id) => {
  try {
    return await productDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (objeto) => {
  try {
    return await productDao.create(objeto);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, obj) => {
  try {
    return await productDao.update(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await productDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};