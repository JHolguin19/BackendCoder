import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    age:{
        type: Number,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    role:{
        type: String,
        default:'user'
    }
});

export const UserModel = model('users', UserSchema)