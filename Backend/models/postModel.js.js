const mongoose = require('mongoose');

// Also can use
// const {Schema} = require("mongoose")
// const postSchema = new Schema({});

const postSchema = new mongoose.Schema({
    title : {
      type:String,
      required: true,
    },
    author : {
        type:String,
        required:true,
    },
    price : {
        type:String,
        required:true,
    },
    image : {
        type:String,
        
    },
    publicId: {
        type:String,

    },  
    authorId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    purchasedBy: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

},{timestamps:true})

const Post = mongoose.model("Post",postSchema);
module.exports = Post