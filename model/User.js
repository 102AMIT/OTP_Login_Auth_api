import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    mobile:{
        type:Number
    },
    address:{
        type:String,
    },
    profile:{
        type:String,
    },

});

export default mongoose.model.Users|| mongoose.model('User',UserSchema);