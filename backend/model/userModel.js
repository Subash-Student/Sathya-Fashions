import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    mobile:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
})

const userModal = mongoose.model.user || mongoose.model("user",userSchema);

export default userModal;