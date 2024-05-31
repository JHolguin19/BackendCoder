import { Schema, model } from "mongoose";


//Definimos el schema   
const productSchema = new Schema({
    name:{type: String, require:true},
    description:{type: String, require:true},
    price:{type: Number, require:true},
    stock:{type: Number, require:true}
});

export const ProductsModel = model("products", productSchema)