
import { ProductsModel } from "./model/product.model.js";

export default class ProductDaoMongoDB{


    async getProducts(page=1, limit = 10, name, sort){
        try {
            const filter = name ? {'name':name} : {};
            let sortOrder = {};
            if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ?-1 :null;
            const response = await ProductsModel.paginate(filter, {page, limit, sort:sortOrder})
            return await response
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id){
        try {
            return await ProductsModel.findById(id)
        } catch (error) {
            throw new Error(error)
        }
    }
 
    async create(obj){
        try {
            return await ProductsModel.create(obj)
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(id, obj){
        try {
            return await ProductsModel.findByIdAndUpdate(id, obj, {new: true})
        } catch (error) {
            throw new Error(error)
        }
    }

    async delete(id){
        try {
            return await ProductsModel.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error)
        }
    }

    



}