
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import userModal from "../model/userModel.js";

dotenv.config(); 



export const logIn = async(req,res)=>{

    const {mobile,password} = req.body;


    try {
        
        const user = await userModal.findOne({mobile});
       
        if(!user){
            return res.json({success:false,message:"User Doesn't Exist!"});
        }
    
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.json({success:false,message:"Password doesn't match"});
        }
    
        const token = createToken(user._id);
        const encryptedToken = setEncryptedToken(token);
       
        return res.json({success:true,token:encryptedToken,message:"Successfully loged in"});
    
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "An error occurred during login. Please try again later." });
    }
}







const createToken = (id)=>{
    return jwt.sign({id},process.env.SECRETKEY1,{
    });
}

export function setEncryptedToken(token) {
    const encryptedToken = CryptoJS.AES.encrypt(token, process.env.SECRETKEY2).toString();
    return encryptedToken;
  }