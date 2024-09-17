const mongoose = require('mongoose');

// Also can use
// const {Schema} = require("mongoose")
// const postSchema = new Schema({});

const orderSchema = new mongoose.Schema({
    purchaserId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true
    },
    postUrl : {
      type:String,
      required:true
    },
    author : {
      type:String,
      required:true,
    },
    title:{
        type:String,
        required: true,
    },
    price : {
        type:Number,
        rquired:true,
    },
    razorpayOrderId : {
        type:String,
        required:true,
    },
    razorpayPaymentId : {
        type:String,
        required:true
    },
    razorpaySignature: {
      type:String,
      required:true
    }

},{timestamps:true})

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;