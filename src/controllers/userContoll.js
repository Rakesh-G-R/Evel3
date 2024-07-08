import { User } from "../models/userSchema.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userRegister=async(req,res)=>{
   const{userName,email,password,role}=req.body;
    try{
       const user=await User.findOne({where:{email:email}});
       if(user!==null){
        return res.send('user already registred try to login');
       } 
       bcrypt.hash(password,10,async(err,result)=>{
        if(err)console.log(err);
        else{
            const newUSer=await User.create({userName,email,password:result,role});
            return res.status(201).send('user registered successfully');
        }
       })
    }catch(err){
       console.log(err);
    }
}
export const userLogin=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({where:{email:email}});
        if(user===null){
            return res.send('user does not exist please register');
        }
        const val=bcrypt.compare(password,user.password);
        if(!val){
            return res.send('wrong credential');
        }
        const token=jwt.sign({id:user.id,email:user.email,role:user.role},'rakesh');
        return res.status(200).json({token:token,user:val});
    }catch(err){
         console.log(err);
    }
}