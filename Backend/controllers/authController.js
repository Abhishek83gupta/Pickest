const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")





const signup = async (req,res)=>{
   const {username, email, password, accountType} = req.body;

   try {

    // User is already exist or not
    let user = await User.findOne({username})
    if(user){
        return res
        .status(400)
        .json({success: false, message: "Username already in use"})
    }
    
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt)
    
    user = new User({
        username,
        email,
        password:securePassword,
        accountType
    })

    // await user.save()       // Here complusory
    
    // const newUser = await User.create({username, email, password:securePassword, accountType})
    // await newUser.save()    // Here not complusory

    return res
    .status(201)
    .json({ success: true, message: "User created succesfully"})

   } catch (error) {
     return res.status(500).json({success: false, message: error.message})
   }
};


const login = async ()=>{
  
};


module.exports = { 
    login,
    signup
}