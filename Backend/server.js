const express = require("express");
require('dotenv').config()
const { readdirSync } = require("fs");   
const { connectDB } = require("./Database/dbConnection");

connectDB();
const app = express();

const PORT = process.env.PORT;
app.get("/",(req,res)=>{
    res.send("<h1> Hello bro </h1>")
})

// const authRoutes = require("./routes/authRoutes")
// app.use("/api", authRoutes)
// readdirSync --> reads the directory  
// console.log(readdirSync("./routes")) // In array form    
// importing and using routes dynamically       
readdirSync("./routes").map((route)=>
  app.use("/api",require(`./routes/${route}`))
)


app.listen(PORT,(req,res)=>{
  console.log(`Server is running on port ${PORT}`);
})