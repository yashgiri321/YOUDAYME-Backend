import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import RazorPay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";

connectDB();

cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});

export const instance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// 1 ==5
nodeCron.schedule("0 0 0 5 * *",async ()=>{ 
 try{
     await Stats.create({});
 }catch (error){
  console.log(error);
 }
});

app.get("/",(req,res)=>{
  return res.status(200).json({success:true,message:"BSDK Server is running..."})
})

app.listen(process.env.PORT,()=>{
  console.log(`Server is   working on port: ${process.env.PORT}`);
})