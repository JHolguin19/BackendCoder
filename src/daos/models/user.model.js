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
        require:false
    },
    password:{
        type: String,
        require:true
    },
    role:{
        type: String,
        default:'user'
    },
    isGithub:{
        type:Boolean,
        default:false
    }
});

export const UserModel = model('users', UserSchema)