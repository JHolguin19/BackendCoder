//Se importa la dependencia del mongoose
//import { model } from "mongoose";
import { ProductsModel } from "../models/products.model.js";

//se define el constructor
//Hay dos opciones para trabajar con el modelo
// (1) Pasarle el modelo y el schema por contructor y llamas a this.collection
// (1) importar el modelo y llamarlo en cada funcion
export default class ProductManager{

    //constructor(collection, schema){
    //    this.collection = model(collection, schema)
    //}

    async getProducts(){
        try {
            return await ProductsModel.find({})
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