import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import bcrypt from "bcryptjs"
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import userModal from "./model/userModel.js";
import orderRouter from "./routes/orderRoutes.js";
dotenv.config()






const app = express();
const PORT = process.env.PORT;



app.use(express.json());
app.use(cors({
    origin: "https://sathya-fashions.vercel.app",
    methods: ["GET", "POST","DELETE"],
    credentials: true, 
  },));


app.get("/",(req,res)=>{
    res.send("API WORKING");
});
app.use("/user",userRouter);
app.use("/order",orderRouter);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started At http://localhost:${PORT}`)
    })
}).catch(e=>{
    console.log(e.message);
})



app.post("/register",async(req,res)=>{

    const {password,mobile}=req.body;
   
    const getSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,getSalt);

    const newData = userModal({
        password:hashedPassword,
        mobile
    })
   await newData.save();
  if(newData) res.json({success:true,message:"ok!"});
})