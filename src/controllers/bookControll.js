import { Book } from "../models/bookSchema.js";


export const getBook=async(req,res)=>{
    try{
       const books=await Book.find();
      return res.status(200).send(books);
    }catch(err){
        console.log(err);
    }
}

export const addBook=async(req,res)=>{
    try{
      const newBook=new Book(req.body);
      newBook.save();
      return res.status(201).send('Book created successfully')
    }catch(err){
        console.log(err);
    }
}

export const updateBook=async(req,res)=>{
    const{title,author,price,genre}=req.body;
    const {id}=req.params;
    try{
       const newBook=await Book.findByIdAndUpdate(id,{title,author,genre,price},{new:true});
       return res.status(200).send('Book updated successfully');
    }catch(err){
        console.log(err);
    }
}

export const deleteBook=async(req,res)=>{
    const{id}=req.params;
    try{
       const delets=await Book.findByIdAndDelete({_id:id});
       res.status(200).send('book deleted successfully');
    }catch(err){
        console.log(err);
    }
}