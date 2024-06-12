import { CartModel } from "./model/cart.model.js"

export default class CartDaoMongoDB{

    async create(){
        try {
            return await CartModel.create({
                product:[],
            });    
        } catch (error) {
            next(error) 
        }
    }

    async getAll(){
        try {
            return await CartModel.find({})
        } catch (error) {
            next(error) 
        }
    }

    async getById(id){
        try {
            return await CartModel.findById(id).populate("products.product");
        } catch (error) {
            next(error) 
        }
    }

    async removeCartProduct(cartId, prodId){
        try {
            return await CartModel.findOneAndUpdate(
                {_id: cartId},
                {$pull: {products: {product: prodId}}},
                { new: true}
            )
        } catch (error) {
            next(error) 
        }
    }
    async delete(id){
        try {
            return await CartModel.findByIdAndDelete(id)
        } catch (error) {
            next(error) 
        }
    }

    async update(id, obj){
        try {
            const response = CartModel.findByIdAndUpdate(id, obj, {new: true});
            return response
        } catch (error) {
            next(error) 
        }
    }

    async addProdToCart(cartId, prodId, quantity){
        try {
            
            const cart = await CartModel.findById(cartId)

            if(!cart) return null
            // Muy importante buscar si existe el carrito antes de buscar el prod
            // tambien muy importante pasar el id a string
            const existProduct = cart.products.findIndex(p => p.product.toString() === prodId);

            if(existProduct !== -1){
                cart.products[existProduct].quantity = quantity
            } else cart.products.push({product: prodId, quantity})
            await cart.save();
            return cart;
        } catch (error) {
            next(error) 
        }
    }

    async existProdInCart(cartId, prodId){
        try {
            return await CartModel.findOne({
                _id: cartId,
                products: {$elemMatch : {product : prodId}}
            })
        } catch (error) {
            next(error) 
        }
    }

    async clearCarrito(cartId){
        try {
            return await CartModel.findByIdAndUpdate(
                cartId,
                {$set: {products: []}},
                {new: true}
            )
        } catch (error) {
            next(error)
        }

    }

    async updateQuantityCart(cartId, prodId, quantity) {
        try {
         return await CartModel.findOneAndUpdate(
          { _id: cartId, 'products.product': prodId },
          { $set: { 'products.$.quantity': quantity } },
          { new: true }
         );
        } catch (error) {
          next(error)
        }
      }

}
