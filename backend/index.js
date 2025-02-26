import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config()






const app = express();
const PORT = process.env.PORT;



app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("API WORKING");
});


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started At http://localhost:${PORT}`)
    })
}).catch(e=>{
    console.log(e.message);
})


