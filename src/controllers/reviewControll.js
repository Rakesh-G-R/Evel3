import { Review } from "../models/reviewSchema.js";



export const getReview=async(req,res)=>{
    try{
       const books=await Review.find();
      return res.status(200).send(books);
    }catch(err){
        console.log(err);
    }
}

export const addReview=async(req,res)=>{
    const{rating,feedback}=req.body;
    const{id}=req.params;
    try{
      const newBook=new Review({rating,feedback,userId:req.user.id,bookId:id});
      newBook.save();
      return res.status(201).send('Review created successfully')
    }catch(err){
        console.log(err);
    }
}

export const updateReview=async(req,res)=>{
    const{rating,feedback,bookId,userId}=req.body;
    const {id}=req.params;
    try{
       const newBook=await Review.findByIdAndUpdate(id,{rating,feedback,bookId,userId},{new:true});
       return res.status(200).send('Review updated successfully');
    }catch(err){
        console.log(err);
    }
}

export const deleteReview=async(req,res)=>{
    const{id}=req.params;
    try{
       const delets=await Review.findByIdAndDelete({_id:id});
       return res.status(200).send('Review deleted successfully');
    }catch(err){
        console.log(err);
    }
}