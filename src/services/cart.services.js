import ProductDaoMongoDB from '../daos/mongodb/product.dao.js';
const productDao = new ProductDaoMongoDB()

import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const CartDao = new CartDaoMongoDB();

export const getAll = async() =>{
    try {
       return await CartDao.getAll();
    } catch (error) {
        throw new Error(error.message)  
    }
}

export const getById = async(id) =>{
    try {
       const cart = await CartDao.getById(id); 
       if(!cart) return false
       else return cart; 
    } catch (error) {
        throw new Error(error.message)
    }
}

export const create= async() =>{
    try {
        const newCart = await CartDao.create()
        return newCart
    } catch (error) {
        throw new Error(error.message)
    }
}

export const remove = async(id) =>{
    try {
        const deleteCart = await CartDao.delete(id)
        if(!deleteCart) return false
        return deleteCart
    } catch (error) {
        throw new Error(error.message)
    }
}

export const addProdToCart = async(cartId, prodId) =>{
    try {
        const existCart = await CartDao.getById(cartId);
        const existProd = await productDao.getById(prodId);
        if(!existCart || !existProd) return null

        const existeProdCart = await CartDao.existProdInCart(cartId, prodId);
        if(existeProdCart){
            const quantity = existeProdCart.products.find(p => p.product.toString() === prodId).quantity + 1;
            return await CartDao.addProdToCart(cartId, prodId, quantity);
        } 
           return await CartDao.addProdToCart(cartId, prodId);


    } catch (error) {
        throw new Error(error.message)
    }
}

export const removeProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await getById(cartId);
      const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
      if(!existCart || !existProd) return null;
      return await CartDao.removeCartProduct(cartId, prodId);
    
    } catch (error) {
       throw new Error(error.message);
    }
  };

  export const updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      const existCart = await getById(cartId);
      const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
      if(!existCart || !existProd) return null;
      return await CartDao.updateQuantityCart(cartId, prodId, quantity)
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const clearCart = async (cartId) => {
    try {
      const existCart = await getById(cartId);
      if(!existCart) return null;
      return CartDao.clearCarrito(cartId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

