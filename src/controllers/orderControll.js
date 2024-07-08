import { Order } from "../models/orderSchema.js";


export const getOrder=async(req,res)=>{
   const{userName,email,password,role}=req.body;
    try{
       const orders=await Order.findAll();
       return res.status(200).send(orders);
    }catch(err){
       console.log(err);
    }
}
export const addOrder=async(req,res)=>{
    const{quantity}=req.body;
    const{id}=req.params;
    try{
        const newUOrder=await Order.create({quantity,userId:req.user.id,bookId:id});
        return res.status(201).send('order created successfully');
    }catch(err){
         console.log(err);
    }
}

export const updateOrder=async(req,res)=>{
    const{quantity}=req.body;
    const{id}=req.params;
    try{
        await Order.update(
            { quantity: quantity },
            {
              where: {
                id:id
              },
            },
          );
          return res.status(200).send('updated successfully');
    }catch(err){
         console.log(err);
    }
}

export const deleteOrder=async(req,res)=>{
    const{id}=req.params;
    try{
        await Order.destroy({
            where: {
              id:id,
            },
          });
        return res.status(200).send('deleted successfully');
    }catch(err){
         console.log(err);
    }
}
