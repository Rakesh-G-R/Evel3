import { Schema,model } from "mongoose";

const book=new Schema({
    title:{
        type:String,
        require:true
    },
    author:{
       type:String,
       require:true
    },
    genre:{
        type:String,
        require:true
    },
    price:{
     type:Number,
     require:true
    }
},{collection:'book'});

export const Book=model('book', book);