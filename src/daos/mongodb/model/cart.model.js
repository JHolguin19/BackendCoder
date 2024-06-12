import { model, Schema} from 'mongoose'

export const CartSchema = new Schema({
    products:[
        {
            _id:false,
            quantity:{type:Number, default:1}
        ,
        product: { 
            type: Schema.Types.ObjectId,
            ref:"products"
        }}
    ]

})

export const CartModel = model("carts", CartSchema)