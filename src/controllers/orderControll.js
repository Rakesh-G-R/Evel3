import { Order } from "../models/orderSchema.js";
import { sendEmail } from "../config/email.js";
import { Book } from "../models/bookSchema.js";





export const getOrder=async(req,res)=>{
    try{
       const orders=await Order.findAll();
       return res.status(200).send(orders);
    }catch(err){
       console.log(err);
    }
}
export const addOrder=async(req,res)=>{
    const{quantity,status}=req.body;
    const{id}=req.params;
    try{
        const newUOrder=await Order.create({quantity,status,userId:req.user.id,bookId:id});
          const book=await Book.findOne({_id:id});
          sendEmail(req.user.email,'new booking',`your new book  ${book.title} has booked sucessfully`);
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

