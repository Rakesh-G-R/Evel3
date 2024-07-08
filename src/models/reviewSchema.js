import { Schema,model } from "mongoose";

const review=new Schema({
    rating:{
        type:Number,
        require:true
    },
    feedback:{
        type:String
    },
    bookId:{
        type:Schema.Types.ObjectId
    },
    userId:{
        type:Number
    }
},{collection:'review'});

export const Review=model('review',review);