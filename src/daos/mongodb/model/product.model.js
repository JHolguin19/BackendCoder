import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


//Definimos el schema   
const productSchema = new Schema({
    name:{type: String, require:true},
    description:{type: String, require:true},
    price:{type: Number, require:true},
    stock:{type: Number, require:true}
});

productSchema.plugin(mongoosePaginate);


export const ProductsModel = model("products", productSchema)