const mongoose = require("mongoose")



const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        accountType: {
            type:String,
            deafault:"buyer",
        },
        uploads:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        purchased: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        favourites: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],


    },
    {timestamps:true}
)

const User = mongoose.model("User", userSchema)
module.exports = User