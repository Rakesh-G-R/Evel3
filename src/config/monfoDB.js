import { connect } from "mongoose";

export const connecttomdb=async(uri)=>{
   try{
      await connect(uri);
   }catch(err){
    console.log(err);
   }
}